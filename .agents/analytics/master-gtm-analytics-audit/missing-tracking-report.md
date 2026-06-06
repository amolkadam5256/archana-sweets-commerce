# Missing Tracking Report

Priority P0:

- Add Consent Mode V2 default and update flow from a consent banner.
- Replace Google Ads placeholders with real `AW-ID/label` values.
- Add `event_id` to every conversion event.
- Implement Meta CAPI and Google enhanced conversions server-side with hashed PII.
- Track all successful form submissions consistently, including quick/minimal forms.

Priority P1:

- Add blog search, result click, filter apply, portfolio filter, share click and chat message tracking.
- Add scroll thresholds 10 and 100, or move scroll entirely to GTM to avoid mixed ownership.
- Add video start/progress/pause/complete tracking for local MP4 and YouTube embeds.
- Add JS error and API failure events.
- Store first-touch UTMs, landing page, referrer, gclid, fbclid, _fbp and _fbc.

Priority P2:

- Add engaged_session/time_on_page events.
- Add element visibility for lead forms and key CTAs.
- Add 404 tracking from `app/not-found.tsx`.
- Add outbound link tracking for social links and external references.

