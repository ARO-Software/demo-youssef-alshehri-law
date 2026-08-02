/* مكتب المحامي يوسف بن عامر الشهري — vanilla, no dependencies.
   Everything here is progressive enhancement: the page is fully
   readable and usable if this file never executes. */
(function () {
  "use strict";

  var head = document.querySelector(".head");
  var burger = document.getElementById("burger");
  var mobnav = document.getElementById("mobnav");

  /* ── sticky header condenses on scroll ───────────────────────── */
  if (head) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        head.classList.toggle("is-stuck", window.scrollY > 40);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ── mobile nav: class-toggled, never the [hidden] attribute ─── */
  if (burger && mobnav) {
    var setNav = function (open) {
      mobnav.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    };

    burger.addEventListener("click", function () {
      setNav(burger.getAttribute("aria-expanded") !== "true");
    });

    mobnav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setNav(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mobnav.classList.contains("is-open")) {
        setNav(false);
        burger.focus();
      }
    });

    /* if the viewport grows past the desktop breakpoint while open */
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 860 && mobnav.classList.contains("is-open")) setNav(false);
    });
  }

  /* ── scroll reveal ───────────────────────────────────────────
     Fail-open: no IntersectionObserver, or reduced motion, and
     every section is revealed immediately. Nothing can be left
     stranded at opacity 0. */
  var items = [].slice.call(document.querySelectorAll(".reveal"));
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealAll = function () {
    items.forEach(function (el) { el.classList.add("is-in"); });
  };

  if (!("IntersectionObserver" in window) || reduce) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        /* stagger siblings within a group for an orchestrated feel */
        var group = el.parentElement;
        var peers = group ? [].slice.call(group.children).filter(function (c) {
          return c.classList && c.classList.contains("reveal");
        }) : [];
        var i = peers.indexOf(el);
        el.style.transitionDelay = (i > 0 ? Math.min(i, 6) * 0.07 : 0) + "s";
        el.classList.add("is-in");
        obs.unobserve(el);
      });
    }, { rootMargin: "0px 0px -6% 0px", threshold: 0.01 });

    items.forEach(function (el) { io.observe(el); });

    /* safety net: anything still hidden after 6s gets revealed */
    window.setTimeout(function () {
      items.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (!el.classList.contains("is-in") && r.top < window.innerHeight * 1.5) {
          el.classList.add("is-in");
        }
      });
    }, 6000);
  }
})();
