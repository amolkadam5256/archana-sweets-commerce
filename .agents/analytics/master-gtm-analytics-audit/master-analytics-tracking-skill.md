# Master Analytics Tracking Skill

Use this skill for GTM, GA4, Meta Pixel, Google Ads, CAPI, Consent Mode V2, lead attribution, form analytics, CTA tracking, server-side tagging and cross-project analytics architecture.

## Tracking Standards

- Track for decisions, not noise.
- Use code for business events and GTM for vendor routing.
- Use lowercase snake_case canonical events.
- Include event_id on all conversion events.
- Do not send raw PII to GA4.
- Hash PII server-side for Meta CAPI and enhanced conversions.
- Keep one owner per destination to prevent duplicates.

## Naming Conventions

- Tags: `GA4 - Event - generate_lead`, `META - Event - Lead`, `ADS - Conversion - Lead`.
- Triggers: `EV - form_submit_success`, `LNK - WhatsApp`, `SCR - 10/25/50/75/90/100`.
- Variables: `DLV - form_type`, `URL - utm_source`, `Cookie - _fbp`.

## Architecture

- Frontend analytics wrapper pushes dataLayer events.
- GTM maps canonical events to GA4, Meta, Ads and optional vendors.
- Server endpoints send deduped CAPI/enhanced conversion events.
- Consent controls all storage and ad personalization.

## Required Event Families

- Page: page_view, landing_page, first_visit.
- Lead: form_start, form_submit_success, form_submit_error, generate_lead.
- CTA: cta_click, whatsapp_click, phone_call, contact_click.
- Engagement: scroll_depth, engaged_session, time_on_page, exit_intent.
- Content: ViewContent, internal_search, search_result_click, filter_apply, share_click.
- Video: video_start, video_progress, video_pause, video_complete, video_replay.
- Errors: exception, api_failure, not_found.

## QA Workflow

1. Read code and GTM exports.
2. Inventory IDs, tags, triggers, variables and dataLayer events.
3. Identify duplicate paths and missing conversions.
4. Build event map and schemas.
5. Test in GTM Preview, GA4 DebugView and Meta Test Events.
6. Publish only after rollback export is saved.
