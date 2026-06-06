# Growthik Media AI SEO / AEO / GEO Audit

Date: 2026-04-23

Skill used: `.agents/skills/ai-seo`

Product context:
- Business: Growthik Media, digital marketing agency in Pune, India.
- Core services: SEO, Google Ads, Meta Ads, website development, AI marketing automation.
- Audiences: startups, local businesses, ecommerce brands, B2B companies.
- Business goal: generate leads and strategy calls.

## Executive Summary

Growthik Media is already ahead of many local agency sites for AI SEO. The site has:
- `llms.txt`
- AI bot allowances in `robots.txt`
- FAQ, BlogPosting, LocalBusiness, Organization, Service and ContactPage schema
- AI-focused summary components
- Strong service-page coverage
- Blog content with authors, dates and article schema
- Local Pune entity coverage

The biggest AI SEO opportunity is not "add AI keywords." It is making the site more reliable, extractable and citable:

1. Normalize entity facts across `CONTACT_INFO`, `llms.txt`, `ai-audit.json`, LocalBusiness schema, SEO schema and page schema.
2. Remove broken encoded characters from AI-facing files and content.
3. Replace hidden AI-only content with visible, human-useful extractable answer blocks where possible.
4. Add source-backed stats, methodology and named proof so AI systems can cite claims confidently.
5. Build comparison, best-of and original-data pages because those formats get cited heavily in AI answers.
6. Expand crawler and monitoring coverage from traditional SEO to AI visibility queries.

## Current AI SEO Assets

### AI Crawler Access

`public/robots.txt` explicitly allows:
- `ChatGPT-User`
- `OAI-SearchBot`
- `Google-Extended`
- `PerplexityBot`
- `ClaudeBot`
- `anthropic-ai`
- `Applebot-Extended`

It also exposes:
- `Sitemap: https://www.growthikmedia.com/sitemap.xml`
- `Llms-txt: https://www.growthikmedia.com/llms.txt`

Verdict: good foundation.

Risk:
- `Disallow: /*?` blocks query-string URLs for all general crawlers. That is usually fine for duplicate-control, but ensure important filtered blog/service states do not rely on query URLs.

### LLM Reference File

File:
- `public/llms.txt`

Strengths:
- Gives a clear business summary.
- Includes services, areas served, team, process, proof, blog hub and AI usage policy.
- Good source-of-truth intent for AI systems.

Issues:
- Contains mojibake/broken characters such as broken dashes, rupee symbols and apostrophes.
- Contains several strong claims that need visible/public supporting evidence:
  - sub-1.5s load speeds
  - 98 percent satisfaction rating
  - 12Cr+ revenue generated
  - Google Certified & Meta Partner
  - 50+ growth projects
- Includes many social profiles. If some are not active or real, they weaken trust.
- Says `llms.txt` is "official source of truth," but some facts conflict with other files.

Priority:
- High. AI systems may read this directly. Broken characters and inconsistent facts can pollute generated summaries.

### AI Audit JSON

File:
- `public/ai-audit.json`

Strengths:
- Machine-readable Organization data.
- Includes services.

Issues:
- Phone number is `+91-8830174092`, while `CONTACT_INFO` and most site content use `+91 80557 54054`.
- SameAs only includes LinkedIn and Twitter, while other schema includes many more social URLs.
- Description is grammatically weak: "Agency in Pune focus on..."
- Service coverage is too thin: only SEO and Next.js Development.

Priority:
- High. This file should either be removed if unused or normalized as a clean machine-readable entity file.

### Schema Coverage

Observed schema types:
- Organization
- LocalBusiness
- MarketingAgency
- ProfessionalService
- WebSite
- Service
- OfferCatalog
- FAQPage
- BlogPosting
- ContactPage
- AboutPage
- Person
- BreadcrumbList
- AggregateRating

Strengths:
- Strong breadth.
- Blog detail pages include `BlogPosting`, author, date published, date modified, publisher, keywords, word count and main entity.
- Service pages include Service schema and ratings.
- Global layout includes LocalBusiness schema.

Issues:
- Schema is duplicated in several places:
  - `components/PublicComponents/structured-data/LocalBusinessSchema.tsx`
  - `components/PublicComponents/comman/SEO.tsx`
  - page-level schemas
  - `public/ai-audit.json`
