# Pot Culture — website

A one-page site for Pot Culture: exotic plants sourced from a trusted
nursery (single or bulk), a working shop with a WhatsApp-checkout cart,
pots ready-made or made to order, and corporate gifting as the speciality.
Plain HTML + CSS + vanilla JS — no framework, no build step, no
dependencies (beyond one Google Fonts stylesheet). Built mobile-first, on
the assumption that most visitors are on a mid-range Android phone on 4G.

```
index.html                    the main page and all its text
care.html                     plant care guide (linked from the FAQ + footer)
assets/css/style.css          colours, layout, motion
assets/js/main.js             CONFIG constants, product data, cart, form
assets/img/                   your photos go here (see the README in it)
assets/pot-culture-gifting.pdf   the downloadable gifting catalogue
tools/make-images.sh          resizes your photos for the web
tools/make_pdf_catalogue.py   regenerates the PDF catalogue
```

## Before this goes in front of a real customer

1. **Your WhatsApp number.** This is the single highest-priority fix —
   it powers both the floating chat button and cart checkout. One
   constant, three places: `assets/js/main.js` (`WHATSAPP_NUMBER`),
   `index.html`, and `care.html`. Search all three for `91XXXXXXXXXX`.
2. **Set up the form backend.** See "The contact form" below.
3. **Your real prices.** Every price in the shop is a realistic *category*
   estimate, clearly marked `TODO` in `assets/js/main.js` — not your real
   prices. See "The shop" below.
4. **Your real email, phone, city.** `assets/js/main.js` (`CONTACT_EMAIL`).
   The footer deliberately shows no email/phone/city until you add
   real ones — see "Why the footer looks empty" below.
5. **A domain.** `github.io` reads as unfinished to a corporate buyer
   doing procurement. Roughly ₹800/year buys a real one.
6. **Real photos.** See "Photos" below — the site looks complete without
   them (designed placeholder artwork fills every slot) but sells much
   better with them, especially in the shop.
7. **Regenerate the PDF catalogue** once the above is real —
   `python3 tools/make_pdf_catalogue.py` (needs `pip install reportlab`).

## The shop and cart

The shop is real, working e-commerce for a static site — no backend, no
payment processor, no account system.

**Product data** lives in one place: the `PRODUCTS` array at the top of
`assets/js/main.js`. Each product is `id`, `name`, `botanical`, `price`,
`potSize`, `light`, `difficulty` (`Easy` / `Medium` / `Fussy`),
`description`, `image`, `inStock`. Edit the array and the shop grid
updates — nothing else to touch.

**Prices are realistic placeholders, not your real prices** — each has a
`// TODO: confirm real price` comment. They exist so the cart has numbers
to add up; they are not a claim about what you actually charge. Same for
`inStock` — the Monstera Albo is marked out of stock as an example of
that card state, not because it's actually unavailable.

**The cart** persists in the visitor's browser (`localStorage`, key
`potculture_cart`) — it survives a reload, but is private to that device;
it isn't a shared "orders" list anywhere. **Checkout does not take a
payment.** It builds a plain-text order summary and opens WhatsApp
(`wa.me`) with it pre-filled, or — via the drawer's secondary link — a
`mailto:` with the same text. Either way, a human on your end still has to
confirm the order and take payment separately (bank transfer, UPI, COD,
whatever you use).

**Out-of-stock products** show "Notify me" instead of a stepper and Add
to cart. Clicking it scrolls to the enquiry form with the message
pre-filled — there's no separate waitlist database, it's just a fast path
into the same form.

## The contact form

**Do this early — it's the difference between enquiries reaching you and
reaching nobody.**

Right now the form falls back to `mailto:` — it opens the visitor's own
email app with the enquiry pre-written. That works with zero setup, but
the visitor has to press send themselves, and it does nothing useful if
they don't have an email app configured (common on a work laptop).

To have enquiries land straight in your inbox instead:

