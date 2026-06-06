# Growthik Media Site Audit and A/B Test Roadmap

Date: 2026-04-23

Skill used: `.agents/skills/ab-test-setup`

Product context:
- Business: Growthik Media, digital marketing agency in Pune, India.
- Core services: SEO, Google Ads, Meta Ads, website development, AI marketing automation.
- Primary audiences: startups, local businesses, ecommerce brands, B2B companies.
- Main conversion goal: generate leads and strategy calls.

## Executive Summary

The site has strong breadth: homepage, services hub, audit landing page, contact page, portfolio, blog, success stories and many individual service/location pages. The current SEO crawler report is healthy overall at 98/100 and lint passes.

The biggest opportunity is not basic technical SEO. It is conversion clarity and experiment discipline:

1. Choose one primary lead path per high-intent page: "Free Growth Audit" or "Book Strategy Call".
2. Add consistent event tracking for all CTA clicks, form starts, form errors, successful submissions, WhatsApp clicks, phone clicks and service-page lead intent.
3. Reduce form friction on contact/audit pages and measure completion rate.
4. Improve service-page specificity. Many service pages share a similar template and headline style, so tests should focus on intent-specific proof, offer and CTA copy.
5. Expand crawler coverage. The sitemap index includes 69 URLs across pages, services and blog, but the latest stored crawler report includes 40 pages.

## Current Health Snapshot

Observed from `audit-reports/latest.json`:
- Total crawled pages: 40
- Healthy pages: 38
- Errors: 0
- Warnings: 3
- Health score: 98
- Main warnings:
  - About page title too long.
  - About page meta description too long.
  - Contact page meta description too long.

Observed from repo:
- Public sitemap index points to:
  - `public/sitemap-pages.xml`: 14 URLs
  - `public/sitemap-services.xml`: 43 URLs
  - `public/sitemap-blog.xml`: 12 URLs
- Total sitemap URLs: 69
- Public route files under `app/(public)`: about 60 page files, plus success-story pages outside the `(public)` group.
- Lint status: passing.

## Measurement Audit

Current tracking:
- `PageViewTracker` sends GA page config when `gtag` exists.
- Meta Pixel tracks `PageView`.
- Meta Pixel tracks `ViewContent` for likely service pages.
- Meta Pixel tracks WhatsApp and phone clicks as `Contact`.
- Contact and audit forms track Meta Pixel `Lead` after successful submit.
- GTM is installed.
- Microsoft Clarity is installed.

Gaps:
- CTA clicks are not consistently tracked.
- Form start is not tracked.
- Form validation errors are not tracked.
- Audit-form goal selection is not tracked.
- Contact-form service selection and budget intent are not tracked as structured analytics events.
- There is no explicit A/B assignment event.
- There is no consistent conversion taxonomy between GA4/GTM/Meta.
- Current service-page `ViewContent` detection uses pathname string matching, which may over-match or miss edge cases.

Recommended event taxonomy:
- `cta_click`
  - params: `page_path`, `cta_text`, `cta_location`, `destination`, `service_context`
- `form_start`
  - params: `form_type`, `page_path`
- `form_submit_success`
  - params: `form_type`, `service`, `goal`, `budget`
- `form_submit_error`
  - params: `form_type`, `error_type`
- `contact_click`
  - params: `channel` as `whatsapp`, `phone`, `email`, `calendar`
- `ab_exposure`
  - params: `experiment_id`, `variant_id`, `page_path`
- `service_intent`
  - params: `service_slug`, `page_path`, `intent_action`

## Page Group Audit

### Homepage

Route:
- `/`

Strengths:
- Strong SEO positioning for "digital marketing agency in Pune".
- Many trust, proof, service, founder, roadmap, FAQ and CTA sections.
- Lead magnet section creates a lower-friction conversion path.
- Trust strip appears early.

Issues:
- The homepage has many sections before final conversion. Good for SEO and education, but may dilute the primary action.
- Primary hero CTA points to `/contact`, while multiple later sections push `/audit`. This creates split intent.
- There are many dynamically loaded sections. Good for performance, but analytics needs to prove users reach and interact with them.
- Hidden AI/GEO blocks are useful for AI visibility, but conversion tests should not rely on hidden content.

