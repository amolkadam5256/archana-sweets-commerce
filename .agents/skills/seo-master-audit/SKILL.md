---
name: seo-master-audit
description: Use this skill when the user wants to conduct a comprehensive SEO audit and fix implementation based on the 14-Step Master System. This is the ultimate guide for optimizing Website + Brand ranking, particularly for local markets like Pune. Use this when the user mentions "SEO master audit," "fix my site details," "SEO 14 step system," or "SEO foundation and ranking."
metadata:
  version: 2.0.0
---

# 📄 SEO MASTER AUDIT & FIX REPORT (Website + Brand Ranking System)

This skill provides the **Master System** for all SEO operations, auditing, and ranking for Growthik Media and its clients. It combines technical SEO, content strategy, and brand building into a single 14-step action plan.

## The 14-Step Master Audit Framework

### 1. SEO FOUNDATION (Goal Alignment)
*Before auditing, align on business goals.*
- **Objective:** Traffic, Leads, and Brand Authority.
- **Checklist:**
  - [ ] Are conversion goals defined (e.g., Form submits, WhatsApp clicks)?
  - [ ] Is the primary target market defined (e.g., Pune, National, Global)?
  - [ ] Is the "North Star" metric identified (e.g., Leads per month)?

### 2. FULL WEBSITE AUDIT (Technical Step 1)
*सबसे जरूरी - Fix the foundation first.*
- **Checklist:**
  - [ ] **Speed:** Does it load in < 3 seconds? (Use Lighthouse/PageSpeed).
  - [ ] **Mobile:** Is it 100% responsive?
  - [ ] **HTTPS:** Is SSL active and forced?
  - [ ] **Broken Links:** Scan for 404s and fix them.
  - [ ] **Sitemap:** Is `sitemap.xml` dynamic and correct?
  - [ ] **Robots:** Is `robots.txt` allowing AI and search bots?

### 3. KEYWORD STRATEGY (Ranking Foundation)
*One page = one main keyword.*
- **Checklist:**
  - [ ] **Main Keyword:** Is there one clear primary keyword per page?
  - [ ] **LSI/Supporting:** Are there 3-5 supporting keywords?
  - [ ] **Intent:** Does the content match the search intent (Informational vs. Commercial)?
  - [ ] **Cannibalization:** Are multiple pages competing for the same keyword? (Fix with canonicals or merging).

### 4. ON-PAGE SEO (Direct Factor)
*Content + structure = ranking power.*
- **Checklist:**
  - [ ] **Title Tag:** Keyword at the beginning, < 60 chars.
  - [ ] **Meta Description:** Clickable, includes CTA, < 160 chars.
  - [ ] **H1 Tag:** Exactly one per page, includes main keyword.
  - [ ] **Subheadings (H2-H4):** Logical hierarchy, includes supporting keywords.
  - [ ] **URL Structure:** Short, descriptive, includes keyword (no numbers/dates).
  - [ ] **Internal Links:** 3-5 links to other relevant pages using descriptive anchor text.

### 5. CONTENT SEO (MOST IMPORTANT 🔥)
*Quality content = #1 ranking factor.*
- **Checklist:**
  - [ ] **Pillar Pages:** Do we have "Hub" pages for main categories?
  - [ ] **Cluster Content:** Are there supporting blogs linking back to the Pillar?
  - [ ] **EEAT:** Are there author bios, expert quotes, and original data?
  - [ ] **Regularity:** Is content published at least weekly?
  - [ ] **Depth:** Is the content comprehensive (1500+ words for competitive terms)?

### 6. OFF-PAGE SEO (Authority)
*Quality > Quantity.*
- **Checklist:**
  - [ ] **Backlink Profile:** Are links from authoritative, niche-relevant sites?
  - [ ] **Guest Posting:** Is there an active outreach strategy?
  - [ ] **Social Signals:** Is content shared on LinkedIn/Twitter/Instagram?
  - [ ] **Brand Mentions:** Are there unlinked mentions we can convert?

