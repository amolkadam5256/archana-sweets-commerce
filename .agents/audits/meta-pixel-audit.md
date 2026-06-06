# Meta Pixel Audit

## Existing Setup

- Pixel ID: `911738005183270`
- Installed in `components/PublicComponents/Analytics/MetaPixel.tsx`
- Browser events are also fired through `lib/analytics.ts`

## Required Fixes

- Add `event_id` to conversion events.
- Decide whether Meta browser events are owned by code or GTM.
- Add Meta CAPI server events with browser/server deduplication.
- Add advanced matching only after consent and server-side hashing.

