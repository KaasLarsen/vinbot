// /assets/nav.js
(function () {
  function wire() {
    const nav  = document.querySelector(".nav");
    const btn  = document.querySelector(".nav-toggle");
    const menu = document.getElementById("mainMenu");
    if (!nav || !btn || !menu || nav.dataset.wired) return false;

    nav.dataset.wired = "1"; // undgå dobbelt-binding

    const close = () => {
      nav.classList.remove("nav--open");
      btn.setAttribute("aria-expanded", "false");
    };
    const toggle = () => {
      const open = !nav.classList.contains("nav--open");
      nav.classList.toggle("nav--open", open);
      btn.setAttribute("aria-expanded", String(open));
    };

    btn.addEventListener("click", toggle);
    menu.addEventListener("click", (e) => { if (e.target.matches("a")) close(); });
    document.addEventListener("click", (e) => { if (!nav.contains(e.target)) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });

    return true;
  }

  // 1) Prøv nu
  if (wire()) return;

  // 2) Hvis headeren bliver indsat senere (partials), så lyt efter DOM-ændringer
  const mo = new MutationObserver(() => { if (wire()) mo.disconnect(); });
  mo.observe(document.documentElement, { childList: true, subtree: true });

  // 3) Hvis du selv vil fyre en custom event efter du har indsat headeren:
  document.addEventListener("partial:header-ready", wire);
})();
