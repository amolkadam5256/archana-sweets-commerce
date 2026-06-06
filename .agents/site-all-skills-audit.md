# Growthik Media Master Skills Audit

Date: 2026-04-23

Scope:
- Full public site audit through the `.agents/skills` lens
- No UI redesign recommendations
- Focus only on non-UI improvements: content, SEO, AI SEO, schema, analytics, CRO logic, funnel clarity, forms, page architecture, launch/readiness, paid-media alignment and sales enablement

Site surface reviewed:
- 65 public `page.tsx` routes under `app/(public)`
- 4 success-story pages under `app/success-stories`
- Existing audit files:
  - `.agents/site-ab-test-audit.md`
  - `.agents/site-ai-seo-audit.md`

Product context:
- Growthik Media, Pune-based digital marketing agency
- Services: SEO, Google Ads, Meta Ads, website development, AI marketing automation
- Target audiences: startups, local businesses, ecommerce brands, B2B companies
- Primary business goal: generate leads and strategy calls

## Executive Summary

This site is already strong in breadth: homepage, service cluster, local/programmatic SEO routes, blog, portfolio, success stories, audit funnel and contact funnel. The biggest improvements are not visual. They are operational and strategic:

1. Standardize entity facts, schema and machine-readable assets.
2. Strengthen measurement and funnel tracking across all lead paths.
3. Improve extractable content quality on service, blog and location pages.
4. Make page intent more explicit by page type.
5. Build stronger proof systems: case studies, benchmarks, comparison pages, deliverable tables and methodology notes.
6. Expand audits beyond traditional SEO into AI visibility, CRO, paid-media readiness, sales readiness and revops.

## Skill-by-Skill Audit

Below is the most relevant interpretation of each `.agents` skill for this site.

### 1. `product-marketing-context`

Status:
- Already present in `.agents/product-marketing-context.md`

What to do:
- Keep this updated whenever positioning changes.
- Add:
  - primary packages/offers
  - strongest proof points
  - target industries by service
  - which service is best for which ICP
  - lead qualification criteria

Why it matters:
- Every other marketing skill becomes sharper when this is current.

Priority:
- High foundation

### 2. `seo-audit`

Applies to:
- Entire site

Current state:
- Existing crawler report is strong overall, but latest stored crawl covers 40 URLs while sitemap exposes 69 URLs.

What to audit/fix:
- Metadata length and consistency
- H1 cleanliness and extraction
- sitemap coverage vs actual routes
- internal linking depth
- canonical consistency
- crawlability of dynamic and local routes
- broken encoding in visible/indexable text
- thin or placeholder content

Top pages:
- `/`
- `/services/`
- `/services/seo/`
- `/services/ppc-google-ads/`
- `/services/website-development/`
- `/services/website-design-company-pune/`
- `/blog/`
- `/blog/[slug]`
- `/portfolio/`

Priority:
- Very high

### 3. `ai-seo`

Applies to:
- Entire site, especially homepage, services, local pages, blog, portfolio

Current state:
- Good foundation with `llms.txt`, AI crawler access, blog schema, service schema and AI-oriented content blocks.

What to audit/fix:
- entity consistency across schema and machine files
- AI-citable visible answer blocks
- direct-answer intros on service pages
- source-backed stats and methodology
- original-data pages
- comparison content
- case-study result tables
- visible "last updated" signals

Priority:
- Very high

### 4. `schema-markup`

Applies to:
- Homepage
- Services hub
- Individual service pages
- Blog listing/detail
- Portfolio and case studies
- About, contact, audit
- Local/location pages

Current state:
- Lots of schema coverage, but duplicated and inconsistent in IDs/hours/coords.

What to do:
- Pick one canonical Organization ID
- Pick one canonical LocalBusiness ID
- Ensure all Service providers reference the same source
- Align `Organization`, `LocalBusiness`, `ProfessionalService` and `ai-audit.json`
- Add `ItemList` where useful:
  - service directory
  - portfolio categories
  - case study collections
- Add stronger case-study/article schema to portfolio detail pages

Priority:
- Very high

### 5. `site-architecture`

Applies to:
- Entire site

What to audit/fix:
- page-group hierarchy
- service clustering
- blog-to-service linking
- portfolio-to-service linking
- success-stories route placement and sitemap consistency
- local pages vs service pages vs blog overlap
- which pages should rank, convert, support, or validate

Recommended architecture roles:
- Homepage: brand + broad discovery + trust
- Services hub: category navigation + broad commercial intent
- Service pages: specific commercial intent
- Local pages: local-intent capture
- Blog: education + AI citations + assisted conversion
- Portfolio/case studies: proof
- About: trust/authority validation
- Contact/audit: conversion endpoints

