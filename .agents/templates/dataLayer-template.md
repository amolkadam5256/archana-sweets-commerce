# DataLayer Template

```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "form_submit_success",
  event_id: "uuid-or-ulid",
  form_type: "Detailed Contact Form",
  lead_type: "contact",
  page_path: location.pathname,
  page_group: "contact"
});
```

