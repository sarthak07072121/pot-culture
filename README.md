# Pot Culture — website

A one-page site for Pot Culture: exotic plants sourced from a trusted
nursery (single or bulk), pots ready-made or made to order, and corporate
gifting as the speciality. No installation, no build step, no
dependencies — open `index.html` in a browser and it runs.

```
index.html               the page and all its text
assets/css/style.css     colours, layout, all the motion
assets/js/main.js        background transitions, gallery, form
assets/img/              your photos go here (see the README in it)
tools/make-images.sh     resizes your photos for the web
```

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

Search `index.html` for `EDIT` — there are 10 numbered markers.

| # | What to change |
|---|----------------|
| 1 | Page title and description — what Google shows |
| 2 | Social preview image |
| 3 | The headline |
| 4 | Stats — put a number in `data-count` and it counts up on scroll |
| 5 | The three things you sell |
| 6 | Gallery photos and captions |
| 7 | **Gifting prices — currently `₹___`** |
| 8 | Terms line (GST, delivery, minimums) |
| 9 | FAQ answers |
| 10 | Footer: your email, phone, city |

Plus `assets/js/main.js`, line 5: the email address enquiries go to.

### The two that matter most

**Prices.** The gifting tiers read `₹___` on purpose. A blank is honest; an
invented price is not. Put your real numbers in, or delete the
`<em class="tier-price">` lines so people simply enquire.

**Your email.** It says `hello@example.com` in two places. Until you change
both, enquiries reach nobody.

### Colours

The first lines of `style.css`:

```css
--brand:  #2f7d5f;   /* green: buttons, links     */
--accent: #6faa46;   /* leaf green for gradients  */
--clay:   #c07a4e;   /* terracotta accents        */
```

## The contact form

It opens the visitor's email app with the enquiry pre-written — works
everywhere, costs nothing, but they have to press send.

To have enquiries land in your inbox automatically, sign up at
[formspree.io](https://formspree.io) (free tier is fine) and change:

```html
<form class="form card reveal" id="leadForm" novalidate>
```

to:

```html
<form class="form card reveal" id="leadForm" action="https://formspree.io/f/YOUR_ID" method="POST">
```

then delete the `e.preventDefault();` line in `main.js`. Validation still runs.

## Putting it online

Free, about a minute:

1. **Settings → Pages** in this repository
2. Source: **Deploy from a branch**, branch `main`, folder `/ (root)`
3. Save. It goes live at `https://sarthak07072121.github.io/pot-culture/`

Or drag this folder onto [app.netlify.com/drop](https://app.netlify.com/drop).

## Before you launch

- [ ] Photos added, or you're happy with the artwork
- [ ] No `₹___` left (search the file for `___`)
- [ ] No `example.com` left — email and phone are yours
- [ ] FAQ answers replaced with your real answers
- [ ] Delivery cities and lead times are accurate
- [ ] `alt="..."` text describes your actual photos
- [ ] Contact form tested — send yourself one
- [ ] Opened it on your own phone
