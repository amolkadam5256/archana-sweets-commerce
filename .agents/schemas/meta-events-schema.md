# Meta Events Schema

| Canonical Event | Meta Event | Required Params |
| --- | --- | --- |
| `page_view` | `PageView` | `event_id`, `page_location` |
| `view_content` | `ViewContent` | `event_id`, `content_name`, `content_category` |
| `form_submit_success` | `Lead` | `event_id`, `content_name`, `form_type` |
| `contact_click` | `Contact` | `event_id`, `channel` |
| `complete_registration` | `CompleteRegistration` | `event_id`, `content_name`, `status` |
| `begin_checkout` | `InitiateCheckout` | `event_id`, `content_name` |

