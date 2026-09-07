# Business landing page

A complete one-page business website. No installation, no build step, no
dependencies — it is three files that any web browser can open.

```
index.html              the page and all its text
assets/css/style.css    colours, fonts, layout
assets/js/main.js       menu, pricing toggle, contact form
README.md               this file
```

## Look at it

Double-click `index.html`. That's it.

## Make it yours

Every place you need to change is marked with a comment that says
`EDIT #1`, `EDIT #2`, and so on. Search for the word `EDIT` in a file and
you'll find them all. In order:

| # | File | What to change |
|---|------|----------------|
| 1 | index.html | Page title and description (what Google shows) |
| 2 | index.html | Your business name in the header |
| 3 | index.html | The headline — the most important sentence on the page |
| 4 | index.html | Stats strip — use real numbers or delete the section |
| 5 | index.html | Your six services |
| 6 | index.html | Your pricing tiers |
| 7 | index.html | Testimonials — **read the warning there** |
| 8 | index.html | FAQ — the questions customers actually ask you |
| 9 | index.html | Footer: your email, phone, city |
| 10 | style.css | Your brand colours (three lines re-skin the whole site) |
| 11 | main.js | The email address enquiries go to |

### Changing the colours

Open `assets/css/style.css`. The first three lines are:

```css
--brand:      #4f46e5;   /* main colour: buttons, links */
--brand-dark: #4338ca;   /* darker shade for hover      */
--accent:     #06b6d4;   /* second colour for gradients */
```

Replace the colour codes and the entire site updates. Pick colours at
[coolors.co](https://coolors.co) if you don't have brand colours yet.

## The contact form

Right now the form opens the visitor's own email app with the enquiry
pre-written. It works everywhere and costs nothing, but the visitor has to
press send themselves — so some will drop off.

**To have enquiries arrive in your inbox automatically**, sign up at
[formspree.io](https://formspree.io) (free tier is fine), then in
`index.html` change:

```html
<form class="form card reveal" id="leadForm" novalidate>
```

to:

```html
<form class="form card reveal" id="leadForm" action="https://formspree.io/f/YOUR_ID" method="POST">
```

and in `assets/js/main.js` delete the line `e.preventDefault();` inside the
submit handler. The validation still runs; the form then posts to Formspree.

## Putting it online

You need two things: a **domain** (your address, ~₹900/year) and **hosting**
(where the files live). For a site like this, hosting is free.

The simplest route — drag and drop, no account juggling:

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag this whole folder onto the page
3. It's live in about ten seconds on a free `.netlify.app` address
4. Buy your domain and point it there in Netlify's settings

### Or with GitHub Pages (free, if this is on GitHub)

1. Push this folder to a GitHub repository
2. In the repository: **Settings → Pages**
3. Under "Source" pick **Deploy from a branch**, branch `main`, folder `/ (root)`
4. Save. About a minute later your site is live at
   `https://<your-username>.github.io/<repo-name>/`

`index.html` is at the top level of this folder, which is exactly what Pages
expects — nothing to configure.

Alternatives that work the same way: [Vercel](https://vercel.com) or
[Cloudflare Pages](https://pages.cloudflare.com).

## Before you launch — checklist

- [ ] Every `EDIT #` marker dealt with
- [ ] No text still says "Lumina" (search the files for it)
- [ ] Testimonials are real, or the section is deleted
- [ ] Prices and phone number are correct
- [ ] Contact form tested — send yourself one
- [ ] Opened it on your own phone