Priority:
- High

### 6. `analytics-tracking`

Applies to:
- Entire site

Current state:
- Tracking now includes page views, service intent, CTA clicks, contact clicks, form starts, lead submits and errors.

What still needs audit/fix:
- GA4 event naming plan
- GTM event forwarding
- conversion definitions
- source/medium/channel reporting
- form field abandonment
- page-group segmentation
- audit vs contact lead path attribution
- AI referral traffic segmentation
- portfolio/blog assist reporting

Recommended measurement plan:
- `cta_click`
- `contact_click`
- `service_intent`
- `form_start`
- `form_submit_success`
- `form_submit_error`
- `ab_exposure`

Priority:
- Very high

### 7. `page-cro`

Applies to:
- Homepage
- Services hub
- About
- Audit
- Contact
- Portfolio
- Blog landing pages

What to audit:
- value proposition clarity
- trust signal order
- CTA hierarchy
- page-specific friction
- proof visibility
- relevance of secondary paths
- internal conversion support blocks

Priority pages:
- `/`
- `/services/`
- `/contact/`
- `/audit/`
- `/portfolio/`

Priority:
- Very high

### 8. `ab-test-setup`

Applies to:
- Homepage
- Audit page
- Contact page
- Services hub
- Top individual service pages
- Portfolio CTA modules

Existing output:
- Already documented in `.agents/site-ab-test-audit.md`

What to do next:
- convert hypotheses into experiment backlog
- calculate sample size by page
- group lower-traffic service pages into template-based tests

Priority:
- High after measurement foundation

### 9. `form-cro`

Applies to:
- `/contact/`
- `/audit/`
- newsletter forms
- quick contact forms

What to audit/fix:
- contact form field count
- audit form friction
- hidden vs visible state mismatches
- success-state actions
- spam control without UX friction
- drop-off by field

Specific non-UI opportunities:
- simplify field logic
- better event tracking
- optional vs required field audit
- improve server-side handling and feedback states

Priority:
- Very high

### 10. `popup-cro`

Applies to:
- `ProgressiveLeadCapture`
- floating or triggered lead mechanisms

What to audit:
- whether popup timing is correct
- whether audit offer should trigger after scroll/exit intent
- frequency capping
- lead quality impact
- duplication with floating WhatsApp/chat

Priority:
- Medium-high

### 11. `copywriting`

Applies to:
- Homepage
- Services hub
- Service pages
- Audit page
- Contact page
- About page
- Portfolio category pages

What to audit:
- headline specificity
- service differentiation
- offer framing
- deliverable clarity
- CTA specificity
- "best for / not for" positioning

Strongest targets:
- repeated templated service intros
- generic "Top Agency For..." patterns
- broad agency claims without grounded proof

Priority:
- High

### 12. `copy-editing`

Applies to:
- Entire public site

What to audit:
- broken encoding
- grammar inconsistencies
- repetitive phrasing
- too-long metadata
- overclaimed proof language
- extraction quality for AI and snippets

Priority:
- High and fast to execute

### 13. `content-strategy`

Applies to:
- Blog
- comparison pages
- local pages
- benchmarks/resources
- case studies

What to build:
- comparison articles
- pricing guides
- benchmark studies
- local service explainers
- industry playbooks
- audit/checklist content
- "best agency / how to choose" content

Priority:
- Very high

### 14. `programmatic-seo`

Applies to:
- local pages
- service + location combinations
- competitor/alternative pages
- industry-specific service pages

Current opportunity:
- existing local/location page model is a good base

What to audit:
- uniqueness of local pages
- template quality
- supporting internal links
- avoiding duplicate intent collisions

Priority:
- High

### 15. `competitor-alternatives`

Applies to:
- New pages to create

Best opportunities:
- `growthik-media-vs-[competitor]`
- `[competitor]-alternative-in-pune`
- `best-digital-marketing-agencies-in-pune`
- `best-seo-companies-in-pune`
- `best-website-design-companies-in-pune`

Why:
- High AI citation potential
- strong commercial/comparison intent
- sales-enablement overlap

Priority:
- High

### 16. `paid-ads`

Applies to:
- Paid landing-page readiness
- ad alignment on:
  - `/services/ppc-google-ads/`
  - `/services/meta-ads/`
  - `/services/lead-generation/`
  - `/services/performance-marketing/`
  - `/audit/`
  - `/contact/`

What to audit:
- message match between ad groups and pages
- conversion paths
- trust blocks for paid clicks
- landing-page offer clarity
- remarketing page structure

Priority:
- High if traffic is running

### 17. `ad-creative`

Applies to:
- not directly to the site structure
- indirectly to paid traffic that lands on service/audit/contact pages