Recommended tests:
- Test A: Hero primary CTA "Book Free Strategy Call" vs "Get Free Growth Audit".
- Test B: Add an above-fold mini form or audit URL input vs CTA-only hero.
- Test C: Move proof/results closer above the fold vs current trust strip only.
- Test D: Change homepage offer from broad agency positioning to "Get a 7-point Pune growth audit in 48 hours".

Primary metric:
- Lead submission rate from homepage sessions.

Secondary metrics:
- Hero CTA click-through rate.
- Scroll depth to lead magnet.
- Audit-page continuation rate.

Guardrail:
- Bounce rate and page load performance.

### Audit Page

Route:
- `/audit/`

Strengths:
- Clear dedicated lead magnet.
- Simple page with focused intent.
- Form asks for the minimum useful audit fields: name, email, phone, website, goal.
- Strong promise: manual 50+ data-point analysis and report within 48 business hours.

Issues:
- Phone is included in state but not visible in the form fields, so the internal data model and UI are slightly misaligned.
- The promise is clear, but there is no sample audit preview, trust proof, or "what you get" checklist beside the form.
- No calendar fallback on the success state.
- No form-start tracking.

Recommended tests:
- Test A: Current form vs two-step form: first ask for website URL and goal, then contact details.
- Test B: Add "What your free audit includes" checklist beside the form.
- Test C: Success state with "Book the review call now" calendar CTA vs current thank-you message.
- Test D: "Free SEO Audit" positioning vs "Free Growth Audit" positioning.

Primary metric:
- Audit form submit rate.

Secondary metrics:
- Form-start rate.
- Form abandonment by field.
- Calendar clicks after success.

Guardrail:
- Lead quality and spam rate.

### Contact Page

Route:
- `/contact/`

Strengths:
- Full contact page includes hero, quick contact methods, contact form, consultation, FAQ, map, testimonials, social links.
- Form captures service and message, useful for lead qualification.
- Contact metadata and schema are set.

Issues:
- Contact form is relatively heavy for first contact: name, email, phone, company, service, message, bot checkbox and hidden website/budget fields in state.
- Budget and website exist in form state but are not currently collected in the visible form.
- "I confirm I am not a robot" checkbox adds friction without meaningful bot protection.
- In the code, timeout reset after success depends on stale `submitStatus` in the finally block, so the success reset may not behave as intended.
- Meta description warning exists in the latest audit report.

Recommended tests:
- Test A: Short form vs current detailed form.
- Test B: Replace bot checkbox with invisible honeypot or server-side validation.
- Test C: Add calendar CTA above form vs form-first.
- Test D: Service-specific preselection when user arrives from a service page.

Primary metric:
- Contact form submit rate.

Secondary metrics:
- Contact CTA click-through rate.
- Phone/WhatsApp/calendar click rate.
- Form abandonment.

Guardrail:
- Lead qualification quality.

### Services Hub

Route:
- `/services/`

Strengths:
- Strong hub page with hero, local proof, results, service categories, filterable grid, process, testimonials, FAQ and final CTA.
- Good role as an internal linking hub.
- Has specific service cards and CTAs.

Issues:
- The hero uses a blurred `/og-image.png` background and a process-track visual made from repeated logo images. This may feel less concrete than showing actual client outcomes, screenshots, or dashboards.
- The page has multiple competing CTA destinations: `/audit`, `/contact`, phone.
- Results are promising but not tied to named/public case studies.
- Some visible text in reports has encoding artifacts from previous content.

Recommended tests:
- Test A: CTA destination: `/audit` vs `/contact`.
- Test B: Results-first hero vs current agency-offer hero.
- Test C: "Pick your service" segmented control above the fold vs current service cards below.
- Test D: Replace generic process visual with real proof/cards: traffic, ROAS, lead quality, website speed.

Primary metric:
- Service hub lead rate.

Secondary metrics:
- Service card click-through rate.
- Audit CTA click-through rate.
- Contact CTA click-through rate.

Guardrail:
- Service page depth and organic engagement.

### Individual Service Pages

