# Trigger Mapping Sheet

| Trigger Name | Type | Condition | Purpose |
| --- | --- | --- | --- |
| PV - All Pages | Page View | Consent init and base config | Use for base tags only |
| DOM - All Pages | DOM Ready | DOM-dependent utilities | Avoid conversion tags here |
| HIST - SPA Route Change | History Change | Next.js client navigation fallback | Use only if code page_view removed or deduped |
| EV - page_view | Custom Event | event equals page_view | Primary GA4 page_view |
| EV - form_start | Custom Event | event equals form_start | Form engagement |
| EV - form_submit_success | Custom Event | event equals form_submit_success | Lead conversion |
| EV - form_submit_error | Custom Event | event equals form_submit_error | Form quality |
| EV - cta_click | Custom Event | event equals cta_click | CTA performance |
| EV - whatsapp_click | Custom Event | event equals whatsapp_click | Primary contact conversion |
| EV - phone_call | Custom Event | event equals phone_call | Primary contact conversion |
| EV - contact_click | Custom Event | event equals contact_click | Email/calendar/contact link |
| EV - scroll_depth | Custom Event | event equals scroll_depth | Code scroll events |
| SCR - 10/25/50/75/90/100 | Scroll Depth | Vertical percent thresholds | Use if code scroll is removed to avoid duplicates |
| EV - internal_search | Custom Event | event equals internal_search | Site search |
| EV - filter_apply | Custom Event | event equals filter_apply | Filters/tabs |
| EV - share_click | Custom Event | event equals share_click | Share buttons |
| EV - chat_open | Custom Event | event equals chat_open | Chat widget |
| EV - chat_message_sent | Custom Event | event equals chat_message_sent | Chat engagement |
| EV - video_events | Custom Event regex | ^video_(start|progress|pause|complete|replay)$ | Video tracking |
| LNK - WhatsApp | Link Click | Click URL contains wa.me/api.whatsapp.com | Fallback only |
| LNK - Phone | Link Click | Click URL starts tel: | Fallback only |
| LNK - Email | Link Click | Click URL starts mailto: | Fallback only |
| ERR - JavaScript | JavaScript Error | All JS errors | Exception tracking |
| TMR - 30s Engagement | Timer | 30 seconds once per page | Engagement quality |
