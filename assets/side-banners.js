(function () {
  const MIN_WIDTH = 1000; // kun desktop

  function createStyle() {
    const css = `
      .side-banner {
        position: fixed;
        top: 50%;
        transform: translateY(-50%);
        z-index: 9999;
        width: 150px;
        opacity: 0;
        pointer-events: none;
        transition: opacity .4s ease;
      }

      .side-banner.sb-visible {
        opacity: 1;
        pointer-events: auto;
      }

      .side-banner img {
        width: 100%;
        height: auto;
        display: block;
      }

      .side-banner.left-banner {
        left: 40px;
      }

      .side-banner.right-banner {
        right: 40px;
      }

      .side-banner-close {
        position: fixed;
        top: -8px;
        right: -8px;
        width: 18px;
        height: 18px;
        border-radius: 999px;
        border: none;
        background: rgba(0,0,0,.6);
        color: #fff;
        font-size: 12px;
        line-height: 18px;
        padding: 0;
        cursor: pointer;
      }

      .side-banner-close:hover {
        background: rgba(0,0,0,.8);
      }

      @media (max-width: 1000px) {
        .side-banner {
          display: none !important;
        }
      }
    `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  }

  function createBanner(className, clickUrl, imgUrl, label) {
    const wrap = document.createElement("div");
    wrap.className = "side-banner " + className;

    const close = document.createElement("button");
    close.type = "button";
    close.className = "side-banner-close";
    close.setAttribute("aria-label", "Luk annonce");
    close.textContent = "×";

    const a = document.createElement("a");
    a.href = clickUrl;
    a.target = "_blank";
    a.rel = "nofollow noopener sponsored";
    a.dataset.label = label || "Side banner";

    const img = document.createElement("img");
    img.src = imgUrl;
    img.alt = "";

    a.appendChild(img);
    wrap.appendChild(close);
    wrap.appendChild(a);

    close.addEventListener("click", function (e) {
      e.stopPropagation();
      e.preventDefault();
      wrap.style.display = "none";
      try {
        sessionStorage.setItem("VINBOT_HIDE_SIDE_BANNERS", "1");
      } catch (_) {}
    });

    return wrap;
  }

  function initSideBanners() {
    // kun desktop
    if (window.innerWidth < MIN_WIDTH) return;

    // hvis brugeren allerede har lukket dem i denne session
    try {
      if (sessionStorage.getItem("VINBOT_HIDE_SIDE_BANNERS") === "1") return;
    } catch (_) {}

    createStyle();

    const left = createBanner(
      "left-banner",
      "https://www.partner-ads.com/dk/klikbanner.php?partnerid=50537&bannerid=94898",
      "https://www.partner-ads.com/dk/visbanner.php?partnerid=50537&bannerid=94898",
      "Side banner · venstre"
    );

    const right = createBanner(
      "right-banner",
      "https://www.partner-ads.com/dk/klikbanner.php?partnerid=50537&bannerid=94900",
      "https://www.partner-ads.com/dk/visbanner.php?partnerid=50537&bannerid=94900",
      "Side banner · højre"
    );

    document.body.appendChild(left);
    document.body.appendChild(right);

    // fade-in
    setTimeout(() => {
      left.classList.add("sb-visible");
      right.classList.add("sb-visible");
    }, 100);
  }

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(initSideBanners);
})();
