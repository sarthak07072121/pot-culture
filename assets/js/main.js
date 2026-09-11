/* ============================================================
   CONFIG — everything a site owner needs to touch lives here.
   Every TODO below is a real fact only the business owner has;
   nothing here is invented and presented as fact.
   ============================================================ */

/* EDIT — where enquiry-form submissions go. Leave FORMSPREE_ENDPOINT
   blank and the form falls back to mailto: (opens the visitor's email
   app) with zero setup. To have submissions land in your inbox
   automatically: sign up free at https://formspree.io, create a form,
   and paste the endpoint URL here. See README.md for the full steps. */
var FORMSPREE_ENDPOINT = "";                 // TODO: paste your Formspree endpoint URL
var CONTACT_EMAIL = "hello@potexotica.in";   // Pot Exotica contact email (used by the mailto: fallback)

/* EDIT — used by both the floating WhatsApp button and cart checkout.
   Format: country code + number, digits only, no + or spaces. */
var WHATSAPP_NUMBER = "918669184682";        // TODO: your real WhatsApp number

/* EDIT — the trust bar under the hero. Only claims that are true
   regardless of unconfirmed specifics are included by default (no
   invented city list, no invented replacement-window day count — see
   README.md "Real facts I couldn't invent"). Add or remove entries
   freely; each renders as one pill. */
var TRUST_BAR = [
  { icon: "invoice", text: "GST invoicing on request" },
  { icon: "shield", text: "Replacement for damage on arrival" },
  { icon: "box", text: "MOQ from 1 piece" }
  // TODO: once you have a confirmed delivery footprint, add e.g.
  // { icon: "truck", text: "Delivered across <your cities>" }
];

/* EDIT — the five products. Prices are realistic placeholder estimates
   for their category (a rare variegated aroid, a common hardy plant,
   etc.) marked TODO — they are NOT your real prices. Confirm every one
   before this goes live. inStock is also example state, not real
   inventory — wire it to whatever you actually have on hand. */
