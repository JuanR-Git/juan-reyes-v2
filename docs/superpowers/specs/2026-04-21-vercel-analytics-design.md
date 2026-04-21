# Vercel Web Analytics Integration

## Goal

Enable Vercel Web Analytics (page views + route-change tracking) for the Next.js app so post-deploy traffic appears in the Vercel dashboard.

## Scope

- Web Analytics only. No Speed Insights.
- No custom events (`track()`) in this change.
- No environment-variable gating.
- No changes to the Vercel project dashboard (that's a one-time UI toggle the user handles out-of-band).

## Changes

1. Add `@vercel/analytics` to `dependencies` in `package.json` (install via `npm install @vercel/analytics`).
2. In `src/app/layout.tsx`:
   - Import `{ Analytics }` from `@vercel/analytics/next`.
   - Render `<Analytics />` inside `<body>`, as a sibling after `{children}`.

Final `<body>` shape:

```tsx
<body className={`${outfit.variable} ${dmSans.variable} antialiased`}>
  {children}
  <Analytics />
</body>
```

## Behavior Notes

- The `/next` adapter auto-detects the App Router and auto-tracks client-side route changes — no manual router wiring needed.
- The package only sends beacons when `process.env.NODE_ENV === "production"`, so `next dev` is unaffected.
- Data only becomes visible after a deploy to Vercel with Web Analytics enabled in the project dashboard.

## Verification

- `npm run build` completes without type or build errors.
- Manual post-deploy check: visit the deployed site, then confirm page views appear in Vercel → Project → Analytics.

## Out of Scope / Future Work

- Speed Insights (`@vercel/speed-insights`) — can be added later as a parallel, non-overlapping package.
- Custom event tracking (e.g., project card clicks, CTA clicks) via `track()` — per-component additions when product questions call for them.
