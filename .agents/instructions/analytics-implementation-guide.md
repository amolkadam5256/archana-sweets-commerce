# Analytics Implementation Guide

## GTM Setup

1. Back up the current `GTM-PBHC6WLL` container.
2. Import `.agents/analytics/recommended-gtm-container.json` into a new workspace.
3. Keep `GA4 - Config` with automatic page view disabled because the Next.js app pushes SPA `page_view`.
4. Replace Ads placeholders with real conversion ID and labels.
5. Decide Meta ownership: direct code or GTM. For enterprise setup, use GTM/browser plus server CAPI with shared `event_id`.
6. Add optional Clarity, Hotjar and LinkedIn tags only after consent rules are configured.

## GA4 Setup

- Measurement ID: `G-30C78ZK2G8`.
- Mark conversions: `generate_lead`, `whatsapp_click`, `phone_call`, `chat_open`, and optionally `contact_click`.
- Register custom dimensions: page_group, form_type, lead_type, service, goal, cta_text, channel, content_category, percent_scrolled, search_term, filter_type, filter_value, error_type.

## Meta Setup

- Pixel ID: `911738005183270`.
- Add domain verification and prioritize Lead, Contact, CompleteRegistration and ViewContent.
- Add event_id to browser events.
- Add CAPI endpoint that hashes email/phone/name server-side and sends _fbp/_fbc/client_ip/user_agent.

## Server-Side Tracking

- Extend lead endpoints to generate event_id and return it to the browser or accept a browser-generated event_id.
- Send Meta CAPI only after consent and valid lead success.
- Add Google enhanced conversions through GTM server or Google Ads API path.
- Never log raw PII to analytics debug output.

## Next.js and React Notes

- Keep analytics components mounted once in root/public layout.
- Use refs to prevent duplicate form_start on rerender.
- Clean up document/window event listeners in effects.
- Avoid both GTM History Change page_view and app `page_view` unless deduped.

## Debugging

- GTM Preview: confirm trigger and variable values.
- GA4 DebugView: confirm event names and parameters.
- Meta Test Events: confirm standard events and dedup status.
- Tag Assistant: confirm one container and no duplicate config/page_view.
