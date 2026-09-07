# Pot Culture — website

A one-page site for Pot Culture: exotic plants sourced from a trusted
nursery (single or bulk), pots ready-made or made to order, and corporate
gifting as the speciality. No installation, no build step, no
dependencies — open `index.html` in a browser and it runs.

```
index.html               the main page and all its text
care.html                plant care guide (linked from the FAQ + footer)
assets/css/style.css     colours, layout, all the motion
assets/js/main.js        background transitions, gallery, form
assets/img/              your photos go here (see the README in it)
tools/make-images.sh     resizes your photos for the web
```

## Before this goes in front of a real customer

This isn't cosmetic — these are the things that make the difference between
a visitor enquiring and leaving. In order:

1. **Set up the form backend.** See "The contact form" below — five minutes,
   free, and it's the difference between enquiries reaching your inbox and
   relying on the visitor's email app to work.
2. **Your WhatsApp number.** Two places have `91XXXXXXXXXX` — the floating
   button in `index.html` (`EDIT #11`) and the same button on `care.html`.
   Search both files for `XXXXXXXXXX`.
3. **Your real email, phone, city** — `index.html` `EDIT #12`, and
   `assets/js/main.js` line 17.
4. **Every `___` in the page.** These are deliberate blanks, not bugs —
   search `index.html` for `___`. They're the MOQ/lead-time table, the
   replacement-policy line, and the delivery FAQ. A blank is honest; a
   guessed number is not — but a blank left live looks unfinished, so fill
   these in before sharing the link. See "Real facts I couldn't invent"
   below for the full list of what's needed and why.
5. **A domain.** `github.io` reads as a hobby project to a corporate buyer
   doing procurement. Roughly ₹800/year buys a real one.
6. **Real photos.** See "Photos" below.

## Interaction & feel

