# GTM & Analytics QA Protocol

Follow these steps to verify any new tracking implementation:

1. **Enter GTM Preview Mode** and connect to the site.
2. **Standard Events:**
   - [ ] Page View: Check if `config` triggers correctly with `page_location`.
   - [ ] Scroll Depth: Verify 25%, 50%, 75%, 90% fire at the right points.
3. **Conversion Events:**
   - [ ] WhatsApp/Calls: Click the icons and verify the `event` matches `whatsapp_click` / `phone_call`.
   - [ ] Form Submission: Submit a test lead and verify `form_submit_success` fires with the correct `form_type`.
4. **DataLayer Validation:**
   - In Console, run `window.dataLayer` to ensure no PII is leaking.
5. **Real-time Verification:**
   - Check **GA4 DebugView** for the incoming activity.
   - Check **Meta Events Manager** for Pixel reception.
