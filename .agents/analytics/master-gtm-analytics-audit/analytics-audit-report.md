# Growthik Media Master GTM and Analytics Audit

Audit date: 2026-05-28
Project: GrowthikMedia.com Next.js website
Output folder: `.agents/analytics/master-gtm-analytics-audit`

## Audit Summary

Growthik Media has a strong analytics base, but it is not production-complete for paid media attribution. GTM is installed once globally, GA4 routing exists through GTM/dataLayer, Meta Pixel is installed in code, and several lead/contact events are already pushed. The highest-risk gaps are consent, server-side deduplication, placeholder Google Ads conversion IDs, partial form coverage, duplicate internal visitor logging, and missing event IDs for Meta CAPI readiness.

## Existing Tracking Inventory

- GTM container in code: `GTM-PBHC6WLL` from `components/PublicComponents/comman/GTM.tsx`.
- GTM import file: `gtm-import.json` with 26 GA4 tags, 25 custom-event triggers, 22 dataLayer variables, no duplicate names detected by JSON parsing.
- Recommended GTM file: `.agents/analytics/recommended-gtm-container.json`, regenerated with safer trigger/tag IDs.
- GA4 measurement ID detected in GTM files: `G-30C78ZK2G8`.
- Meta Pixel in code: `911738005183270` from `components/PublicComponents/Analytics/MetaPixel.tsx`.
- Analytics wrapper: `lib/analytics.ts`, pushing to `window.dataLayer` and directly calling `fbq`.
- SPA page tracking: `components/PublicComponents/comman/PageViewTracker.tsx`.
- Internal visit logging: `PageViewTracker.tsx` and `VisitorTracker.tsx` both post to `/api/visitor`; only `PageViewTracker` is mounted in public layout, but duplicate risk remains if `VisitorTracker` is mounted later.
- Lead APIs: `/api/send-email`, `/api/contact`, `/api/audit-request`, `/api/chat/lead`.
- Forms found: detailed contact, common contact, quick contact, detailed audit, minimal audit, newsletter, AI chat lead.
- Communication actions found: WhatsApp floating button/share links, phone links, mail links, calendar link detection.
- Video assets found: `public/robot-mascot.mp4`, `public/robot-mascot-2.mp4`; no video analytics implementation found.
- Search/filter UIs found: blog search/filter and portfolio filter; no analytics events found in those components.

## Existing Tags, Triggers and Variables

### Current GTM Import

- Tags: GA4 base, page_view, generate_lead, contact, view_content, lead_intent, purchase, add_to_cart, begin_checkout, sign_up, schedule, submit_application, cta/contact/WhatsApp/phone, service_intent, scroll_depth, form_start, form_step_complete, form_submit_error, search, subscribe, start_trial, add_payment_info, add_to_wishlist.
- Triggers: custom events for the above.
- Variables: dataLayer variables for page, content, CTA, channel, form, service, goal, intent, percent, value, currency, search, error and method.
- Duplicate names: none detected in JSON.

### Code Events