- Entity IDs are inconsistent:
  - Some service schema references `${CONTACT_INFO.website}/#localbusiness`
  - LocalBusinessSchema defines `${CONTACT_INFO.website}/#agency`
  - SEO global schema uses `@id: CONTACT_INFO.website`
- Coordinates and opening hours differ across schemas.
- Several pages use `AggregateRating` with `4.9` and `138 reviews`; this should be supported by real review evidence and kept consistent.
- Some FAQ schema exists without matching visible FAQ copy on the same page. For AI trust, visible copy and schema should align.

Priority:
- High. AI systems build entity understanding from repeated facts. Repeated inconsistent facts are worse than fewer consistent facts.

## Page Group AI SEO Audit

### Homepage

Route:
- `/`

Strengths:
- Has AISchema question/answer.
- Has LocalBusiness and FAQ JSON-LD.
- Includes hidden AI/GEO content with service summaries.
- Strong entity intent: "digital marketing agency in Pune."

Issues:
- Hidden AI-only content can help extraction, but it is less trustworthy than visible content that users can verify.
- H1 in crawler output appears concatenated: `BestDigital Marketing Agencyin Pune...`; extraction may be less clean than intended.
- Claims in hidden AI block include revenue and traffic-growth numbers without visible source/methodology.
- The homepage should include a visible "Growthik Media at a glance" facts block: services, city, founder, year, proof, primary CTA.

Recommended AI SEO improvements:
- Add a visible concise answer block near the top:
  - "Growthik Media is a Pune-based digital marketing agency specializing in SEO, Google Ads, Meta Ads, website development and AI marketing automation for startups, local businesses, ecommerce brands and B2B companies."
- Add visible proof with methodology:
  - number of projects
  - timeframe
  - source of metrics
  - example industries
- Add a "Best for / Not best for" block to help AI evaluate fit.
- Normalize hidden AI content characters and claims.

Priority queries:
- best digital marketing agency in Pune
- digital marketing agency Pune
- SEO agency Pune
- Google Ads agency Pune
- website development company Pune

### Services Hub

Route:
- `/services/`

Strengths:
- Strong internal linking hub.
- Contains service categories, local Pune signals, process, FAQ and schema.
- Good page for "what services does Growthik Media offer" answers.

Issues:
- The page is broad. AI systems may prefer more focused service pages unless this page has a clear extractable summary.
- Service descriptions are useful, but should be structured as a table for AI extraction:
  - Service
  - Who it is for
  - Deliverables
  - Typical outcome
  - Related page
- Results section needs more support: named case, industry, baseline, timeframe, method.

Recommended improvements:
- Add a visible service comparison table.
- Add an "Agency services summary" FAQ with direct answers.
- Add `ItemList` schema for the full service catalog.
- Use consistent service names across navigation, schema, sitemap and headings.

Priority queries:
- digital marketing services Pune
- SEO and Google Ads agency Pune
- Growthik Media services
- website development and marketing agency Pune

### Individual Service Pages

High-value pages:
- `/services/seo/`
- `/services/ppc-google-ads/`
- `/services/meta-ads/`
- `/services/performance-marketing/`
- `/services/lead-generation/`
- `/services/local-seo/`
- `/services/website-development/`
- `/services/website-design-company-pune/`
- `/services/website-development/nextjs/`
- `/services/web-application/`
- `/services/ecommerce-development/`
- `/services/content-marketing/`

Strengths:
- Broad long-tail coverage.
- Most have Service schema.
- Many have canonical URLs.
- Some include FAQs and ratings.

Issues:
- Many pages use repeated templated language. AI systems can extract it, but it may not be distinctive enough to cite.
- Several service pages lack:
  - clear first-paragraph definition
  - deliverables table
  - pricing/range or "what affects cost"
  - methodology/process
  - named proof/examples
  - comparison against alternatives
  - visible updated date
- Some service H1s reported by the crawler are mismatched or generic.
- Some service schemas reference an entity ID that does not exist globally.

Recommended page template for AI SEO:
- H1: exact service and location.
- First 60 words: direct answer to "what is this service and who is it for?"
- "What you get" table.
- "Who this is best for" block.
- "Typical timeline and pricing factors" block.
- "How Growthik does it" numbered methodology.
- "Proof / results" block with timeframe.
- FAQ with natural questions.
- Service schema linked to one canonical Organization/LocalBusiness ID.