Core high-intent routes include:
- `/services/seo/`
- `/services/ppc-google-ads/`
- `/services/meta-ads/`
- `/services/performance-marketing/`
- `/services/lead-generation/`
- `/services/website-development/`
- `/services/website-development/nextjs/`
- `/services/website-development/react/`
- `/services/website-development/full-stack/`
- `/services/website-design-company-pune/`
- `/services/ecommerce-development/`
- `/services/web-application/`
- `/services/website-maintenance/`
- `/services/wordpress-development/`
- `/services/software-development/`
- `/services/mobile-app-development/`
- `/services/real-estate-website-development/`
- `/services/educational-website-development/`
- `/services/local-seo/`
- `/services/social-media-marketing/`
- `/services/social-media-promotions/`
- `/services/content-marketing/`
- `/services/email-marketing/`
- `/services/whatsapp-marketing/`
- `/services/sms-marketing/`
- `/services/youtube-seo/`
- `/services/influencer-management/`
- `/services/media-planning-buying/`
- `/services/political-digital-marketing/`
- Branding and creative pages: brand identity, brand strategy, brand name, logo design, branding design, branding consulting, brochure, business card, letterhead, video production.

Strengths:
- Many pages have dedicated metadata, canonical URLs, schema, service-specific features and CTAs.
- Service pages provide broad SEO coverage.
- Some pages have deep content and strong word count.

Issues:
- Several pages use repeated template language like "Top Agency For..." and "Generic solutions don't work." This can feel programmatic and lower perceived specificity.
- Some pages have only one above-fold CTA, usually `/contact`, missing a lower-friction audit path.
- Some service pages have high word count but limited named proof, screenshots, client examples, pricing anchors, or process details specific to that service.
- The latest report shows some service H1s are generic or mismatched, e.g. web application and maintenance reporting "Best Website Design Pune".
- FAQ/schema content contains encoding artifacts in some pages, especially rupee symbols and dashes in source.

Recommended tests:
- Test A: Service-specific CTA copy:
  - SEO: "Get My SEO Audit"
  - PPC: "Audit My Ad Spend"
  - Website: "Review My Website"
  - Branding: "Get Brand Clarity Review"
- Test B: Add proof module above fold: result metric, time frame, client type.
- Test C: Add pricing anchor/range vs no pricing.
- Test D: Add sticky mobile CTA bar on service pages.
- Test E: Shorter first section with comparison/proof vs long generic hero.

Primary metric:
- Lead conversion rate by service page.

Secondary metrics:
- CTA click-through rate by service.
- Scroll depth to proof/FAQ.
- Related-service click-through rate.

Guardrail:
- Organic traffic and ranking page engagement.

### Portfolio and Case Study Pages

Routes:
- `/portfolio/`
- `/portfolio/[slug]/`
- `/portfolio/website-projects/`
- `/portfolio/branding-work/`
- `/portfolio/social-media-creatives/`
- `/portfolio/case-studies/`
- `/portfolio/ads-performance/`
- `/portfolio/digital-campaigns/`

Strengths:
- Portfolio page has useful stats, filterable grid and project cards.
- Proof is a strong conversion lever for an agency.
- Category pages can map to service intent.

Issues:
- Some portfolio category pages have minimal metadata and no canonical defined.
- CTA often points to `/contact`, but the offer could be more contextual.
- "Real Results" is stated, but conversion would improve if result cards had more concrete before/after, baseline, timeframe and industry.

Recommended tests:
- Test A: Add "Get a similar result" CTA on project/category pages.
- Test B: Case study cards with metric-first layout vs visual-first layout.
- Test C: Industry filter default based on referrer/service.
- Test D: Add mini lead form after 2-3 portfolio items.

Primary metric:
- Portfolio-to-lead conversion rate.

Secondary metrics:
- Project card click-through rate.
- Filter interaction rate.
- Service-page return clicks.

Guardrail:
- Time on page and project detail views.

### Blog and Resource Pages

Routes:
- `/blog/`
- `/blog/[slug]/`
- `/backlink-strategy/`

Strengths:
- Blog has search, filters, featured post, sidebar and many SEO-focused topics.
- Blog metadata and schema are present.
- Good educational route for organic visitors.

