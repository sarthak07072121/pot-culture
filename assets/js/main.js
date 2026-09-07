/* ============================================================
   EDIT #11 — WHERE ENQUIRIES GO.
   Put the email address you want enquiries sent to.
   Right now the form opens the visitor's email app with the
   message pre-written. See README.md for how to switch to a
   proper form service so it lands in your inbox automatically.
   ============================================================ */
var CONTACT_EMAIL = "hello@example.com";

(function () {
  "use strict";

  /* ---------- current year in footer ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- header shadow on scroll ---------- */
  var header = document.getElementById("header");
  var onScroll = function () {
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");

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

  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") closeMenu();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- highlight the section you're looking at ---------- */
  var links = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]:not(.nav-cta)'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- fade sections in as they scroll into view ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        setTimeout(function () { entry.target.classList.add("in"); }, Math.min(i * 70, 280));
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- pricing toggle ---------- */
  var billing = document.getElementById("billing");
  if (billing) {
    var lblM = document.getElementById("lblM");
    var lblY = document.getElementById("lblY");
    var swappable = document.querySelectorAll("[data-m][data-y]");

    billing.addEventListener("click", function () {
      var yearly = billing.getAttribute("aria-checked") !== "true";
      billing.setAttribute("aria-checked", String(yearly));
      lblM.classList.toggle("is-on", !yearly);
      lblY.classList.toggle("is-on", yearly);
      swappable.forEach(function (el) {
        el.textContent = yearly ? el.dataset.y : el.dataset.m;
      });
    });
  }

  /* ---------- contact form ---------- */
  var form = document.getElementById("leadForm");
  if (!form) return;
  var note = document.getElementById("formNote");

  var say = function (msg, kind) {
    note.textContent = msg;
    note.className = "form-note " + (kind || "");
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Bot check: the hidden field is invisible to people.
    if (form.company.value) return;

    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var phone = form.phone.value.trim();
    var budget = form.budget.value;
    var message = form.message.value.trim();

    var invalid = null;
    if (!name) invalid = form.name;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) invalid = form.email;
    else if (message.length < 10) invalid = form.message;

    [form.name, form.email, form.message].forEach(function (f) {
      f.removeAttribute("aria-invalid");
    });

    if (invalid) {
      invalid.setAttribute("aria-invalid", "true");
      invalid.focus();
      say("Please fill in your name, a valid email, and a short message.", "err");
      return;
    }

    var body =
      "Name: " + name + "\n" +
      "Email: " + email + "\n" +
      "Phone: " + (phone || "not given") + "\n" +
      "Budget: " + budget + "\n\n" +
      message;

    window.location.href =
      "mailto:" + CONTACT_EMAIL +
      "?subject=" + encodeURIComponent("Website enquiry from " + name) +
      "&body=" + encodeURIComponent(body);

    say("Opening your email app — press send there to finish.", "ok");
  });
})();