### 7. LOCAL SEO (Pune Market Dominance)
*Crucial for Pune businesses.*
- **Checklist:**
  - [ ] **Google Business Profile:** Fully optimized with photos and weekly posts.
  - [ ] **Reviews:** Active strategy to get 5-star reviews with keywords.
  - [ ] **NAP Consistency:** Name, Address, Phone same everywhere (Website, GMB, Directories).
  - [ ] **Local Keywords:** Target "service in [neighborhood]" (e.g., Baner, Wakad, Hinjewadi).

### 8. TECHNICAL SEO (Backend Power)
*Fast + Smooth = Better Ranking.*
- **Checklist:**
  - [ ] **Core Web Vitals:** LCP < 2.5s, FID < 100ms, CLS < 0.1.
  - [ ] **Image Optimization:** WebP format, responsive sizes, Alt text on ALL images.
  - [ ] **Schema Markup:** JSON-LD for Organization, LocalBusiness, FAQ, and BlogPosting.
  - [ ] **Caching:** Server-side and client-side caching active.

### 9. CONTENT UPDATE SYSTEM
*Fresh content is a ranking signal.*
- **Checklist:**
  - [ ] **Audit Frequency:** Check old content every 6 months.
  - [ ] **Updates:** Refresh data, add new sections, and fix broken links in old blogs.
  - [ ] **Redirects:** Use 301 redirects when changing URLs.

### 10. ANALYTICS & TRACKING
*Data = Growth Decisions.*
- **Checklist:**
  - [ ] **GSC:** Google Search Console verified and sitemap submitted.
  - [ ] **GA4:** Event tracking for leads, calls, and WhatsApp.
  - [ ] **Rank Tracking:** Weekly check on primary keyword positions.
  - [ ] **Heatmaps:** (Optional) Use Microsoft Clarity to see user behavior.

### 11. BRAND BUILDING (Advanced)
*SEO + Branding = Long-term Dominance.*
- **Checklist:**
  - [ ] **Brand Search:** Increasing volume of people searching "Growthik Media".
  - [ ] **Authority:** Published research, whitepapers, or case studies.
  - [ ] **Consistency:** Same messaging and visuals across all platforms.

### 12. FINAL SEO FORMULA
`SEO = (Content + Keywords + Technical + Backlinks + UX + Consistency)`

### 13. REALITY CHECK
- SEO is NOT instant. Expect 3–6 months for significant results.
- Consistency wins. One great blog post isn't enough.

### 14. ACTION PLAN (The 4-Week Sprint)
- **Week 1: Foundations & Tech.** Fix sitemaps, speed, and 404s.
- **Week 2: Keyword Mapping.** Audit and optimize titles, metas, and URLs.
- **Week 3: Content Engine.** Start publishing pillar and cluster content.
- **Week 4+: Authority & Tracking.** Outreach for links, monitor GSC, and iterate.

---

## Output Format for Audit Reports

When the user asks for a "detailed audit", use this structure:

1. **Executive Summary:** Overall health score (1-10) and top 3 priorities.
2. **Technical Audit (Steps 2 & 8):** Detailed breakdown of speed, CWV, and errors.
3. **Keyword & On-Page (Steps 3 & 4):** Page-by-page table with Title/Meta/H1 status.
4. **Content & AI SEO (Steps 5 & 9):** Blog performance and citation readiness.
5. **Local SEO (Step 7):** Pune-specific ranking status and neighborhood coverage.
6. **The 4-Week Action Plan:** Precise tasks for the next month.

---

## Implementation Guidelines (For Code)

- **Metadata:** Use `generateMetadata` in Next.js for every page.
- **Schema:** Use `Script` with `application/ld+json`.
- **Images:** Always use `next/image` with `placeholder="blur"` and `alt`.
- **Internal Links:** Use `Link` from `next/link` for pre-fetching.
- **Sitemap:** Ensure `app/sitemap.ts` is updated with new routes.
