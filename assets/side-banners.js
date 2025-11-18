/* ===== Vinbot – Side Bannere (global) ===== */

(function () {
  if (window.__sideBannersInitialized) return;
  window.__sideBannersInitialized = true;

  // Skjul hvis brugeren har lukket dem før
  const closedKey = "vinbot_side_banners_closed";
  if (localStorage.getItem(closedKey) === "1") return;

  // Kun vis på større skærme
  if (window.innerWidth < 1100) return;

  /* --------------------------
     CSS
  --------------------------- */
  function createStyle() {
    const css = `
      .side-banner {
        position: fixed; 
        top: 140px;
        z-index: 9999;
        opacity: 0;
        transition: opacity .4s ease;
      }

      .side-banner.visible {
        opacity: 1;
      }

      .side-banner.left-banner {
        left: 40px;
      }

      .side-banner.right-banner {
        right: 40px;
      }

      .side-banner img {
        max-width: 160px;
        height: auto;
        display: block;
        border-radius: 4px;
      }

      .side-banner .close-btn {
        position: absolute;
        top: -10px;
        right: -10px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(0,0,0,0.65);
        color: #fff;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        cursor: pointer;
        user-select: none;
      }
    `;

    const el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
  }

  /* --------------------------
     Opret banner-element
  --------------------------- */
  function createBanner({ side, link, image }) {
    const wrap = document.createElement("div");
    wrap.className = `side-banner ${side}-banner`;

    const a = document.createElement("a");
    a.href = link;
    a.target = "_blank";
    a.rel = "nofollow noopener";

    const img = document.createElement("img");
    img.src = image;

    const closeBtn = document.createElement("div");
    closeBtn.className = "close-btn";
    closeBtn.textContent = "×";
    closeBtn.onclick = () => {
      wrap.remove();
      localStorage.setItem(closedKey, "1");
    };

    a.appendChild(img);
    wrap.appendChild(a);
    wrap.appendChild(closeBtn);

    document.body.appendChild(wrap);

    // Fade-in
    setTimeout(() => wrap.classList.add("visible"), 50);

    return wrap;
  }

  /* --------------------------
     Init
  --------------------------- */
  function init() {
    createStyle();

    // Højre banner
    createBanner({
      side: "right",
      link: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=50537&bannerid=94900",
      image: "https://www.partner-ads.com/dk/visbanner.php?partnerid=50537&bannerid=94900"
    });

    // Venstre banner
    createBanner({
      side: "left",
      link: "https://www.partner-ads.com/dk/klikbanner.php?partnerid=50537&bannerid=94898",
      image: "https://www.partner-ads.com/dk/visbanner.php?partnerid=50537&bannerid=94898"
    });
  }

  // Kør når DOM er klar
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(init, 50);
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