What to do:
- ensure landing pages support multiple ad angles:
  - ROI
  - local expertise
  - technical SEO
  - ads management
  - website speed/performance

Priority:
- Medium

### 18. `pricing-strategy`

Applies to:
- Service pages
- Audit offer
- contact and qualification flow

Current site gap:
- pricing transparency is limited

What to audit:
- should Growthik show price ranges?
- should there be "starting from" anchors?
- should there be budget qualification logic in the contact flow?

Priority:
- Medium-high

### 19. `sales-enablement`

Applies to:
- About
- Portfolio
- Success stories
- case studies
- competitor pages
- proposal/contact workflow

What to audit:
- proof packaging
- objection handling
- trust signal consistency
- client-story structure
- downloadable or shareable sales collateral pages

Priority:
- High

### 20. `revops`

Applies to:
- Contact form
- Audit form
- lead routing
- attribution
- CRM/admin structure

What to audit:
- lead source capture
- form type segmentation
- service intent capture
- channel-to-lead mapping
- admin export/reporting
- lifecycle stage naming

Priority:
- High

### 21. `email-sequence`

Applies to:
- audit leads
- contact leads
- newsletter signups

What to audit:
- what happens after an audit request
- what happens after a contact request
- whether there is a nurture sequence
- whether blog/newsletter leads are monetized

Priority:
- Medium-high

### 22. `cold-email`

Applies to:
- not a direct site audit skill
- can support outbound using site proof/case studies

Priority:
- Low for site-only audit

### 23. `social-content`

Applies to:
- blog repurposing
- portfolio repurposing
- thought leadership from founder/about/content

What to audit:
- whether blog and case-study content are structured for repurposing

Priority:
- Medium

### 24. `marketing-ideas`

Applies to:
- top-level growth roadmap after the audit

What to use it for:
- turning all audits into a 90-day growth roadmap

Priority:
- Medium-high

### 25. `marketing-psychology`

Applies to:
- homepage
- services
- contact
- audit
- proof pages

What to audit:
- credibility
- specificity
- risk reduction
- fit signaling
- authority
- loss aversion vs confidence framing

Priority:
- High for messaging refinement

### 26. `free-tool-strategy`

Applies to:
- audit-related tools
- SEO grader
- landing page grader
- website speed checker
- ad account checklist generator

What to audit:
- strong fit with existing `/audit/` positioning
- could become an engineering-as-marketing asset

Priority:
- High strategic opportunity

### 27. `launch-strategy`

Applies to:
- future launch of:
  - free audit tool
  - new benchmark report
  - new local SEO pages
  - case study hub

Priority:
- Medium

### 28. `referral-program`

Applies to:
- not primary site audit surface
- could fit testimonials/success stories later

Priority:
- Low for current audit

### 29. `signup-flow-cro`

Applies to:
- not directly, unless newsletter/signup or gated tool flow becomes a product signup

Priority:
- Low currently

### 30. `onboarding-cro`

Applies to:
- only if the site gains a product/tool onboarding flow

Priority:
- Low currently

### 31. `paywall-upgrade-cro`

Applies to:
- not applicable to current public agency site

Priority:
- Not applicable now

### 32. `churn-prevention`

Applies to:
- not applicable to the current marketing site surface

Priority:
- Not applicable now

### 33. `find-skills`

Applies to:
- meta-skill only

Priority:
- Not part of site audit

## Page-by-Page Audit Map

### Homepage `/`

Relevant skills:
- `page-cro`
- `copywriting`
- `copy-editing`
- `analytics-tracking`
- `ab-test-setup`
- `ai-seo`
- `schema-markup`
- `marketing-psychology`

Audit focus:
- direct answer block
- primary CTA consistency
- proof ordering
- AI extractability
- service summary structure
- event coverage

### About `/about/`

Relevant skills:
- `copy-editing`
- `copywriting`
- `schema-markup`
- `ai-seo`
- `sales-enablement`
- `marketing-psychology`

Audit focus:
- founder authority
- organization entity clarity
- proof and timeline trust
- about-to-contact conversion support

### Audit `/audit/`

Relevant skills:
- `form-cro`
- `page-cro`
- `analytics-tracking`
- `ab-test-setup`
- `pricing-strategy`
- `free-tool-strategy`
- `copywriting`
- `ai-seo`

Audit focus:
- form friction
- audit-offer clarity
- success-state routing
- measurable conversion
- possible future free-tool surface

### Contact `/contact/`

Relevant skills:
- `form-cro`
- `analytics-tracking`
- `page-cro`
- `copy-editing`
- `copywriting`
- `sales-enablement`
- `revops`

Audit focus:
- form friction
- service qualification
- attribution
- contact-method hierarchy