Issues:
- Blog hero and comments include visible encoding artifacts in source.
- Blog conversion path is softer. It needs stronger newsletter/audit/service CTAs by topic.
- Blog page is marked `force-dynamic`, which may affect caching/performance.
- The blog listing uses decorative gradient/orb-like background elements. From a conversion perspective, proof and topics matter more.

Recommended tests:
- Test A: Topic-specific CTA under hero: SEO blog -> SEO audit; Ads blog -> Ads audit.
- Test B: Inline content upgrade vs sidebar newsletter.
- Test C: Sticky article CTA after 35 percent scroll.
- Test D: Related service card at article end vs related posts only.

Primary metric:
- Assisted lead conversion from blog sessions.

Secondary metrics:
- Newsletter signup rate.
- Service page click-through rate.
- Audit page click-through rate.

Guardrail:
- Article engagement and organic traffic.

### About Page

Route:
- `/about/`

Strengths:
- Founder, process, philosophy, team and final CTA are useful for trust.
- Good fit for mid-funnel visitors validating credibility.

Issues:
- Latest audit warns title and meta description are too long.
- About page should support trust and qualification, but should still provide direct lead paths.
- Some sections may be visually rich but need clearer "why this matters to my business" framing.

Recommended tests:
- Test A: Founder-proof block above framework vs current ordering.
- Test B: "Meet the strategist" calendar CTA vs generic contact CTA.
- Test C: Add trust proof strip immediately below hero.

Primary metric:
- About-to-contact/audit conversion rate.

Secondary metrics:
- Founder LinkedIn click rate.
- Final CTA click rate.

Guardrail:
- Scroll depth.

### Success Stories

Routes:
- `/success-stories/`
- `/success-stories/testimonials/`
- `/success-stories/awards/`
- `/success-stories/media/`

Strengths:
- Navigation includes success stories under Portfolio.
- These pages can strengthen agency credibility.

Issues:
- They are outside `app/(public)` while the main public layout covers `(public)`. Confirm they get the intended header/footer/schema/tracking.
- Sitemap currently lists `/awards/`, `/media/` and `/testimonials/`, but route files are under `/success-stories/...`. This looks like a sitemap/route mismatch.
- The latest crawler report did not include these pages.

Recommended tests:
- Test A: Add success-story proof cards into homepage/services above final CTA.
- Test B: CTA on testimonial page: "Get a similar roadmap" vs "Contact".
- Test C: Segment testimonials by service.

Primary metric:
- Success-story-to-lead conversion rate.

Guardrail:
- Noindex/canonical correctness.

### Legal and Utility Pages

Routes:
- `/privacy-policy/`
- `/terms/`
- `404` page

Strengths:
- Legal pages exist.
- Custom 404 has brand personality and recovery links.

Issues:
- The custom 404 defines its own `<html>` and `<body>` in `app/not-found.tsx`. In Next app router, this can be risky because not-found pages usually render inside the existing root layout.
- 404 imports global CSS directly, which may duplicate styling concerns.
- 404 should include strongest recovery CTAs: Home, services, audit, contact.

Recommended tests:
- Not an A/B priority unless 404 traffic is high.
- Track 404 page views and clicked recovery path.

## Priority A/B Test Backlog

### Test 1: Homepage Primary CTA

Hypothesis:
Because homepage visitors are mixed-intent and many are not ready for a call, we believe changing the primary CTA from a call-oriented action to a free audit offer will increase lead submissions for new visitors. We will know this is true when homepage visitor-to-lead rate improves without reducing qualified lead rate.

Variant A:
- Current hero CTA to `/contact`.

Variant B:
- Primary hero CTA: "Get Free Growth Audit" to `/audit`.
- Secondary CTA: "View Client Results" to `/portfolio`.

Primary metric:
- Homepage sessions to lead submit.

Secondary:
- Hero CTA CTR.
- Audit page form completion.

Guardrail:
- Lead quality and bounce rate.

### Test 2: Audit Page Two-Step Form

Hypothesis:
Because asking for website and goal first creates momentum before personal information, we believe a two-step audit form will increase audit-form completion rate for new visitors. We will know this is true when audit submit rate rises while spam/low-quality leads do not increase.

