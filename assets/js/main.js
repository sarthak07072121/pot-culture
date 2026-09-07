/* ============================================================
   EDIT #10 — WHERE ENQUIRIES GO.
   ============================================================ */
var CONTACT_EMAIL = "hello@example.com";   // <-- your real email

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- page fades in once styles are settled ---------- */
  requestAnimationFrame(function () { document.body.classList.add("ready"); });

  /* ---------- footer year ---------- */
  var year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  /* ============================================================
     MISSING PHOTOS DEGRADE GRACEFULLY
     Every photo sits on top of designed artwork. Until you drop
     a real file into assets/img/, the artwork is what shows —
     no broken-image icons, nothing looks unfinished.
     ============================================================ */
  $$("img[data-photo]").forEach(function (img) {
    var done = function () { img.classList.add("loaded"); };
    var fail = function () { img.closest(".ph").classList.add("no-photo"); img.remove(); };
    if (img.complete) { img.naturalWidth ? done() : fail(); }
    else { img.addEventListener("load", done); img.addEventListener("error", fail); }
  });

  /* ============================================================
     THE LIVING BACKGROUND
     Each section declares which background it wants via data-bg.
     Whichever section owns the middle of the screen wins, so the
     crossfade runs the same scrolling UP as scrolling DOWN.
     ============================================================ */
  var bgLayers = $$(".bg-layer");
  var bgSections = $$("[data-bg]");
  if (bgLayers.length && bgSections.length) {
    var currentBg = -1;

    var showBg = function (i) {
      if (i === currentBg || !bgLayers[i]) return;
      currentBg = i;
      bgLayers.forEach(function (l, n) { l.classList.toggle("on", n === i); });
    };

    var pickBg = function () {
      var mid = window.innerHeight / 2;
      var best = null, bestDist = Infinity;
      bgSections.forEach(function (sec) {
        var r = sec.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        // distance from the section's span to the middle of the viewport
        var d = (mid < r.top) ? r.top - mid : (mid > r.bottom ? mid - r.bottom : 0);
        if (d < bestDist) { bestDist = d; best = sec; }
      });
      if (best) showBg(parseInt(best.dataset.bg, 10));
    };

    showBg(0);
    window.addEventListener("scroll", pickBg, { passive: true });
    window.addEventListener("resize", pickBg);
    pickBg();
  }

  /* ---------- scroll progress bar ---------- */
  var bar = $("#progress");
  var setProgress = function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (h > 0 ? window.scrollY / h : 0) + ")";
  };

  /* ---------- header: transparent over the hero, solid after ---------- */
  var header = $("#header");
  var onScroll = function () {
    header.classList.toggle("scrolled", window.scrollY > window.innerHeight * 0.7);
    setProgress();
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- parallax ---------- */
  var layers = $$("[data-parallax]");
  if (layers.length && !reduced) {
    var ticking = false;
    var park = function () {
      layers.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var mid = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        el.style.setProperty("--shift", (mid * parseFloat(el.dataset.parallax)).toFixed(2) + "px");
      });
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(park); }
    }, { passive: true });
    park();
  }

  /* ---------- mobile menu ---------- */
  var burger = $("#burger");
  var nav = $("#nav");
  var closeMenu = function () {
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
  };
  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") closeMenu(); });

  /* ---------- active section in nav ---------- */
  var links = $$('#nav a[href^="#"]:not(.nav-cta)');
  var sections = links.map(function (a) { return $(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- reveal on scroll, with stagger ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en, i) {
        if (!en.isIntersecting) return;
        setTimeout(function () { en.target.classList.add("in"); }, Math.min(i * 80, 320));
        obs.unobserve(en.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- stats count up ---------- */
  var stats = $$("[data-count]");
  if (stats.length && "IntersectionObserver" in window) {
    var counter = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        obs.unobserve(en.target);
        var el = en.target;
        var target = parseFloat(el.dataset.count);
        if (isNaN(target)) return;                 // still a "—" placeholder
        if (reduced) { el.textContent = el.dataset.count; return; }
        var t0 = performance.now();
        var tick = function (now) {
          var k = Math.min((now - t0) / 1400, 1);
          var eased = 1 - Math.pow(1 - k, 3);
          el.textContent = Math.round(target * eased) + (el.dataset.suffix || "");
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    stats.forEach(function (s) { counter.observe(s); });
  }

  /* ============================================================
     GALLERY LIGHTBOX
     Uses the View Transition API where the browser has it, so the
     thumbnail morphs into the full image. Falls back to a fade.
     ============================================================ */
  var box = $("#lightbox");
  if (box) {
    var boxImg = $("#lightboxImg");
    var boxCap = $("#lightboxCap");
    var figures = $$(".shot");
    var index = 0;
    var lastFocus = null;

    var render = function () {
      var fig = figures[index];
      var img = fig.querySelector("img");
      var cap = fig.querySelector("figcaption");
      boxCap.textContent = cap ? cap.textContent : "";
      if (img) {
        boxImg.src = img.currentSrc || img.src;
        boxImg.alt = img.alt;
        boxImg.hidden = false;
      } else {
        boxImg.hidden = true;                      // no photo dropped in yet
      }
      box.dataset.index = String(index + 1);
      box.dataset.total = String(figures.length);
      $("#lightboxCount").textContent = (index + 1) + " / " + figures.length;
    };

    var swap = function (fn) {
      if (document.startViewTransition && !reduced) document.startViewTransition(fn);
      else fn();
    };

    var open = function (i) {
      index = i;
      lastFocus = document.activeElement;
      swap(function () { render(); box.classList.add("open"); });
      box.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      $("#lightboxClose").focus();
    };

    var close = function () {
      box.classList.remove("open");
      box.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus();
    };

    var step = function (d) {
      index = (index + d + figures.length) % figures.length;
      swap(render);
    };

    figures.forEach(function (fig, i) {
      fig.addEventListener("click", function () { open(i); });
      fig.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(i); }
      });
    });

    $("#lightboxClose").addEventListener("click", close);
    $("#lightboxPrev").addEventListener("click", function () { step(-1); });
    $("#lightboxNext").addEventListener("click", function () { step(1); });
    box.addEventListener("click", function (e) { if (e.target === box) close(); });

    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("open")) {
        if (e.key === "Escape") closeMenu();
        return;
      }
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {                  // keep focus inside the lightbox
        var f = $$("button", box);
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- enquiry form ---------- */
  var form = $("#leadForm");
  if (!form) return;
  var note = $("#formNote");
  var say = function (msg, kind) { note.textContent = msg; note.className = "form-note " + (kind || ""); };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (form.company.value) return;                // honeypot

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var phone = form.phone.value.trim();
    var interest = form.interest.value;
    var quantity = form.quantity.value.trim();
    var deadline = form.deadline.value.trim();
    var message = form.message.value.trim();

    [form.name, form.email, form.message].forEach(function (f) { f.removeAttribute("aria-invalid"); });

    var bad = null;
    if (!name) bad = form.name;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) bad = form.email;
    else if (message.length < 10) bad = form.message;

    if (bad) {
      bad.setAttribute("aria-invalid", "true");
      bad.focus();
      say("Please fill in your name, a valid email, and a short message.", "err");
      return;
    }

    var body =
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Phone: " + (phone || "not given") + "\n" +
      "Looking for: " + interest + "\n" +
      "Quantity: " + (quantity || "not given") + "\n" +
      "Needed by: " + (deadline || "not given") + "\n\n" +
      message;

    window.location.href =
      "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent(interest + " enquiry from " + name) +
      "&body=" + encodeURIComponent(body);

    say("Opening your email app — press send there to finish.", "ok");
  });
})();