var PRODUCTS = [
  {
    id: "monstera-albo",
    name: "Variegated Monstera Albo",
    botanical: "Monstera deliciosa 'Albo Variegata'",
    price: 4999,                              // TODO: confirm real price — varies hugely by variegation %
    potSize: "6-inch nursery pot",             // TODO: confirm your actual pot size / packaging
    light: "Bright, indirect",
    difficulty: "Fussy",
    description: "Striking white variegation on deeply split leaves — a genuine collector's centrepiece.",
    image: "assets/img/shop-1.jpg",
    inStock: false                             // TODO: example state — wire to real inventory
  },
  {
    id: "snake-plant",
    name: "Snake Plant",
    botanical: "Sansevieria laurentii",
    price: 499,                                // TODO: confirm real price
    potSize: "6-inch nursery pot",
    light: "Low to bright, indirect",
    difficulty: "Easy",
    description: "Upright, sculptural leaves that tolerate neglect, low light, and infrequent watering.",
    image: "assets/img/shop-2.jpg",
    inStock: true
  },
  {
    id: "zz-raven",
    name: "ZZ Plant Raven",
    botanical: "Zamioculcas zamiifolia 'Raven'",
    price: 1499,                               // TODO: confirm real price
    potSize: "6-inch nursery pot",
    light: "Low to bright, indirect",
    difficulty: "Easy",
    description: "Glossy near-black foliage on an exceptionally hardy plant that thrives on neglect.",
    image: "assets/img/shop-3.jpg",
    inStock: true
  },
  {
    id: "philodendron-birkin",
    name: "Philodendron Birkin",
    botanical: "Philodendron 'Birkin'",
    price: 1199,                               // TODO: confirm real price
    potSize: "6-inch nursery pot",
    light: "Bright, indirect",
    difficulty: "Medium",
    description: "Compact aroid with crisp white pinstripes on deep green leaves — tidy and architectural.",
    image: "assets/img/shop-4.jpg",
    inStock: true
  },
  {
    id: "anthurium-andraeanum",
    name: "Anthurium Andraeanum",
    botanical: "Anthurium andraeanum",
    price: 899,                                // TODO: confirm real price
    potSize: "6-inch nursery pot",
    light: "Bright, indirect",
    difficulty: "Medium",
    description: "Glossy heart-shaped blooms in vivid colour, flowering on and off through most of the year.",
    image: "assets/img/shop-5.jpg",
    inStock: true
  }
];

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var money = function (n) { return "₹" + Math.round(n).toLocaleString("en-IN"); };

  /* ---------- page fades in once styles are settled ---------- */
  requestAnimationFrame(function () { document.body.classList.add("ready"); });

  /* ---------- footer year ---------- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ============================================================
     MISSING PHOTOS DEGRADE GRACEFULLY
     Every photo (product shots included) sits on top of designed
     artwork. Until a real file exists at that path, the artwork is
     what shows — no broken-image icons, nothing looks unfinished.
     ============================================================ */
  $$("img[data-photo]").forEach(function (img) {
    var done = function () { img.classList.add("loaded"); };
    var fail = function () { var ph = img.closest(".ph"); if (ph) ph.classList.add("no-photo"); img.remove(); };
    if (img.complete) { img.naturalWidth ? done() : fail(); }
    else { img.addEventListener("load", done); img.addEventListener("error", fail); }
  });

  /* ---------- scroll progress bar ---------- */
  var bar = $("#progress");
  var setProgress = function () {
    if (!bar) return;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (h > 0 ? window.scrollY / h : 0) + ")";
  };

  /* ---------- header: solid once you scroll ---------- */
  var header = $("#header");
  var onScroll = function () {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
    setProgress();
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  var burger = $("#burger");
  var nav = $("#nav");
  var closeMenu = function () {
    if (!nav) return;
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Open menu");
  };
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") closeMenu(); });
  }

  /* ---------- active section in nav, with a sliding underline ---------- */
  var links = nav ? $$('#nav a[href^="#"]:not(.nav-cta)') : [];
  var sections = links.map(function (a) { return $(a.getAttribute("href")); }).filter(Boolean);
  var indicator = $("#navIndicator");
  var moveIndicator = function (link) {
    if (!indicator || !link) return;
    indicator.style.width = link.offsetWidth + "px";
    indicator.style.transform = "translateX(" + link.offsetLeft + "px)";
    indicator.classList.add("show");
  };
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          var isActive = a.getAttribute("href") === "#" + en.target.id;
          a.classList.toggle("active", isActive);
          if (isActive) moveIndicator(a);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }
  window.addEventListener("resize", function () {
    var active = links.filter(function (a) { return a.classList.contains("active"); })[0];
    if (active) moveIndicator(active);
  });

  /* ---------- reveal on scroll: fade + rise, once only ---------- */
  var reveals = $$(".reveal");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (en, i) {
        if (!en.isIntersecting) return;
        setTimeout(function () { en.target.classList.add("in"); }, Math.min(i * 60, 240));
        obs.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ============================================================
     LEAF CURSOR — desktop only, off under reduced-motion.
     A small SVG leaf drifts toward the pointer with lerp easing
     rather than snapping straight to it, and tilts slightly in its
     direction of travel.
     ============================================================ */
  if (canHover && !reduced) {
    var leaf = document.createElement("div");
    leaf.className = "leaf-cursor";
    leaf.setAttribute("aria-hidden", "true");
    leaf.innerHTML =
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M12 21v-9"/><path d="M12 12c0-5 3-8.5 8-9-.5 5-3.5 8.5-8 9Z"/><path d="M12 15c0-3.6-2.2-6-6-6.5.4 3.7 2.6 6 6 6.5Z"/>' +
      "</svg>";
    document.body.appendChild(leaf);

    var mx = window.innerWidth / 2, my = window.innerHeight / 2; // target (pointer)
    var lx = mx, ly = my;                                        // current (lerped) position
    var visible = false;

    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      if (!visible) { lx = mx; ly = my; leaf.classList.add("show"); visible = true; }
    });
    document.addEventListener("mouseleave", function () { leaf.classList.remove("show"); visible = false; });

    var tick = function () {
      var dx = mx - lx, dy = my - ly;
      lx += dx * 0.12;
      ly += dy * 0.12;
      var angle = (Math.abs(dx) + Math.abs(dy)) > 0.5 ? Math.atan2(dy, dx) * (180 / Math.PI) + 45 : 0;
      leaf.style.transform = "translate(" + lx.toFixed(1) + "px," + ly.toFixed(1) + "px) rotate(" + angle.toFixed(1) + "deg)";
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // hide over anything with its own cursor affordance (buttons, links, inputs)
    document.addEventListener("mouseover", function (e) {
      leaf.classList.toggle("hide", !!e.target.closest("a, button, input, textarea, select, [role=button]"));
    });
  }

  /* ============================================================
     TRUST BAR — renders TRUST_BAR into #trustBar.
     ============================================================ */
  var TRUST_ICONS = {
    invoice: '<path d="M6 3h9l3 3v15H6Z"/><path d="M15 3v3h3"/><path d="M9 12h6"/><path d="M9 16h6"/>',
    shield: '<path d="M12 3 4 6v6c0 4.5 3 7.5 8 9 5-1.5 8-4.5 8-9V6Z"/><path d="m9 12 2 2 4-4"/>',
    box: '<path d="M3 8 12 3l9 5-9 5-9-5Z"/><path d="M3 8v9l9 5 9-5V8"/><path d="M12 13v9"/>',
    truck: '<path d="M3 7h11v9H3Z"/><path d="M14 10h4l3 3v3h-7Z"/><circle cx="7" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/>'
  };
  var trustBarEl = $("#trustBar");
  if (trustBarEl && TRUST_BAR.length) {
    trustBarEl.innerHTML = TRUST_BAR.map(function (item) {
      var path = TRUST_ICONS[item.icon] || TRUST_ICONS.box;
      return (
        '<span class="trust-pill">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + "</svg>" +
          item.text +
        "</span>"
      );
    }).join("");
  }

  /* ============================================================
     TOAST — small non-blocking confirmation, replaces alert().
     ============================================================ */
  var toastTimer = null;
  var toast = function (msg) {
    var el = $("#toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2600);
  };

  /* ============================================================
     SHOP — renders PRODUCTS into #shopGrid.
     ============================================================ */
  var shopGrid = $("#shopGrid");
  var difficultyClass = function (d) {
    return { Easy: "diff-easy", Medium: "diff-medium", Fussy: "diff-fussy" }[d] || "diff-medium";
  };

  var renderShop = function () {
    if (!shopGrid) return;
    shopGrid.innerHTML = PRODUCTS.map(function (p) {
      var stockBlock = p.inStock
        ? '<div class="qty-row">' +
            '<div class="stepper" data-id="' + p.id + '">' +
              '<button type="button" class="stepper-btn" data-step="-1" aria-label="Decrease quantity">−</button>' +
              '<span class="stepper-val" data-qty-for="' + p.id + '">1</span>' +
              '<button type="button" class="stepper-btn" data-step="1" aria-label="Increase quantity">+</button>' +
            "</div>" +
            '<button type="button" class="btn btn-primary btn-sm add-to-cart" data-id="' + p.id + '">Add to cart</button>' +
          "</div>"
        : '<div class="qty-row">' +
            '<button type="button" class="btn btn-ghost btn-sm btn-block notify-me" data-id="' + p.id + '">Notify me</button>' +
          "</div>";

      return (
        '<article class="card product-card' + (p.inStock ? "" : " out-of-stock") + '">' +
          '<div class="ph ph-' + "abcde"[PRODUCTS.indexOf(p) % 5] + ' frame product-photo">' +
            '<img data-photo loading="lazy" src="' + p.image + '" alt="' + p.name + '">' +
            (p.inStock ? "" : '<span class="stock-flag">Out of stock</span>') +
          "</div>" +
          '<div class="product-body">' +
            '<span class="diff-pill ' + difficultyClass(p.difficulty) + '">' + p.difficulty + "</span>" +
            "<h3>" + p.name + "</h3>" +
            "<p class=\"botanical\"><em>" + p.botanical + "</em></p>" +
            "<p class=\"product-desc\">" + p.description + "</p>" +
            '<dl class="product-meta">' +
              "<dt>Pot</dt><dd>" + p.potSize + "</dd>" +
              "<dt>Light</dt><dd>" + p.light + "</dd>" +
            "</dl>" +
            '<p class="product-price">' + money(p.price) + "</p>" +
            stockBlock +
          "</div>" +
        "</article>"
      );
    }).join("");

    // photo fallback + reveal need to run again for freshly-injected nodes
    $$("img[data-photo]", shopGrid).forEach(function (img) {
      var done = function () { img.classList.add("loaded"); };
      var fail = function () { var ph = img.closest(".ph"); if (ph) ph.classList.add("no-photo"); img.remove(); };
      if (img.complete) { img.naturalWidth ? done() : fail(); }
      else { img.addEventListener("load", done); img.addEventListener("error", fail); }
    });
  };
  renderShop();

  /* ============================================================
     CART — persisted to localStorage, WhatsApp checkout.
     ============================================================ */
  var CART_KEY = "potculture_cart";

  var readCart = function () {
    try {
      var raw = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
      var clean = {};
      Object.keys(raw).forEach(function (id) {
        var qty = parseInt(raw[id], 10);
        if (PRODUCTS.some(function (p) { return p.id === id; }) && qty > 0) clean[id] = qty;
      });
      return clean;
    } catch (e) { return {}; }
  };
  var writeCart = function (cart) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* storage unavailable — cart still works for this page view */ }
  };
  var cart = readCart();

  var cartCount = function () { return Object.keys(cart).reduce(function (n, id) { return n + cart[id]; }, 0); };
  var cartSubtotal = function () {
    return Object.keys(cart).reduce(function (sum, id) {
      var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
      return p ? sum + p.price * cart[id] : sum;
    }, 0);
  };

  var cartBtn = $("#cartButton");
  var cartCountEl = $("#cartCount");
  var cartDrawer = $("#cartDrawer");
  var cartOverlay = $("#cartOverlay");
  var cartItemsEl = $("#cartItems");
  var cartSubtotalEl = $("#cartSubtotal");
  var cartEmptyEl = $("#cartEmpty");
  var announce = $("#cartAnnounce");
  var lastFocusBeforeCart = null;

  var say = function (msg) { if (announce) announce.textContent = msg; };

  var renderCart = function () {
    var count = cartCount();
    if (cartCountEl) cartCountEl.textContent = String(count);
    if (cartBtn) cartBtn.classList.toggle("show", count > 0);

    var ids = Object.keys(cart);
    if (cartEmptyEl) cartEmptyEl.hidden = ids.length > 0;
    if (cartItemsEl) {
      cartItemsEl.innerHTML = ids.map(function (id) {
        var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
        if (!p) return "";
        var qty = cart[id];
        return (
          '<li class="cart-line" data-id="' + id + '">' +
            '<div class="ph ph-a frame cart-thumb"><img data-photo loading="lazy" src="' + p.image + '" alt=""></div>' +
            '<div class="cart-line-body">' +
              "<b>" + p.name + "</b>" +
              '<span class="cart-line-price">' + money(p.price) + " each</span>" +
              '<div class="stepper stepper-sm" data-id="' + id + '">' +
                '<button type="button" class="stepper-btn" data-cart-step="-1" aria-label="Decrease quantity of ' + p.name + '">−</button>' +
                '<span class="stepper-val">' + qty + "</span>" +
                '<button type="button" class="stepper-btn" data-cart-step="1" aria-label="Increase quantity of ' + p.name + '">+</button>' +
              "</div>" +
            "</div>" +
            '<button type="button" class="cart-remove" data-cart-remove="' + id + '" aria-label="Remove ' + p.name + ' from cart">&times;</button>' +
          "</li>"
        );
      }).join("");
      $$("img[data-photo]", cartItemsEl).forEach(function (img) {
        var done = function () { img.classList.add("loaded"); };
        var fail = function () { var ph = img.closest(".ph"); if (ph) ph.classList.add("no-photo"); img.remove(); };
        if (img.complete) { img.naturalWidth ? done() : fail(); }
        else { img.addEventListener("load", done); img.addEventListener("error", fail); }
      });
    }
    if (cartSubtotalEl) cartSubtotalEl.textContent = money(cartSubtotal());

    var checkoutLinks = buildCheckoutLinks();
    var waLink = $("#cartWhatsapp");
    var mailLink = $("#cartEmailLink");
    if (waLink) waLink.href = checkoutLinks.whatsapp;
    if (mailLink) mailLink.href = checkoutLinks.mailto;
    var hasItems = ids.length > 0;
    if (waLink) waLink.setAttribute("aria-disabled", String(!hasItems));
    if (mailLink) mailLink.setAttribute("aria-disabled", String(!hasItems));
  };

  var addToCart = function (id, qty) {
    cart[id] = (cart[id] || 0) + qty;
    writeCart(cart);
    renderCart();
    var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
    if (p) {
      toast("Added " + p.name + " to cart");
      say("Added " + qty + " " + p.name + " to cart. " + cartCount() + " items, subtotal " + money(cartSubtotal()) + ".");
    }
  };

  var setCartQty = function (id, qty) {
    if (qty <= 0) { delete cart[id]; } else { cart[id] = qty; }
    writeCart(cart);
    renderCart();
    say("Cart updated. " + cartCount() + " items, subtotal " + money(cartSubtotal()) + ".");
  };

  var buildCheckoutLinks = function () {
    var ids = Object.keys(cart);
    var lines = ids.map(function (id) {
      var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
      if (!p) return null;
      var qty = cart[id];
      return qty + "x " + p.name + " — " + money(p.price * qty);
    }).filter(Boolean);

    var body =
      "Hi Pot Exotica, I'd like to order:\n" +
      lines.join("\n") +
      "\nSubtotal: " + money(cartSubtotal()) +
      "\nName: ___  Delivery pincode: ___";

    return {
      whatsapp: "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(body),
      mailto: "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("Order from Pot Exotica website") + "&body=" + encodeURIComponent(body)
    };
  };

  var openCart = function () {
    if (!cartDrawer) return;
    lastFocusBeforeCart = document.activeElement;
    cartDrawer.classList.add("open");
    if (cartOverlay) cartOverlay.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var closeBtn = $("#cartClose");
    if (closeBtn) closeBtn.focus();
  };
  var closeCart = function () {
    if (!cartDrawer) return;
    cartDrawer.classList.remove("open");
    if (cartOverlay) cartOverlay.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocusBeforeCart) lastFocusBeforeCart.focus();
  };

  if (cartBtn) cartBtn.addEventListener("click", openCart);
  var cartCloseBtn = $("#cartClose");
  if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

  document.addEventListener("keydown", function (e) {
    if (cartDrawer && cartDrawer.classList.contains("open")) {
      if (e.key === "Escape") { closeCart(); return; }
      if (e.key === "Tab") {
        var focusable = $$('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])', cartDrawer)
          .filter(function (el) { return el.offsetParent !== null; });
        if (!focusable.length) return;
        var first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      return;
    }
    if (e.key === "Escape") closeMenu();
  });

  // shop grid: stepper + add-to-cart + notify-me (event delegation, grid re-renders)
  if (shopGrid) {
    shopGrid.addEventListener("click", function (e) {
      var stepBtn = e.target.closest(".stepper-btn");
      if (stepBtn) {
        var wrap = stepBtn.closest(".stepper");
        var valEl = $("[data-qty-for='" + wrap.dataset.id + "']", wrap);
        var next = Math.max(1, parseInt(valEl.textContent, 10) + parseInt(stepBtn.dataset.step, 10));
        valEl.textContent = String(next);
        return;
      }
      var addBtn = e.target.closest(".add-to-cart");
      if (addBtn) {
        var id = addBtn.dataset.id;
        var qtyEl = $("[data-qty-for='" + id + "']");
        var qty = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
        addToCart(id, qty);
        if (qtyEl) qtyEl.textContent = "1";
        return;
      }
      var notifyBtn = e.target.closest(".notify-me");
      if (notifyBtn) {
        var p = PRODUCTS.filter(function (x) { return x.id === notifyBtn.dataset.id; })[0];
        var msgField = $("textarea[name=message]");
        var contact = $("#contact");
        if (msgField && contact) {
          msgField.value = "Please notify me when " + (p ? p.name : "this plant") + " is back in stock.";
          contact.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
          setTimeout(function () { $("input[name=name]").focus(); }, reduced ? 0 : 500);
        }
        toast(p ? "We'll let you know about " + p.name : "Tell us your email and we'll notify you");
      }
    });
  }

  // cart drawer: qty stepper + remove (event delegation, cart re-renders)
  if (cartItemsEl) {
    cartItemsEl.addEventListener("click", function (e) {
      var stepBtn = e.target.closest("[data-cart-step]");
      if (stepBtn) {
        var id = stepBtn.closest(".stepper").dataset.id;
        setCartQty(id, (cart[id] || 0) + parseInt(stepBtn.dataset.cartStep, 10));
        return;
      }
      var removeBtn = e.target.closest("[data-cart-remove]");
      if (removeBtn) {
        var rid = removeBtn.dataset.cartRemove;
        var p = PRODUCTS.filter(function (x) { return x.id === rid; })[0];
        setCartQty(rid, 0);
        if (p) toast("Removed " + p.name);
      }
    });
  }

  renderCart();

  /* ---------- enquiry form ---------- */
  var form = $("#leadForm");
  if (form) {
    var note = $("#formNote");
    var sayForm = function (msg, kind) { note.textContent = msg; note.className = "form-note " + (kind || ""); };
    var markSent = function () {
      var sendBtn = $("button[type=submit]", form);
      if (sendBtn) {
        sendBtn.classList.add("sent");
        setTimeout(function () { sendBtn.classList.remove("sent"); }, 2400);
      }
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.company.value) return;              // honeypot — real field is "org", not "company"

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var phone = form.phone.value.trim();
      var city = form.city.value.trim();
      var org = form.org.value.trim();
      var interest = form.interest.value;
      var quantity = form.quantity.value.trim();
      var deadline = form.deadline.value.trim();
      var budget = form.budget.value.trim();
      var branding = form.branding.value;
      var message = form.message.value.trim();

      [form.name, form.email, form.city, form.message].forEach(function (f) { f.removeAttribute("aria-invalid"); });

      var bad = null;
      if (!name) bad = form.name;
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) bad = form.email;
      else if (!city) bad = form.city;
      else if (message.length < 10) bad = form.message;

      if (bad) {
        bad.setAttribute("aria-invalid", "true");
        bad.focus();
        sayForm("Please fill in your name, city, a valid email, and a short message.", "err");
        return;
      }

      var subject = interest + " enquiry from " + name + (org ? " (" + org + ")" : "");

      var mailtoFallback = function () {
        var body =
          "Name: " + name + "\n" +
          "Email: " + email + "\n" +
          "Phone: " + (phone || "not given") + "\n" +
          "City: " + city + "\n" +
          "Company / organisation: " + (org || "not given") + "\n" +
          "Looking for: " + interest + "\n" +
          "Quantity: " + (quantity || "not given") + "\n" +
          "Needed by: " + (deadline || "not given") + "\n" +
          "Budget per unit: " + (budget || "not given") + "\n" +
          "Branding needed: " + branding + "\n\n" +
          message;

        window.location.href =
          "mailto:" + CONTACT_EMAIL +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);

        sayForm("Opening your email app — press send there to finish.", "ok");
        markSent();
      };

      var isConfigured = FORMSPREE_ENDPOINT && /^https:\/\/formspree\.io\/f\/\w+$/.test(FORMSPREE_ENDPOINT.trim());
      if (!isConfigured) { mailtoFallback(); return; }

      var sendBtn = $("button[type=submit]", form);
      if (sendBtn) sendBtn.disabled = true;
      sayForm("Sending…", "");

      fetch(FORMSPREE_ENDPOINT.trim(), {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form)
      }).then(function (res) {
        if (sendBtn) sendBtn.disabled = false;
        if (res.ok) {
          sayForm("Thanks — we'll reply within one working day.", "ok");
          markSent();
          form.reset();
        } else {
          sayForm("That didn't go through — please try again, or use WhatsApp / email below.", "err");
        }
      }).catch(function () {
        if (sendBtn) sendBtn.disabled = false;
        mailtoFallback();
      });
    });
  }

  // Scroll animations: fade-up on scroll for each section
  if (typeof IntersectionObserver !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !entry.target.classList.contains('section-animated')) {
          entry.target.classList.add('in-view');
          entry.target.classList.add('section-animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    var sections = document.querySelectorAll('.section');
    sections.forEach(function (section) {
      section.classList.add('section-reveal');
      observer.observe(section);
    });
  }
})();