Variant A:
- Current single-step form.

Variant B:
- Step 1: website URL and growth goal.
- Step 2: name, email, phone.

Primary metric:
- Audit form submit rate.

Secondary:
- Form start rate.
- Step 1 to step 2 continuation.

Guardrail:
- Invalid website submissions.

### Test 3: Service-Specific CTA Copy

Hypothesis:
Because service-page visitors arrive with a specific problem, we believe CTA copy matching the service intent will increase CTA clicks and leads compared with generic strategy-call copy. We will know this is true when service-page CTA CTR and lead rate improve.

Variant A:
- "Book Your Free Strategy Call"

Variant B:
- Dynamic CTA examples:
  - SEO: "Get My SEO Audit"
  - PPC: "Audit My Ad Spend"
  - Website: "Review My Website"
  - Branding: "Review My Brand"

Primary metric:
- Service page CTA CTR.

Secondary:
- Lead submit rate.
- Contact/audit destination split.

Guardrail:
- No drop in qualified leads.

### Test 4: Contact Form Friction

Hypothesis:
Because the contact form asks for several fields plus a bot checkbox, we believe a shorter form will improve completed inquiries. We will know this is true when contact form submit rate increases and inquiry quality remains acceptable.

Variant A:
- Current detailed form.

Variant B:
- Required: name, email/phone, service.
- Optional: message.
- Remove visible bot checkbox; use honeypot/server validation.

Primary metric:
- Contact form submit rate.

Secondary:
- Form start-to-submit rate.
- Field error rate.

Guardrail:
- Spam and low-quality inquiries.

### Test 5: Portfolio Proof CTA

Hypothesis:
Because portfolio visitors are evaluating proof, we believe a metric-led CTA such as "Get a similar growth plan" will outperform a generic project CTA. We will know this is true when portfolio-to-contact/audit CTR improves.

Variant A:
- Current "Start Your Project".

Variant B:
- "Get a Similar Growth Plan" with service/category context.

Primary metric:
- Portfolio CTA CTR.

Secondary:
- Lead submit rate.

Guardrail:
- Project detail views.

## Sample Size Guidance

Use the A/B test setup skill's quick reference:
- If baseline conversion is 1 percent, a 20 percent lift needs about 39k visitors per variant.
- If baseline conversion is 3 percent, a 20 percent lift needs about 12k visitors per variant.
- If baseline conversion is 5 percent, a 20 percent lift needs about 7k visitors per variant.

Practical recommendation:
- For lower-traffic pages, avoid tiny copy/color tests.
- Test bolder offer/form changes that can create 20-50 percent lift.
- Run high-traffic tests on homepage, services hub, audit page, contact page, SEO/PPC/website pages first.
- For lower-traffic service pages, group pages into the same experiment by template type.

## Implementation Plan

Phase 1: Measurement foundation
- Add a shared analytics helper.
- Track CTA clicks with `cta_location` and `destination`.
- Track form start, success and error.
- Track A/B exposure.
- Confirm GA4 conversion events in GTM.

Phase 2: Fix trust-breaking basics
- Fix metadata warnings on about/contact.
- Fix visible/source encoding artifacts.
- Fix sitemap route mismatches for success-story pages.
- Align crawler coverage with all sitemap URLs.
- Review repeated/mismatched H1s on service templates.

Phase 3: Launch first tests
- Homepage CTA destination test.
- Audit two-step form test.
- Service-specific CTA copy test across grouped service pages.

Phase 4: Expand proof and segmentation
- Add service-specific proof blocks.
- Add portfolio/case-study CTA variants.
- Add topic-specific blog CTAs.

## Highest-Impact Fixes Before Testing

1. Add CTA and form analytics. Without this, test results will be weak.
2. Decide whether `/audit` or `/contact` is the primary conversion for each page type.
3. Fix sitemap mismatch for success-story pages.
4. Tighten about/contact metadata.
5. Remove or replace visible encoding artifacts.
6. Standardize service-page H1s and CTAs.
7. Add service-specific proof above the fold on SEO, PPC, website development, performance marketing and lead generation pages.