Example extractable block:
- "Growthik Media provides SEO services in Pune for local businesses, startups, ecommerce brands and B2B companies. The service includes technical SEO, keyword research, on-page optimization, local SEO, content planning and reporting designed to increase qualified organic leads."

Priority:
- Very high for SEO, PPC, Meta Ads, Performance Marketing, Lead Generation, Website Development, Website Design, Local SEO.

### Location Pages

Observed from sitemap:
- `/website-design-company-aundh/`
- `/website-design-company-baner/`
- `/website-design-company-hadapsar/`
- `/website-design-company-kothrud/`
- `/website-design-company-pcmc/`
- `/website-design-company-viman-nagar/`
- `/website-design-company-wakad/`
- `/seo-company-hinjewadi/`
- `/website-design-company-pune/`

Strengths:
- Strong local entity coverage.
- Good match for AI local queries.
- `llms.txt` includes detailed Pune neighborhood playbooks.

Issues:
- Location pages are not all represented as physical/service-area entities in a consistent schema graph.
- The pages need unique local proof, not just location keyword changes.
- Some areas mention market context in `llms.txt`; ensure the same context exists visibly on the actual pages.

Recommended improvements:
- Add visible local "market context" answer block for each area.
- Add ServiceArea or areaServed schema consistently.
- Include neighborhood-specific FAQs:
  - "Do you provide website design in Baner?"
  - "What type of businesses in Hinjewadi need B2B SEO?"
  - "How long does local SEO take in Wakad?"
- Add map/service-area proof where appropriate.

Priority:
- High for local AI answers and "near me" style summaries.

### Blog Listing and Blog Articles

Routes:
- `/blog/`
- `/blog/[slug]/`

Strengths:
- Blog detail pages have BlogPosting schema.
- Authors, bios, dates, categories and tags exist.
- Some articles target AI-friendly formats: guides, checklists, pricing, comparisons.
- Article pages include related posts, CTA, author card and newsletter.

Issues:
- Several blog posts have no full content override, producing "content is being prepared" fallback. Thin article pages are unlikely to be cited.
- Some post dates are 2024/2025 for topics that need frequent updates.
- Blog data and blog page comments contain mojibake.
- Not all articles have visible source citations or original statistics.
- Comparison content exists, but not enough structured comparison tables.
- "Website cost in Pune" has strong AI potential but needs clean pricing tables and dates.

Highest AI-citation blog opportunities:
- `google-ads-vs-meta-ads`
- `website-cost-in-pune`
- `how-to-choose-website-design-company`
- `technical-seo-audit-checklist`
- `local-seo-pune`
- `core-web-vitals-guide`
- `complete-beginner-guide-to-seo-2026`

Recommended improvements:
- Make every indexed blog article complete, not placeholder/fallback.
- Add "Last updated" visibly to every article.
- Add source-backed stats and citations.
- Add comparison tables for comparison posts.
- Add step lists for how-to posts.
- Add Article/BlogPosting `citation` where references are used.
- Add author profile pages or stronger author sameAs links.

Priority:
- Very high. Blog content is one of the best surfaces for AI citations.

### Portfolio and Case Studies

Routes:
- `/portfolio/`
- `/portfolio/[slug]/`
- `/portfolio/case-studies/`
- `/portfolio/ads-performance/`
- `/portfolio/digital-campaigns/`
- `/portfolio/website-projects/`
- `/portfolio/branding-work/`
- `/portfolio/social-media-creatives/`

Strengths:
- Proof content is exactly what AI systems need for "is this agency credible?" answers.
- Portfolio has project data and category pages.
- Dynamic portfolio pages include schema.

Issues:
- Category pages had missing canonicals before the recent fix.
- AI systems need structured case-study facts:
  - client type
  - problem
  - solution
  - timeline
  - measured result
  - service used
- "Real results" claims need consistent evidence.

Recommended improvements:
- Convert top 5 projects into full case studies with CaseStudy/Article schema.
- Add `hasPart` or `ItemList` schema on portfolio pages.
- Add result tables:
  - Metric
  - Before
  - After
  - Timeframe
  - Service used
