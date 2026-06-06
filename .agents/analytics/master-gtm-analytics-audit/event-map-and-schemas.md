# Event Map and Schemas

## Event Naming Standard

- Canonical events: lowercase snake_case.
- Pattern: object_action, for example `form_submit_success`, `cta_click`, `video_progress`.
- Meta destination events may map to PascalCase standard names such as `Lead`, `Contact`, `ViewContent`.
- Do not put page names in event names; use parameters.

## GA4 Event Schema

| Canonical Event | GA4 Event | Required Params | Conversion |
| --- | --- | --- | --- |
| page_view | page_view | page_path,page_group,referrer_source,ai_referral | No |
| ViewContent | ViewContent | content_name,content_category,content_type | No |
| service_intent | service_intent | page_path,page_group,intent_action | No |
| cta_click | cta_click | cta_text,destination,page_group | No |
| whatsapp_click | whatsapp_click | channel,destination,cta_text | Yes |
| phone_call | phone_call | channel,destination,cta_text | Yes |
| contact_click | contact_click | channel,destination | No |
| form_start | form_start | form_type,goal | No |
| form_submit_success | generate_lead | content_name,form_type,service,goal | Yes |
| form_submit_error | form_submit_error | form_type,error_type | No |
| Lead | Lead | content_name,content_category | No |
| Contact | Contact | content_name,content_category | No |
| CompleteRegistration | CompleteRegistration | content_name,status | No |
| InitiateCheckout | InitiateCheckout | content_name,content_category,goal | No |
| Search | search | search_string | No |
| internal_search | internal_search | search_term,result_count | No |
| filter_apply | filter_apply | filter_type,filter_value,result_count | No |
| share_click | share_click | platform,content_name,destination | No |
| chat_open | chat_open | content_category | Yes |
| chat_message_sent | chat_message_sent | session_id,message_count | No |
| scroll_depth | scroll_depth | percent_scrolled,page_group | No |
| video_start/progress/complete | video_start/progress/complete | video_provider,video_title,video_percent | No |
| exception | exception | error_message,error_url,error_line | No |
| api_failure | api_failure | endpoint,status_code,error_type | No |
| purchase/add_to_cart/begin_checkout | purchase/add_to_cart/begin_checkout | items,value,currency | No |

## Meta Pixel Event Schema

| Canonical Event | Meta Event | Required Params | Dedup Required |
| --- | --- | --- | --- |
| form_submit_success | Lead | event_id,content_name,content_category,form_type | Yes |
| whatsapp_click | Contact | event_id,channel,destination,cta_text | Yes |
| phone_call | Contact | event_id,channel,destination,cta_text | Yes |
| contact_click | Contact | event_id,channel,destination | Recommended |
| page_view | PageView | event_id,page_location | Optional |
| ViewContent | ViewContent | event_id,content_name,content_category | Recommended |
| CompleteRegistration | CompleteRegistration | event_id,content_name,status | Yes |
| InitiateCheckout | InitiateCheckout | event_id,content_name,value,currency | Yes |

## DataLayer Contract

```js
window.dataLayer.push({
  event: 'form_submit_success',
  event_id: 'uuid-or-ulid',
  form_type: 'Detailed Contact Form',
  lead_type: 'contact',
  service: 'seo',
  page_path: location.pathname,
  page_group: 'contact',
  utm_source: 'google',
  gclid: '...',
  consent_ad_storage: 'granted'
});
```