| Event | Destination | Trigger Source | Key Parameters | Status |
| --- | --- | --- | --- | --- |
| page_view | GA4 | Route change in PageViewTracker | page_path,page_group,referrer_source,ai_referral | Implemented |
| ViewContent | Meta/GA4 via GTM | Service/blog/portfolio view clicks and service page views | content_name,content_category,content_type | Implemented but naming mixed |
| service_intent | GA4 | Service page route view | page_path,page_group,intent_action | Implemented |
| cta_click | GA4 | Global contact/audit/calendar click listener | cta_text,destination,page_group | Implemented |
| whatsapp_click | GA4/Meta/Ads | wa.me/api.whatsapp.com links | channel,destination,cta_text | Implemented |
| phone_call | GA4/Meta/Ads | tel: links | channel,destination,cta_text | Implemented |
| contact_click | GA4 | mailto/contact/calendar links | channel,destination | Implemented |
| form_start | GA4 | Focus or submit on some forms | form_type,goal | Partial |
| form_submit_success | GA4/Meta | trackLead helper | content_name,form_type,service,goal | Partial |
| form_submit_error | GA4 | API/runtime failure in tracked forms | form_type,error_type | Partial |
| Lead | Meta | trackLead and audit/contact CTAs | content_name,content_category | Implemented client side |
| Contact | Meta | contact/phone/WhatsApp/chat open | content_name,content_category | Implemented client side |
| CompleteRegistration | Meta | newsletter/chat lead | content_name,status | Implemented |
| InitiateCheckout | Meta | audit funnel intent | content_name,content_category,goal | Implemented |
| Search | Meta | trackSearch helper only | search_string | Helper exists; usage not found |
| internal_search | GA4 | Blog search/filter UI | search_term,result_count | Missing |
| filter_apply | GA4 | Blog and portfolio filters | filter_type,filter_value,result_count | Missing |
| share_click | GA4 | Blog share buttons | platform,content_name,destination | Missing |
| chat_open | GA4/Meta | AI chat launcher | content_category | Only Contact fired |
| chat_message_sent | GA4 | AI chat message submit | session_id,message_count | Missing |
| scroll_depth | GA4 | Custom listener 25/50/75/90 | percent_scrolled,page_group | Partial; missing 10/100 |
| video_start/progress/complete | GA4 | Video embeds/mp4 | video_provider,video_title,video_percent | Missing |
| exception | GA4 | JS error trigger | error_message,error_url,error_line | Missing in app; recommended in GTM |
| api_failure | GA4 | failed fetch/API status | endpoint,status_code,error_type | Missing |
| purchase/add_to_cart/begin_checkout | GA4/Meta | Ecommerce flows | items,value,currency | Helpers/heuristics only; no ecommerce flow found |

## Duplicate and Broken Tracking Risks

- Meta events are fired directly in `lib/analytics.ts` and may also be routed from GTM if Meta tags are added later. Pick one owner or dedupe with `event_id`.
- `MetaPixel.tsx` fires initial `PageView`; route changes call `trackEvent('PageView')`, which pushes a Meta standard event name into dataLayer and calls `fbq`. This is acceptable for Meta but inconsistent with GA4 canonical `page_view`.
- GA4 config in GTM should keep `sendPageView=false`; the app already sends SPA `page_view`.
- `PageViewTracker.tsx` logs visits to `/api/visitor`; `VisitorTracker.tsx` does the same if mounted. Keep only one.
- Google Ads conversion constants are placeholders, so current Ads conversion pushes cannot import into Google Ads correctly.
- Consent Mode V2 is not implemented in app code; recommended GTM has a default-denied tag but no consent update integration.
- No event_id means Meta browser/CAPI dedupe cannot be trusted yet.
- No CSP policy documented for GTM, Meta, GA4, or future server container endpoints.

## Missing Tracking Report

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

## Recommended Architecture

- Code owns business events and pushes clean dataLayer events.
- GTM owns vendor routing: GA4, Google Ads, Meta, Clarity, Hotjar, LinkedIn, and future pixels.
- Server owns PII normalization, hashing, Meta CAPI, Google enhanced conversions, CRM handoff and Slack alerts.
- Event naming uses lowercase snake_case for canonical dataLayer/GA4. Meta standard event names are destination mappings, not canonical app event names.
- Every conversion event includes `event_id`, `lead_type`, `form_type`, `page_path`, `page_group`, `source attribution`, and consent state.

## Fix Roadmap

1. Freeze current GTM publish and export backup.
2. Import recommended container into a new workspace, not directly into production.
3. Add real Ads IDs and optional vendor IDs.
4. Add app-level event_id and attribution cookie helpers.
5. Add consent banner and Consent Mode update events.
6. Remove direct Meta browser firing from code if GTM becomes the Meta owner, or keep code as owner and do not add Meta GTM tags.
7. Add missing component tracking for forms, filters, search, share, chat and video.
8. QA in GTM Preview, GA4 DebugView, Meta Test Events and Tag Assistant.
9. Publish with rollback export saved.
