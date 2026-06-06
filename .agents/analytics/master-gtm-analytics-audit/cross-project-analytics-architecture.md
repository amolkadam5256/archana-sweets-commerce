# Cross-Project Reusable Analytics Architecture

## Folder Structure

- `.agents/analytics/master-gtm-analytics-audit/`: project audit deliverables.
- `.agents/analytics/recommended-gtm-container.json`: importable/reviewable GTM export.
- `.agents/skills/master-analytics-tracking-skill.md`: reusable analytics skill.
- `.agents/instructions/analytics-implementation-guide.md`: reusable implementation guide.

## Reusable Standards

1. One analytics wrapper per frontend.
2. One canonical event name per behavior.
3. One owner per destination. If code fires Meta, GTM should not duplicate Meta events unless event_id dedupe is ready.
4. Every conversion event has event_id.
5. Every lead capture endpoint can optionally send server events.
6. Consent state is captured before vendor tags fire.
7. First-touch attribution persists in first-party cookies.
8. DataLayer never contains raw PII unless it is strictly needed for a consented enhanced conversion path and blocked from GA4.
