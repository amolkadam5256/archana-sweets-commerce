# Growthik Media Non-UI Implementation Backlog

Date: 2026-04-23

Goal:
- Turn the site-wide audit into a file-by-file execution plan
- Focus on SEO, AI SEO, schema, tracking, proof structure and content quality
- Avoid UI redesign work

## Batch 1: Foundation and Tracking

Status:
- Complete

Files:
- [x] `constants/contact.ts`
- [x] `components/PublicComponents/comman/SEO.tsx`
- [x] `components/PublicComponents/structured-data/LocalBusinessSchema.tsx`
- [x] `components/PublicComponents/comman/PageViewTracker.tsx`
- [x] `components/PublicComponents/comman/AuditRequestForm.tsx`
- [x] `components/PublicComponents/ContactPage/ContactForm.tsx`
- [x] `app/(public)/about/page.tsx`
- [x] `app/(public)/contact/page.tsx`
- [x] `app/(public)/privacy-policy/page.tsx`
- [x] `app/(public)/terms/page.tsx`
- [x] `public/ai-audit.json`
- [x] `public/llms.txt`
- [x] `public/sitemap-pages.xml`
- [x] `lib/analytics.ts`

What landed:
- standardized entity IDs and business facts
- improved event tracking and page-group attribution
- fixed canonical issues on legal pages
- removed visible encoding artifacts from key machine-readable files

## Batch 2: Portfolio, Proof and Collection Schema

Status:
- Complete

Files:
- [x] `app/(public)/portfolio/page.tsx`
- [x] `app/(public)/portfolio/[slug]/page.tsx`
- [x] `app/(public)/portfolio/ads-performance/page.tsx`
- [x] `app/(public)/portfolio/branding-work/page.tsx`
- [x] `app/(public)/portfolio/case-studies/page.tsx`
- [x] `app/(public)/portfolio/digital-campaigns/page.tsx`
- [x] `app/(public)/portfolio/social-media-creatives/page.tsx`
- [x] `app/(public)/portfolio/website-projects/page.tsx`
- [x] `app/success-stories/page.tsx`
- [x] `lib/data/portfolio.ts`
- [x] `lib/seo/collectionSchema.ts`

What landed:
- collection and item list schema for portfolio hubs
- stronger case-study schema for portfolio detail pages
- success-stories collection schema
- cleaned encoding artifacts in portfolio content

## Batch 3: Services Hub and Service Template Consistency

Status:
- Complete

Files:
- [x] `app/(public)/services/page.tsx`
- [x] `app/(public)/services/(digital-marketing)/*/page.tsx`
- [x] `app/(public)/services/(technology-services)/*/page.tsx`
- [x] `app/(public)/services/(branding-creative)/*/page.tsx`
- [x] `app/(public)/services/_programmatic/page.tsx`

What landed:
- Standardized service schema with consistent provider IDs and areaServed.
- Implemented professional iconography (Lucide-React) across all 25+ service pages.
- Normalized meta descriptions and H1 structures for better SEO.
- Tightened FAQ quality and added JSON-LD for local intent.
- Cleaned encoding artifacts and legacy HTML snippets.

## Batch 4: Blog Quality and AI-Citable Content

Status:
- In progress

Files:
- [x] `lib/blog/content.tsx` (Professional Iconography Refactor)
- [ ] `lib/blog/content.tsx` (Content expansion and Gaps)
- [ ] `app/(public)/blog/[slug]/page.tsx`

What landed:
- Replaced all legacy checkmark emojis with professional `CheckListItem` Lucide components.
- Standardized typography and spacing for all blog checklists.
- Verified 100% professional iconography across the entire blog library.

What to finish:
- Close content gaps: Add AI SEO/AEO guide, Verticalization guides (Real Estate, SaaS) and Conversion Psychology.
- Implement source-backed result tables for every "Growth" claim.
- Add "Human" E-E-A-T signals (Founder insights, methodology notes).

## Batch 5: Internal Linking & Crawl Equity

Status:
- Pending

Files:
- [ ] `components/PublicComponents/HomePageComp/GEO/AIOptimizedBlocks.tsx`
- [ ] `lib/blog/content.tsx` (Add cross-links to services)
- [ ] `app/(public)/services/_programmatic/page.tsx` (Add links to relevant blog posts)

What to finish:
- Link service pages to their corresponding deep-dive blog guides.
- Add "Related Services" to blog post footers.
- Improve breadcrumb consistency across the entire services tree.
- Ensure the "Free Audit" CTA is present in every high-traffic blog section.

## Batch 6: Programmatic Scaling & Verticalization

Status:
- Pending

What to finish:
- **Verticalization:** Create industry-specific SEO blueprints (e.g., Real Estate, Healthcare, SaaS).
- **Comparison Pages:** Build "You vs. Traditional Agency" and "Google Ads vs. Meta Ads" landing pages.
- **Proof Expansion:** Convert the thin "Success Stories" into structured case studies with metric tables (Before vs. After).
- **AI-Citable Data:** Publish a "Pune Digital Marketing 2026 Benchmarks" report based on anonymized data.
- **Hyper-Local Expansion:** Extend localized landing pages to include "Digital Marketing for [Industry] in [Area]".
