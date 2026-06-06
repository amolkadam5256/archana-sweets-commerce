# Duplicate Event Debugging

Common causes:

- GTM and code both firing the same vendor event.
- GA4 config auto page view plus SPA page view.
- React effects firing on rerender.
- Built-in GTM triggers duplicating app dataLayer events.

