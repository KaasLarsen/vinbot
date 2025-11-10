export const config = { runtime: "nodejs" };

const FEEDS = {
  mere: {
    name: "Mere om Vin",
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=87611&feedid=2182"
  },
  winther: {
    name: "Winther Vin",
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=76708&feedid=1766"
  },
  vinea: {
    name: "Vinea",
    url: "https://www.partner-ads.com/dk/feed_udlaes.php?partnerid=50537&bannerid=111911&feedid=3767"
  },
};

export default async function handler(req, res) {
  const key = (req.query.feed || "mere").toString().toLowerCase();
  const feed = FEEDS[key] || FEEDS.mere;

  const useProxy = String(req.query.proxy || "") === "1";
  const raw = String(req.query.raw || "") === "1";

  const headers = {
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36",
    "accept": "text/xml,application/xml,text/plain,text/csv,*/*",
  };

  const fetchUrl = useProxy
    ? "https://r.jina.ai/http://" + feed.url.replace(/^https?:\/\//, "")
    : feed.url;

  try {
    const r = await fetch(fetchUrl, { headers, redirect: "follow" });
    const status = r.status;
    const text = await r.text();

    if (raw) {
      res.setHeader("content-type", "text/plain; charset=utf-8");
      return res.status(200).send(text.slice(0, 4000));
    }

    const looksXML = /<\?xml|<rss|<feed|<products|<product|<channel|<item/i.test(text);
    let rows = 0,
      sample = [],
      headersOut = [],
      type = "";

    if (looksXML) {
      type = "xml";
      const blocks = splitBlocks(text, "product").length
        ? splitBlocks(text, "product")
        : splitBlocks(text, "item");

      rows = blocks.length;
      sample = blocks.slice(0, 5).map((b) => ({
        title: pickOne(b, ["name", "title"]),
        url: pickOne(b, ["deeplink", "link", "producturl", "url"]),
        image: pickOne(b, [
          "imageurl",
          "image_url",
          "image",
          "largeimage",
          "g:image_link",
        ]),
        price: pickOne(b, ["price", "price_inc_vat", "saleprice"]),
      }));
    } else {
      type = "csv/tsv";
      const head = text.slice(0, 1024);
      const delim = head.includes("\t") ? "\t" : head.includes(";") ? ";" : ",";
      const rowsArr = parseCSV(text, delim);
      headersOut = rowsArr[0] || [];
      const body = rowsArr.slice(1);
      rows = body.length;
      sample = body.slice(0, 5).map((r) => {
        const h = headersOut.map((x) =>
          x.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9:_-]/g, "")
        );
        const idx = (names) => {
          for (const n of names) {
            const i = h.indexOf(n);
            if (i !== -1) return i;
          }
          return -1;
        };
        return {
          title: r[idx(["name", "title", "productname", "navn"])] || null,
          url: r[idx(["deeplink", "link", "producturl", "url"])] || null,
          image:
            r[
              idx([
                "imageurl",
                "image_url",
                "image",
                "largeimage",
                "picture",
                "imgurl",
              ])
            ] || null,
          price:
            r[
              idx([
                "price",
                "price_inc_vat",
                "pricewithvat",
                "saleprice",
                "ourprice",
                "current_price",
              ])
            ] || null,
        };
      });
    }

    res.setHeader("content-type", "application/json; charset=utf-8");
    res.status(200).json({
      ok: true,
      feed: feed.name,
      http_status: status,
      type,
      rows,
      headers: headersOut.slice(0, 20),
      sample,
    });
  } catch (e) {
    res.status(200).json({ ok: false, feed: feed.name, error: String(e) });
  }
}

/* --- Hjælpefunktioner --- */
function splitBlocks(xml, tag) {
  return xml
    .split(new RegExp(`<${tag}\\b[^>]*>`, "i"))
    .slice(1)
    .map((b) => b.split(new RegExp(`</${tag}>`, "i"))[0]);
}
function pickTag(block, tag) {
  const m = block.match(
    new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i")
  );
  return m ? m[1].trim() : "";
}
function pickOne(block, tags) {
  for (const t of tags) {
    const v = pickTag(block, t);
    if (v) return v;
  }
  return "";
}
function parseCSV(text, delim) {
  const rows = [];
  let f = "",
    row = [],
    q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i],
      n = text[i + 1];
    if (q) {
      if (c === '"' && n === '"') {
        f += '"';
        i++;
        continue;
      }
      if (c === '"') {
        q = false;
        continue;
      }
      f += c;
      continue;
    }
    if (c === '"') {
      q = true;
      continue;
    }
    if (c === delim) {
      row.push(f);
      f = "";
      continue;
    }
    if (c === "\n") {
      row.push(f);
      rows.push(row);
      f = "";
      row = [];
      continue;
    }
    if (c === "\r") continue;
    f += c;
  }
  if (f.length || row.length) {
    row.push(f);
    rows.push(row);
  }
  return rows.filter((r) => r.some((x) => (x || "").trim().length));
}