- **Fraunces**, a serif display face, is loaded from Google Fonts for
  headings — body text stays on Inter. This needs an internet connection to
  render (it falls back to Georgia if it can't load, so nothing breaks
  offline — it's just plainer).
- A sliding underline follows the active nav link as you scroll (desktop).
- Buttons lean gently toward your cursor; cards tilt slightly in 3D. Both
  turn off automatically on touch devices and under reduced-motion.
- A scrolling marquee of plant names sits under the hero — edit the list in
  `index.html`, marked `EDIT #4`.
- Hovering a gallery photo shows a "View" label that follows the cursor.
- On phones, a sticky "Enquire now" bar appears once you scroll past the
  hero and hides again once the real contact form is on screen.
- Submitting the form morphs the button into a checkmark for a moment.

## The scrolling background

The whole page sits on one fixed background that **crossfades as you scroll —
in both directions**. Each section declares which background it wants:

```html
<section class="section" id="gallery" data-bg="2">
```

Whichever section owns the middle of your screen decides what's showing, so
scrolling back up fades everything back in reverse. To change which photo a
section uses, change its `data-bg` number. To change how slow the fade is,
edit one line at the top of `style.css`:

```css
--bg-fade: 1100ms;
```

Everything is off automatically for visitors who have "reduce motion" turned
on in their system settings.

The site is a **light theme**. If your photos are dark or busy, the text over
them may need more protection — raise the numbers in `.bg-scrim` in
`style.css`. If your photos are pale, lower them to let more show through.

## Photos

**None are included** — the site ships with designed artwork in every photo
slot, so it looks finished today and becomes photographic the moment you add
files. See **[assets/img/README.md](assets/img/README.md)** for the exact
filenames and sizes.

Short version: shoot at 4K, but export to **2560px wide for backgrounds** and
**1600px for everything else**. Putting raw 4K files on a website makes it
take a minute to load on mobile data, and nobody can see the difference.

## Make it yours

Search `index.html` for `EDIT` — there are numbered markers, in the order
you'll hit them scrolling down the page:

| # | What to change |
|---|----------------|
| 1 | Page title and description — what Google shows |
| 2 | Social preview image |
| 3 | The headline |
| 4 | The marquee — plant varieties you actually stock |
| 5 | The three things you sell |
| 6 | Gallery photos and captions |
| 7 | **Gifting prices — currently `₹___`** |
| 7a | The ESG/CSR line — delete it if it doesn't apply to your buyers |
| 7b | **The MOQ & lead-time table — currently all `___`** |
| 8 | The replacement-policy line — currently `___` days |
| 9 | Every FAQ answer that still has a `___` blank |
| 10 | `assets/js/main.js` — Formspree endpoint + your real email |
| 11 | **The WhatsApp number** — `index.html` and `care.html` both |
| 12 | Footer: your email, phone, city |
| 13 | `care.html` — the plant list, if these three aren't what you send |

### The three that matter most

**Prices and lead times.** The gifting tiers read `₹___`, and the MOQ table
is entirely blank, on purpose. A blank is honest; an invented number is not.
Fill them in — this is the single table a corporate buyer checks before they
even open the enquiry form.

**Your WhatsApp number.** In India this one field will out-convert the
enquiry form by a wide margin. It's currently a placeholder in two files —
see `EDIT #11`.

**Your email.** `assets/js/main.js` still says `hello@example.com`. Until
you change it, the mailto: fallback reaches nobody (though see "The contact
form" below — you may not need mailto: at all once Formspree is set up).

### Colours

The first lines of `style.css`:

```css
--brand:  #2f7d5f;   /* green: buttons, links     */
--accent: #6faa46;   /* leaf green for gradients  */
--clay:   #c07a4e;   /* terracotta accents        */
```

## The contact form

**Do this first — it's the single highest-priority fix on this whole site.**

Right now the form falls back to `mailto:` — it opens the visitor's own
email app with the enquiry pre-written. That works with zero setup, but the
visitor has to press send themselves, and it silently does nothing useful
if they don't have an email app configured (common on a work laptop or a
shared computer).

To have enquiries land straight in your inbox instead:

1. Go to [formspree.io](https://formspree.io) and sign up — the free tier
   is enough (50 submissions/month)
2. Create a form, copy the endpoint URL it gives you — it looks like
   `https://formspree.io/f/abcwxyz`
3. Open `assets/js/main.js`, and paste it into this line near the top:
   ```js
   var FORMSPREE_ENDPOINT = "";
   ```
   so it reads `var FORMSPREE_ENDPOINT = "https://formspree.io/f/abcwxyz";`

That's it — nothing else needs to change. The form now posts inline (no
page reload, no email app), shows "Thanks — we'll reply within one working
day" on success, and clears itself. If Formspree is ever unreachable, it
automatically falls back to the `mailto:` behaviour rather than failing
silently. Leave `FORMSPREE_ENDPOINT` blank and the `mailto:` fallback keeps
working exactly as it does now — the site never breaks either way.

**Test it before you rely on it** — fill in the form yourself and confirm
the enquiry actually reaches your inbox.

## Real facts I couldn't invent

Everything below is genuinely just missing — not because it was forgotten,
but because only you know the answer, and a guessed number is worse than an
honest blank. Each of these has a `___` waiting for it somewhere on the
page (search `index.html` for `___` to find every one):

- **Delivery** — which cities, what it costs, how long it takes
- **MOQ & lead times** — the table in the gifting section, plus separate
  lead time for custom pots and branded pots
- **Replacement policy** — how many days, for damage or death
- **Indicative price bands** — the `₹___` gifting tiers
- **Pot specs** — materials, sizes, finishes, how branding is actually
  applied (the FAQ currently asks the buyer to tell *you* their preference
  rather than listing methods, since I don't know which ones you offer)
- **Your actual plant stock list** — the marquee (`EDIT #4`) and the three
  plants on `care.html` (`EDIT #13`) are examples, not a confirmed catalogue

## Bringing back the stats strip

A "40+ varieties · 200+ pots in stock · …" strip used to sit between the
hero and "What we sell". It was removed rather than shown with empty "—"
placeholders — an empty stat is worse than no section. Once you have real
numbers, add this back just above `<section class="section" id="shop"...>`
in `index.html`:

```html
<section class="strip" data-bg="1">
  <div class="wrap strip-inner">
    <div class="stat"><b data-count="40" data-suffix="+">—</b><span>Exotic plant varieties</span></div>
    <div class="stat"><b data-count="200" data-suffix="+">—</b><span>Pots in stock</span></div>
    <div class="stat"><b data-count="0">—</b><span>Corporate orders</span></div>
    <div class="stat"><b data-count="0">—</b><span>Cities delivered to</span></div>
  </div>
</section>
```

`data-count` is the real number; it counts up automatically the first time
it scrolls into view. Swap in your real numbers, or drop any stat you'd
rather not state.

## The care guide (`care.html`) and its QR code

`care.html` is a real, standalone page — light/water advice for the three
hardy plants used in bulk orders, plus general rules. It's linked from the
FAQ and the footer already. The idea (from a review of this site) is to
print a QR code on every care card that opens straight to this page.

I haven't generated that QR code yet on purpose: it should point at your
real domain, not the `github.io` address, so it doesn't need reprinting
once you buy one. Once you have a domain, ask and I'll generate it — or use
any free QR generator (e.g. [qr-code-generator.com](https://www.qr-code-generator.com))
pointed at `https://yourdomain.com/care.html`.

## Putting it online

Free, about a minute:

1. **Settings → Pages** in this repository
2. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`
3. Save. It goes live at `https://sarthak07072121.github.io/pot-culture/`

Or drag this folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

## Before you launch

- [ ] Formspree endpoint set, and tested with a real submission
- [ ] WhatsApp number set in both `index.html` and `care.html`
- [ ] No `___` left anywhere (search the file — this catches the MOQ
      table, replacement policy, and delivery FAQ in one go)
- [ ] No `₹___` left in the gifting prices
- [ ] No `example.com` or `91XXXXXXXXXX` left — email, phone, WhatsApp are
      all yours
- [ ] FAQ answers reflect what you'd actually say on the phone
- [ ] The plant list on `care.html` matches what you actually send
- [ ] `alt="..."` text describes your actual photos, once you add them
- [ ] Photos added, or you're consciously fine shipping with the artwork
- [ ] Opened it on your own phone
- [ ] A domain, if this is going to procurement teams (`github.io` reads
      as unfinished)
