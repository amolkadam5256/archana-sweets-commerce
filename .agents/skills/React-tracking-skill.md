# React Tracking Skill

Use for React event tracking and lifecycle-safe analytics.

Rules:

- Use refs to prevent duplicate `form_start`.
- Clean up listeners in effects.
- Avoid firing conversions during render.
- Track after confirmed success, not before API success.

