# Recommended GTM Structure

## Tags

- CONSENT - Default Denied
- GA4 - Config, with send_page_view disabled
- GA4 - Event tags for page_view, generate_lead, cta_click, contact_click, WhatsApp, phone, scroll, search, filters, share, chat, video, exception and API failure
- META - Base Pixel if GTM owns Meta
- META - Lead, Contact, ViewContent, CompleteRegistration and InitiateCheckout if direct code firing is removed or deduped
- ADS - Conversion - Lead, WhatsApp, Phone and Contact after real labels are added
- UTIL - Attribution Cookie Writer
- CLARITY - Base, HOTJAR - Base, LINKEDIN - Insight as optional tags after consent

## Triggers

Use custom event triggers from the app as the primary source. Built-in click, scroll, form and history triggers should be fallbacks or QA helpers to avoid double firing.

## Variables

Enable page, click, form, scroll, video and error built-ins. Add all dataLayer variables listed in the variable map plus URL variables for UTMs/click IDs and cookie variables for first-touch attribution.

## Consent

Fire default denied on Consent Initialization. Fire consent update only after user choice. Ads, Meta, LinkedIn, Hotjar and Clarity must require relevant consent.