1. Go to [formspree.io](https://formspree.io) and sign up — free tier is
   enough (50 submissions/month)
2. Create a form, copy the endpoint URL it gives you — looks like
   `https://formspree.io/f/abcwxyz`
3. Open `assets/js/main.js` and paste it in:
   ```js
   var FORMSPREE_ENDPOINT = "https://formspree.io/f/abcwxyz";
   ```

That's it. The form posts inline (no reload), shows a real success or
error message, and clears itself. If Formspree is ever unreachable it
automatically falls back to `mailto:` rather than failing silently. Leave
`FORMSPREE_ENDPOINT` blank and the `mailto:` fallback keeps working
exactly as it does now.

**Test it** — submit the form yourself and confirm the enquiry actually
reaches you.

## CRITICAL: why some things look unusually blank

This site follows one rule harder than most: **a real value, or nothing —
never a fabricated number, and never a visible blank or dash either.**
A few places that might look sparse are that way on purpose, not because
something broke:

- **The footer has no email, phone, or city.** The alternative — showing
  `hello@example.com` or `+91 00000 00000` as if they were real — is worse
  than showing nothing, because a visitor can't tell it's fake. The
  footer instead links to the enquiry form and WhatsApp, which work today.
  Add real contact details in `index.html` (`EDIT #9`) once you have them.
- **There's no stats band** ("40+ varieties · 200+ orders…") — deleted
  rather than shown with an empty "—". See "Bringing back a stats band"
  below if you want one.
- **The gifting price-band table says "Confirmed on enquiry"** in every
  cell, rather than a guessed number. The *lead time* column is a true
  relative ordering (bigger orders take longer — a structural fact, not
  a specific promise); the price band genuinely isn't set yet.
- **Two FAQ answers** (delivery, replacement policy) use honest process
  language rather than fake specifics — "we'll confirm your city's
  delivery cost when you enquire" instead of an invented number.
- **The PDF catalogue has no contact section.** Same logic — it was cut
  entirely rather than shipped with placeholder contact details a
  corporate buyer might actually try to use.

None of this is a bug to "fix" by filling in something plausible-looking —
fill it in with the truth once you have it, and not before.

## Trust bar, care guide, and the "will they keep it alive" block

**Trust bar** (under the hero) is a config array — `TRUST_BAR` in
`assets/js/main.js`. Only claims that are true regardless of unconfirmed
specifics ship by default (GST invoicing *on request*, not "available";
replacement for damage on arrival; MOQ from 1 piece). There's a commented
example for adding a delivery-cities pill once you have a confirmed
service area — don't add it with an invented city list.

**`care.html`** is a real, standalone page — light/water advice for the
three hardy plants used in bulk gifting, plus general rules. It's linked
from the FAQ and footer. The idea is a QR code on every care card that
opens straight to it; that code isn't generated yet on purpose — it
should point at your real domain, not `github.io`, so it doesn't need
reprinting. Ask once you have a domain, or use any free QR generator
pointed at `https://yourdomain.com/care.html`.

**The "will they keep it alive?" block** in the gifting section answers
the real objection to living gifts head-on (hardy species only for bulk,
a care card + guide link in every box, support afterwards). It's real
copy, not a placeholder — edit it if your actual policy differs.

## Colours

The first lines of `style.css`:

```css
--brand:  #2f7d5f;   /* deep forest green: buttons, links */
--accent: #6faa46;   /* leaf green, used sparingly         */
--clay:   #c07a4e;   /* terracotta — the one accent colour */
```

`--clay` itself is **not** used as text colour anywhere (it's 3.4:1
contrast on white — fails WCAG AA). The "Medium" difficulty pill uses a
darker shade, `#a05a36` (5.2:1), for the same hue at readable contrast.
If you change `--clay`, re-check that pill specifically.

## Motion

- **Fraunces**, a serif display face, loads from Google Fonts for
  headings with `display=swap` (text renders immediately in a fallback
  serif, then swaps once Fraunces loads — no invisible-text flash).
  Body text stays on Inter.
- **Section reveals**: a 300ms fade-and-rise as each section scrolls
  into view, once only — it never re-triggers on scroll-back.
- **Leaf cursor**: a small SVG leaf trails the pointer with lerp easing
  (each frame moves 12% of the remaining distance, not a hard snap) and
  tilts toward its direction of travel. Desktop only — off on touch
  devices (no pointer to follow) and under `prefers-reduced-motion`.
- Everything above is off automatically under `prefers-reduced-motion`.

Deliberately **not** included, even though earlier drafts of this site
had them: a full-bleed photo background that crossfades as you scroll,
glassmorphism/backdrop-blur cards, magnetic buttons, and 3D card tilt.
All four are decorative rather than functional, and cost real CPU/battery
on a mid-range phone — cut in favour of the "restraint over decoration"
brief and the performance/mobile priority.

## Photos

**None are included** — every photo slot renders as designed artwork
until you add a real file, so the site looks finished today and becomes
photographic the moment you do. See
**[assets/img/README.md](assets/img/README.md)** for exact filenames and
sizes — the shop photos (`shop-1.jpg` … `shop-5.jpg`) matter most, since
they're what a buyer judges the product by.

Every photo already has `loading="lazy"` — nothing below the fold costs
anything until a visitor scrolls to it, which matters a lot on 4G.

## Make it yours

Search `index.html` for `EDIT` (numbered) and `assets/js/main.js` for
`EDIT` (unnumbered — it's the config file, self-evidently the place to
look).

| # | What to change |
|---|----------------|
| 1 | Page title and description — what Google shows |
| 2 | Social preview image |
| 3 | The headline |
| 4 | The three "what we sell" cards |
| 5 | Gifting price-band table cells, once confirmed |
| 6 | The PDF catalogue download link |
| 7 | Two FAQ answers using honest process language |
| 8 | The WhatsApp number (also in `main.js` and `care.html`) |
| 9 | Footer contact details — currently omitted, not fake |

Plus, in `assets/js/main.js`: `FORMSPREE_ENDPOINT`, `CONTACT_EMAIL`,
`WHATSAPP_NUMBER`, `TRUST_BAR`, `PRODUCTS`.

## Bringing back a stats band

If you want a "40+ varieties · 200+ pots in stock · …" strip back under
the hero once you have real numbers, add this just above
`<section class="section" id="overview">` in `index.html`:

```html
<section class="section" style="padding-block:32px">
  <div class="wrap grid grid-3" style="text-align:center">
    <div><b style="font-family:var(--font-display);font-size:2rem">40+</b><div style="color:var(--ink-soft);font-size:.85rem">Exotic plant varieties</div></div>
    <div><b style="font-family:var(--font-display);font-size:2rem">200+</b><div style="color:var(--ink-soft);font-size:.85rem">Pots in stock</div></div>
    <div><b style="font-family:var(--font-display);font-size:2rem">30+</b><div style="color:var(--ink-soft);font-size:.85rem">Corporate orders delivered</div></div>
  </div>
</section>
```

Swap in your real numbers. Drop any stat you'd rather not state — three
is fine, so is one.

## Putting it online

Free, about a minute:

1. **Settings → Pages** in this repository
2. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`
3. Save. It goes live at `https://sarthak07072121.github.io/pot-culture/`

Or drag this folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

## Before you launch

- [ ] WhatsApp number set in all three places (`main.js`, `index.html`,
      `care.html`) and tested — add something to cart, checkout, confirm
      the WhatsApp message opens correctly
- [ ] Formspree endpoint set, and tested with a real submission
- [ ] Real prices in `PRODUCTS`, and `inStock` reflects real inventory
- [ ] Real email, phone, city added to the footer (`EDIT #9`)
- [ ] Gifting table price-band cells filled in, once confirmed
- [ ] The two honest-process FAQ answers replaced with real specifics,
      once you have them
- [ ] PDF catalogue regenerated (`python3 tools/make_pdf_catalogue.py`)
      after any of the above changes
- [ ] Shop photos added (`shop-1.jpg` … `shop-5.jpg`) — highest priority
      photos on the whole site
- [ ] Opened it on your own phone, on mobile data if you can
- [ ] A domain, if this is going to procurement teams
