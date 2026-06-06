# Debug, Testing and Production Checklists

## Debug Checklist

- [ ] GTM Preview connects on production-like URL.
- [ ] Only one GTM container loads.
- [ ] GA4 config fires once per page load.
- [ ] SPA route change produces one `page_view`.
- [ ] Meta PageView fires once on initial load and once per route change only if intended.
- [ ] No Ads conversion tag fires with placeholder labels.
- [ ] Consent defaults are denied before vendor tags.
- [ ] Consent update changes tag eligibility.
- [ ] dataLayer event contains required params.
- [ ] No raw email/phone/name sent to GA4.

## Testing Checklist

- [ ] Submit detailed contact form success and failure.
- [ ] Submit quick contact form success and failure.
- [ ] Submit detailed audit form success and failure.
- [ ] Submit minimal audit form success and failure.
- [ ] Submit newsletter form.
- [ ] Submit AI chat lead form and send chat message.
- [ ] Click WhatsApp, phone, email, calendar and footer social links.
- [ ] Use blog search, filters and share buttons.
- [ ] Use portfolio filters.
- [ ] Scroll to 10/25/50/75/90/100 percent.
- [ ] Trigger 404 page.
- [ ] Trigger JS error in staging.
- [ ] Verify GA4 DebugView, Meta Test Events, Google Ads diagnostics and Tag Assistant.

## Production Deployment Checklist

- [ ] Export current live GTM as rollback.
- [ ] Import recommended container into a new GTM workspace.
- [ ] Replace all placeholder IDs and labels.
- [ ] Configure consent settings per tag.
- [ ] Publish first to staging or GTM environment.
- [ ] Run QA on desktop and mobile.
- [ ] Compare network calls for duplicates.
- [ ] Mark GA4 conversions.
- [ ] Verify Meta domain and aggregated event measurement.
- [ ] Monitor Realtime reports for 24-48 hours after publish.