- Add disclaimers/methodology to make proof credible.

Priority:
- High. AI systems prefer concrete proof over agency claims.

### About Page

Route:
- `/about/`

Strengths:
- Has AboutPage, FAQ, Person schema.
- Founder and team details support E-E-A-T.
- Good place for entity disambiguation.

Issues:
- `getOrganizationSchema` exists but is not included in `combinedSchema`; only AboutPage, FAQ and Person are included.
- Founder/team claims should be backed by sameAs links and consistent bios.
- About metadata warning was fixed in the previous pass, but the current stored crawler report is older and still shows warnings.

Recommended improvements:
- Include Organization schema in the About page graph or rely on one canonical global Organization schema.
- Add sameAs links for founder profiles.
- Add credentials/certifications only if verifiable.
- Add "Founded in 2019" and timeline facts in schema if used visibly.

Priority:
- Medium-high for brand/entity trust.

### Contact and Audit Pages

Routes:
- `/contact/`
- `/audit/`

Strengths:
- Contact page has ContactPage and FAQ schema.
- Audit page is clear and conversion-focused.
- Both support lead generation.

Issues:
- Contact metadata was cleaned in the previous pass, but older crawler report still shows mojibake.
- Audit page should explain what the audit includes in an extractable list.
- AI systems may cite contact details; these need to match across every source.

Recommended improvements:
- Add visible "Contact Growthik Media" facts block:
  - address
  - phone
  - email
  - hours
  - service area
- Add "What the free audit includes" numbered list on `/audit/`.
- Add Service schema or Offer schema for the free audit.

Priority:
- Medium for citations, high for conversions.

### Legal and Utility Pages

Routes:
- `/privacy-policy/`
- `/terms/`
- `404`

Strengths:
- Legal pages exist.
- Custom 404 helps user recovery.

Issues:
- Legal pages are not citation targets, but they support trust.
- 404 is not an AI SEO priority.

Recommended improvements:
- Ensure legal company facts match schema.
- Track 404 pages separately; no AI-specific changes needed unless 404 traffic is high.

## Cross-Site Issues

### 1. Entity Consistency

Current inconsistent or risky facts:
- Phone differs between `CONTACT_INFO` and `public/ai-audit.json`.
- Opening hours differ between `llms.txt`, LocalBusiness schema and SEO schema.
- Coordinates differ between LocalBusiness schema and SEO schema.
- Entity IDs differ across schema files.
- Social profiles are extensive; inactive/unverified profiles should be removed or kept out of schema.

Recommendation:
- Create one canonical entity source, likely `constants/contact.ts`.
- Generate all Organization/LocalBusiness/AI JSON from that source.
- Use one canonical ID:
  - `https://www.growthikmedia.com/#organization`
  - optionally `https://www.growthikmedia.com/#localbusiness`
- Make service schema provider references point to the same ID.

### 2. Mojibake and Encoding

Broken characters appear in:
- `public/llms.txt`
- `constants/contact.ts`
- `lib/blog/data.ts`
- `app/(public)/blog/[slug]/page.tsx` comments
- `components/PublicComponents/HomePageComp/GEO/AIOptimizedBlocks.tsx`
- older crawler output for contact/about/service pages

AI SEO impact:
- AI systems may repeat broken characters in answers.
- Broken characters reduce trust and extractability.
- Currency and date ranges become ambiguous.

Recommendation:
- Clean all AI-facing files first:
  - `public/llms.txt`
  - `public/ai-audit.json`
  - `constants/contact.ts`
  - blog data
  - visible service/page content

### 3. Hidden AI Content

Observed:
- `AISchema` can render hidden summaries.
- Homepage has an `sr-only` AI-optimized block.

Risk:
- Hidden content can be useful for accessibility if truthful, but AI-only hidden summaries are less trustable than visible copy.

Recommendation:
- Keep schema.
- Move the most important AI summaries into visible, well-designed answer blocks.
- Avoid hidden claims that are stronger than visible claims.

### 4. Claims Without Sources

Examples:
- revenue generated
- traffic growth
- satisfaction percentage
- PageSpeed guarantees
- certification/partner claims
- review count and aggregate rating

