# Photos go in this folder

The site is built to be photographic. Until you put files here, every photo
slot renders as designed artwork — nothing looks broken, and you can put the
site live today and add photos later.

## The filenames the site looks for

Use these exact names. Any file you don't provide simply stays as artwork.

### The five products (highest priority — these sell)

`shop-1.jpg` through `shop-5.jpg`, matching the order of the `PRODUCTS`
array in `assets/js/main.js`:

| File | Product |
|------|---------|
| `shop-1.jpg` | Variegated Monstera Albo |
| `shop-2.jpg` | Snake Plant |
| `shop-3.jpg` | ZZ Plant Raven |
| `shop-4.jpg` | Philodendron Birkin |
| `shop-5.jpg` | Anthurium Andraeanum |

Square (1:1) crop — the shop grid is a square photo above each card's text.

### The three "what we sell" cards

| File | Card |
|------|------|
| `grow-1.jpg` | Exotic & rare plants |
| `grow-2.jpg` | Potted plants |
| `grow-3.jpg` | Pots |

### Corporate gifting proof photos

| File | Where |
|------|-------|
| `gifting.jpg` | The tall photo — portrait/3:4 crop |
| `gifting-packed.jpg` | A packed corporate order, ready for delivery |
| `gifting-tags.jpg` | Branded gift tags on an order |
| `gifting-nursery.jpg` | Plants at the nursery, ready to pot |

### One extra

- `social.jpg` — 1200×630, what shows when someone shares your link on
  WhatsApp or LinkedIn

## What size? (the 4K question)

Shoot at 4K — absolutely. But **don't put the raw 4K file on the website.**

A 3840px photo straight from a phone is often 6–12 MB. Fourteen of those is
close to 100 MB, and this site is built mobile-first for visitors on 4G —
that's a page that takes a minute to load, and people leave after three
seconds. You'd lose customers to a detail nobody can see.

Export for the web at:

| Use | Width | Target file size |
|-----|-------|------------------|
| Shop photos (`shop-*`) | 1200px, square crop | under 150 KB |
| Cards and gifting proof | 1600px | under 250 KB |
| `social.jpg` | 1200×630 | under 200 KB |

Keep your full-resolution originals somewhere safe — just don't upload them.
Every `<img>` on the site already has `loading="lazy"` so photos below the
fold don't cost anything until a visitor actually scrolls to them.

**JPG at about 80% quality** is right for photos. WebP is smaller again if
your editor exports it; rename the files to `.webp` and update the paths in
`index.html` and the `image` field in each product in `assets/js/main.js`.

## Resizing them

If you have ImageMagick installed, drop your originals in a folder and run:

```
bash tools/make-images.sh ~/my-photos
```

It writes correctly-sized copies into this folder. Otherwise any of these work
and are free:

- **[squoosh.app](https://squoosh.app)** — drag a photo in, set the width,
  download. No install, works in the browser.
- Windows Photos / Mac Preview — both can resize and export
- Canva, Photoshop, Lightroom — "Export for web"

## Two things worth doing

**Shoot the shop photos against a plain background.** A pot against a clean
wall photographs far better than a pot on a cluttered table — this matters
more for the shop than anywhere else on the site, since these are the
photos a buyer judges the product by.

**Keep the alt text honest.** In `index.html` and `assets/js/main.js` each
photo has an `alt="..."` description. Update it to describe the real photo —
it's what blind visitors hear, and Google reads it too.
