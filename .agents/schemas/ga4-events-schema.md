# GA4 Events Schema

| Event | Required Params | Conversion |
| --- | --- | --- |
| `page_view` | `page_path`, `page_group`, `page_location` | No |
| `generate_lead` | `event_id`, `form_type`, `lead_type` | Yes |
| `form_submit` | `event_id`, `form_type` | Yes |
| `contact` | `event_id`, `channel` | Yes |
| `search` | `search_term`, `result_count` | No |
| `video_progress` | `video_provider`, `video_title`, `video_percent` | No |
| `scroll` | `percent_scrolled` | No |
| `click` | `click_text`, `click_url` | No |
| `view_item` | `item_name`, `item_category` | No |
| `session_start` | automatic | No |