AI SEO impact:
- Unsourced metrics are less likely to be cited.
- Unsupported ratings can create trust or policy risk.

Recommendation:
- Add methodology or source notes:
  - "Based on internal client campaign data from [date range]"
  - "Review count from Google Business Profile as of [date]"
  - "Performance measured using PageSpeed Insights/Lighthouse"
- Prefer fewer supported claims over many unsupported claims.

## Content Formats to Build Next

These are the highest-value AI-citation formats for Growthik Media:

1. `Best Digital Marketing Agencies in Pune`
   - Balanced list, transparent criteria, includes competitors fairly.

2. `Google Ads vs Meta Ads for Pune Businesses`
   - Already exists; strengthen with a comparison table, costs, use cases and examples.

3. `Website Cost in Pune`
   - Already exists; strengthen with updated 2026 pricing tables.

4. `SEO Company in Pune: Selection Guide`
   - Buyer guide with evaluation checklist.

5. `Growthik Media vs Traditional Digital Marketing Agency`
   - Explain positioning without attacking competitors.

6. `Local SEO for Pune Businesses`
   - Neighborhood-specific examples and map-pack process.

7. `Digital Marketing Benchmarks for Pune Businesses`
   - Original data/report page. This is the strongest citation asset if real data is available.

8. `Free SEO Audit Checklist`
   - Step-by-step extractable guide and downloadable/ungated version.

## Query Monitoring Plan

Because live AI visibility changes constantly, run this monthly across ChatGPT search, Perplexity, Google AI Overviews, Gemini and Copilot.

Priority queries:
- best digital marketing agency in Pune
- top SEO company in Pune
- Google Ads agency Pune
- Meta Ads agency Pune
- website development company Pune
- website design company Pune
- local SEO services Pune
- performance marketing agency Pune
- lead generation agency Pune
- website cost in Pune
- Google Ads vs Meta Ads for small business
- how to choose a website design company in Pune
- SEO audit checklist
- Core Web Vitals agency India
- AI marketing automation agency Pune
- Growthik Media
- Growthik Media reviews
- Growthik Media services

Track:
- AI answer appears: yes/no
- Growthik mentioned: yes/no
- Growthik cited with link: yes/no
- Which page is cited
- Competitors cited
- Sentiment/summary wording
- Missing facts or wrong facts

## Implementation Roadmap

### Phase 1: Clean Entity Foundation

- Normalize `CONTACT_INFO`, `llms.txt`, `ai-audit.json` and schema facts.
- Fix broken characters in AI-facing files.
- Use one Organization ID across all schema.
- Confirm real social profiles before including them in `sameAs`.
- Re-run crawl after metadata/contact fixes already made.

### Phase 2: Improve Extractability

- Add visible answer blocks on homepage, services hub, top service pages, audit and contact.
- Add service deliverables tables.
- Add "last updated" dates to service pages and blog posts.
- Ensure every FAQ schema question appears visibly on the page.

### Phase 3: Build Citation Authority

- Add source-backed statistics and methodology notes.
- Build 5-10 complete case studies with measurable results.
- Add author profile authority and sameAs links.
- Publish original Pune digital marketing benchmark/report content.

### Phase 4: Create AI-Citable Content Types

- Comparison pages.
- Best-of/alternatives pages.
- Pricing guides.
- Step-by-step checklists.
- Industry/location playbooks.

### Phase 5: Monitor and Iterate

- Maintain an AI visibility spreadsheet.
- Track ChatGPT/Perplexity/Gemini/Copilot/Google AI Overview results monthly.
- Update priority pages quarterly.
- Use AI referral traffic and branded search changes as secondary signals.

## Priority Fix List

1. Clean and normalize `public/llms.txt`.
2. Fix `public/ai-audit.json` phone number, description, sameAs and service coverage.
3. Normalize Organization/LocalBusiness schema IDs.
4. Fix mojibake in `constants/contact.ts`, blog data and AI/GEO blocks.
5. Add visible extractable answer blocks to homepage and services hub.
6. Add service deliverables tables to top service pages.
7. Complete placeholder blog articles or noindex incomplete posts.
8. Add source-backed stats and methodology for proof claims.
9. Add original case studies with result tables.
10. Start monthly AI visibility tracking for the priority query set.

