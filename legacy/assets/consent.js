/* Vinbot Consent Manager – v1.0
   En fil, drop-in. Viser banner automatisk, håndterer kategorier og (de)aktiverer scripts.
   Kategorier: "necessary" (altid aktiv), "analytics", "ads", "affiliate".
*/
(() => {
  const LS_KEY = "vinbot_consent_v1";
  const CATS = ["analytics", "ads", "affiliate"]; // necessary er implicit tilladt
  const STATE = loadState();

  // Public API
  window.VinbotConsent = {
    get: () => ({ ...STATE }),
    setAll: (accepted) => setConsent({ analytics: accepted, ads: accepted, affiliate: accepted }),
    set: (partial) => setConsent(partial),
    reset: () => { localStorage.removeItem(LS_KEY); location.reload(); }
  };

  // Start
  injectUI();
  if (!STATE.choiceMade) showBanner();
  // Hvis der allerede er givet samtykke tidligere -> aktiver scripts nu
  if (STATE.choiceMade) applyConsentToScripts(STATE);

  // ---- Utils ----
  function loadState() {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return { choiceMade: false, analytics: false, ads: false, affiliate: false };
    try {
      const parsed = JSON.parse(raw);
      return { choiceMade: !!parsed.choiceMade,
               analytics: !!parsed.analytics, ads: !!parsed.ads, affiliate: !!parsed.affiliate };
    } catch {
      return { choiceMade: false, analytics: false, ads: false, affiliate: false };
    }
  }

  function saveState(next) {
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  }

  function setConsent(partial) {
    const next = { ...STATE, ...partial, choiceMade: true };
    saveState(next);
    applyConsentToScripts(next);
    hideBanner();
  }

  function applyConsentToScripts(state) {
    // Find alle script-tags der er blokeret
    const blocked = document.querySelectorAll('script[type="text/plain"][data-consent]');
    blocked.forEach((node) => {
      const cat = (node.getAttribute("data-consent") || "").toLowerCase().trim();
      if (!cat) return;
      if (!CATS.includes(cat)) return;
      if (!state[cat]) return; // ikke tilladt -> spring over

      // Undgå dobbelt-indlæsning
      if (node.dataset.consentLoaded === "1") return;

      // Opret rigtigt script-tag
      const s = document.createElement("script");
      // Kopiér alle attributter undtagen type og data-*
      for (const { name, value } of Array.from(node.attributes)) {
        if (name === "type") continue;
        if (name.startsWith("data-")) continue;
        s.setAttribute(name, value);
      }

      // Hvis inline script, flyt indhold
      if (!s.src) {
        s.textContent = node.textContent || "";
      }

      // Marker som loaded og erstat i DOM
      node.dataset.consentLoaded = "1";
      node.parentNode.insertBefore(s, node);
      node.remove();
    });
  }

  // ---- UI ----
  function injectUI() {
    // Styles (scoped nok til at undgå konflikter)
    const css = `
      :root{--c-bg:#121316;--c-line:#26272c;--c-txt:#e6e7ea;--c-muted:#a7acb8;--c-accent:#e74c3c;--c-card:#101114;}
      #vb-consent-banner,#vb-consent-modal{font-family:Inter,system-ui,Segoe UI,Roboto,Arial,sans-serif;color:var(--c-txt)}
      #vb-consent-banner{position:fixed;left:0;right:0;bottom:0;z-index:9999;background:var(--c-bg);border-top:1px solid var(--c-line);box-shadow:0 -6px 20px rgba(0,0,0,.45);padding:16px 18px;display:none}
      #vb-consent-banner .row{max-width:1100px;margin:auto;display:flex;gap:16px;align-items:center;flex-wrap:wrap}
      #vb-consent-banner p{margin:0;flex:1;min-width:240px;color:#d1d3d7}
      #vb-consent-banner a{color:var(--c-accent);text-decoration:underline}
      .vb-btn{border:1px solid var(--c-line);background:#1c1d22;color:#fff;border-radius:10px;padding:10px 14px;font-weight:600;cursor:pointer}
      .vb-btn.primary{background:var(--c-accent);border-color:transparent}
      .vb-btn.ghost{background:#202127}
      #vb-consent-settings{position:fixed;right:22px;bottom:22px;z-index:9998;background:#1c1d22;border:1px solid var(--c-line);color:#cfd3da;border-radius:10px;padding:8px 12px;font-size:.9rem;cursor:pointer;opacity:.85}
      #vb-consent-settings:hover{opacity:1;color:#fff}
      /* Modal */
      #vb-consent-modal{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.55);display:none;align-items:center;justify-content:center;padding:20px}
      .vb-card{background:var(--c-card);border:1px solid var(--c-line);border-radius:14px;max-width:640px;width:100%;padding:18px}
      .vb-card h3{margin:0 0 8px 0;font-size:1.25rem}
      .vb-card p{color:#d1d3d7;margin:0 0 10px}
      .vb-row{display:flex;align-items:center;justify-content:space-between;border:1px solid var(--c-line);border-radius:10px;padding:12px;margin:10px 0;background:#14151a}
      .vb-row small{color:var(--c-muted)}
      .vb-switch{position:relative;width:48px;height:28px;background:#2b2c33;border-radius:999px;border:1px solid #3a3b41;cursor:pointer}
      .vb-switch input{appearance:none;width:100%;height:100%;margin:0}
      .vb-switch .knob{position:absolute;top:3px;left:3px;width:22px;height:22px;background:#cfd3da;border-radius:50%;transition:.2s}
      .vb-switch input:checked ~ .knob{left:23px;background:var(--c-accent)}
      .vb-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end;margin-top:12px}
    `;
    const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

    // Banner
    const banner = document.createElement("div");
    banner.id = "vb-consent-banner";
    banner.innerHTML = `
      <div class="row">
        <p>Vinbot.dk bruger cookies/teknologier til statistik, annoncer (Google AdSense) og affiliate-sporing. Du kan tilpasse dit samtykke. Læs mere på <a href="/privatliv">Privatliv</a>.</p>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="vb-btn ghost" id="vb-decline">Afvis</button>
          <button class="vb-btn" id="vb-customize">Tilpas</button>
          <button class="vb-btn primary" id="vb-accept">Accepter alt</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    // Settings button
    const settings = document.createElement("button");
    settings.id = "vb-consent-settings";
    settings.type = "button";
    settings.textContent = "🍪 Cookie-indstillinger";
    document.body.appendChild(settings);

    // Modal
    const modal = document.createElement("div");
    modal.id = "vb-consent-modal";
    modal.innerHTML = `
      <div class="vb-card" role="dialog" aria-modal="true" aria-label="Cookie-indstillinger">
        <h3>Cookie-indstillinger</h3>
        <p>Nødvendige teknologier er altid aktive. Vælg, hvad du vil tillade:</p>

        <div class="vb-row">
          <div><strong>Analytics</strong><br><small>Statistik og forbedring af indhold.</small></div>
          <label class="vb-switch">
            <input id="vb-cat-analytics" type="checkbox" ${STATE.analytics ? "checked" : ""}>
            <span class="knob"></span>
          </label>
        </div>

        <div class="vb-row">
          <div><strong>Ads</strong><br><small>Google AdSense og lignende annoncer.</small></div>
          <label class="vb-switch">
            <input id="vb-cat-ads" type="checkbox" ${STATE.ads ? "checked" : ""}>
            <span class="knob"></span>
          </label>
        </div>

        <div class="vb-row">
          <div><strong>Affiliate</strong><br><small>Sporing for kommission ved køb via links.</small></div>
          <label class="vb-switch">
            <input id="vb-cat-affiliate" type="checkbox" ${STATE.affiliate ? "checked" : ""}>
            <span class="knob"></span>
          </label>
        </div>

        <div class="vb-actions">
          <button class="vb-btn ghost" id="vb-close">Luk</button>
          <button class="vb-btn" id="vb-save">Gem valg</button>
          <button class="vb-btn primary" id="vb-accept-all">Accepter alt</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Handlers
    document.getElementById("vb-decline").onclick = () => setConsent({ analytics: false, ads: false, affiliate: false });
    document.getElementById("vb-accept").onclick = () => setConsent({ analytics: true, ads: true, affiliate: true });
    document.getElementById("vb-customize").onclick = () => showModal();
    document.getElementById("vb-close").onclick = () => hideModal();
    document.getElementById("vb-accept-all").onclick = () => { setConsent({ analytics: true, ads: true, affiliate: true }); hideModal(); };
    document.getElementById("vb-save").onclick = () => {
      const next = {
        analytics: document.getElementById("vb-cat-analytics").checked,
        ads: document.getElementById("vb-cat-ads").checked,
        affiliate: document.getElementById("vb-cat-affiliate").checked
      };
      setConsent(next); hideModal();
    };
    settings.onclick = () => showModal();

    // Gem refs
    function showModal(){ modal.style.display = "flex"; }
    function hideModal(){ modal.style.display = "none"; }
    window.__VB__ = { banner, modal };
  }

  function showBanner(){ const el = window.__VB__?.banner; if (el) el.style.display = "block"; }
  function hideBanner(){ const el = window.__VB__?.banner; if (el) el.style.display = "none"; }
})();