### Services Hub `/services/`

Relevant skills:
- `site-architecture`
- `page-cro`
- `copywriting`
- `analytics-tracking`
- `ai-seo`
- `schema-markup`
- `programmatic-seo`

Audit focus:
- category clarity
- service catalog extractability
- CTA destination consistency
- internal linking logic

### Individual Service Pages `/services/...`

Relevant skills:
- `seo-audit`
- `ai-seo`
- `schema-markup`
- `copywriting`
- `copy-editing`
- `page-cro`
- `ab-test-setup`
- `pricing-strategy`
- `paid-ads`
- `analytics-tracking`

Audit focus:
- direct first-paragraph definition
- deliverables table
- proof block
- pricing/timeline clarity
- FAQ alignment
- schema/provider consistency

### Portfolio `/portfolio` and categories

Relevant skills:
- `sales-enablement`
- `page-cro`
- `copywriting`
- `schema-markup`
- `ai-seo`
- `analytics-tracking`

Audit focus:
- structured result proof
- canonical completeness
- case-study readiness
- conversion assist role

### Portfolio Detail `/portfolio/[slug]`

Relevant skills:
- `sales-enablement`
- `schema-markup`
- `ai-seo`
- `copy-editing`

Audit focus:
- result specificity
- outcome tables
- service mapping
- internal links back to services/contact/audit

### Blog `/blog` and `/blog/[slug]`

Relevant skills:
- `content-strategy`
- `copywriting`
- `copy-editing`
- `ai-seo`
- `seo-audit`
- `schema-markup`
- `analytics-tracking`
- `email-sequence`
- `social-content`

Audit focus:
- complete article coverage
- update freshness
- citations and data
- blog-to-service monetization
- newsletter path

### Backlink Strategy `/backlink-strategy`

Relevant skills:
- `ai-seo`
- `seo-audit`
- `content-strategy`
- `copywriting`
- `schema-markup`

Audit focus:
- whether this is a lead asset, authority asset, or both
- if it should become part of a larger SEO resource cluster

### Success Stories `/success-stories/*`

Relevant skills:
- `sales-enablement`
- `page-cro`
- `copywriting`
- `schema-markup`
- `ai-seo`
- `site-architecture`

Audit focus:
- route/sitemap consistency
- trust role in funnel
- proof packaging

### Legal `/privacy-policy`, `/terms`, `404`

Relevant skills:
- `seo-audit`
- `site-architecture`
- `schema-markup` lightly

Audit focus:
- consistency of business facts
- noindex/canonical sanity
- not a conversion priority

## Skills Not Really Applicable Right Now

These skills do not materially apply to the current site unless the business model changes:

- `paywall-upgrade-cro`
- `churn-prevention`
- `signup-flow-cro`
- `onboarding-cro`

These are only indirectly relevant:

- `cold-email`
- `referral-program`
- `launch-strategy`

## Highest-Priority Non-UI Fixes

### Tier 1: Foundation

1. Normalize schema IDs, entity facts, hours, coordinates and machine-readable files.
2. Expand measurement so every lead path is attributable.
3. Fix content encoding issues across AI-facing and SEO-facing files.
4. Reconcile sitemap, route coverage and crawler coverage.

### Tier 2: Revenue Pages

5. Tighten homepage, audit, contact and services hub copy and CRO logic.
6. Standardize service-page template quality:
   - definition
   - proof
   - deliverables
   - FAQs
   - CTA specificity
7. Build strong case-study/result structure for portfolio and success stories.

### Tier 3: Authority Growth

8. Complete or noindex thin/placeholder blog articles.
9. Build comparison pages, pricing guides and benchmark content.
10. Build a free audit or grader tool strategy around current audit positioning.

## Suggested Audit Execution Order

If you want to audit this repo one skill at a time without touching the UI, this is the clean order:

1. `product-marketing-context`
2. `site-architecture`
3. `seo-audit`
4. `ai-seo`
5. `schema-markup`
6. `analytics-tracking`
7. `page-cro`
8. `form-cro`
9. `copy-editing`
10. `copywriting`
11. `ab-test-setup`
12. `sales-enablement`
13. `content-strategy`
14. `programmatic-seo`
15. `competitor-alternatives`
16. `paid-ads`
17. `pricing-strategy`
18. `email-sequence`
19. `revops`
20. `free-tool-strategy`
21. `marketing-psychology`
22. `social-content`
23. `marketing-ideas`

## Best Next Step

The best practical next move is to turn this master audit into a non-UI implementation backlog with file-by-file tasks, grouped by:
- machine-readable fixes
- analytics/tracking
- metadata/schema
- service-page content improvements
- blog/article completion
- case-study proof structure

