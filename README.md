# The $8 Masterclass Shelf

React + TypeScript + Vite storefront for the $8 course replays.
Static site: no backend is needed (checkout happens on Paystack).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
```

## Add thumbnails

Put images in `public/thumbnails/` named after the course number:
`1.jpg`, `2.jpg` ... `27.jpg` (.png / .webp also work, 16:9 works best).
Missing images show a purple placeholder.

## Edit courses, prices, links

Everything lives in `src/data/courses.ts`.
Lines marked `// CHECK` had their Paystack code cut off in the screenshot
they were copied from. Replace them with the full code.

## Deploy

Upload `/dist` to Vercel, Netlify, Cloudflare Pages or any static host.
