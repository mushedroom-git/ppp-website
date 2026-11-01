# PPP — Custom gaming PCs

React 19 + TypeScript + Tailwind CSS v4, built with Vite. Front end only; no backend yet.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build
```

## Layout

- `src/data/` — sample builds, builder options, showcase. Edit these to change content.
- `src/context/StoreContext.tsx` — cart, toast, detail dialog, search query, request-form draft.
- `src/components/` — one component per page section; `ui/` holds shared pieces (Button, icons, etc.).
- `src/index.css` — Tailwind import plus theme tokens (colours, fonts, animations).
- `legacy/ppp-gaming-pcs.html` — the original single-file page, kept for reference.

## Where a backend will plug in

- `RequestForm.tsx` → `onSubmit` (currently logs to the console).
- `StoreContext.tsx` → `reserve()` and the cart (currently in-memory only).
- `data/builds.ts` → replace the static array with a fetch.
