---
description: Comprehensive Full-Stack Audit Workflow
---

# Workflow: Full Project Audit

Use this workflow when the user requests a "detailed audit", "full-stack review", or "project health check".

// turbo
1. **Static Analysis**
   - Run `npm run audit:seo` (if available) or use the custom crawler in `automation/seo-audit/`.
   - Review `package.json` for outdated or vulnerable dependencies.
   - Run `npx tsc --noEmit` to check for hidden TypeScript errors.

2. **Architecture Review**
   - Check `app/layout.tsx` for correct implementation of global providers (GTM, Meta Pixel).
   - Verify `next.config.ts` for security headers and redirect rules.
   - Check `prisma/schema.prisma` for data model integrity.

3. **SEO & AEO Audit**
   - Verify presence of `public/llms.txt` and `public/ai-audit.json`.
   - Check individual service pages for JSON-LD schema accuracy.
   - Review meta descriptions across the top 10 high-traffic paths.

4. **Analytics Validation**
   - Check `lib/analytics.ts` for placeholder IDs (`AW-`, `G-`, etc.).
   - Verify `PageViewTracker.tsx` and `ProgressiveLeadCapture.tsx` are correctly instrumented.
   - Review GTM exports in `.agents/tracking/` if available.

5. **Performance Check**
   - Analyze image usage: ensure `next/image` is used with correct priorities.
   - Check for heavy layout shifts (CLS) on the home and services pages.

6. **Reporting**
   - Generate a report in `.agents/reports/` following the `full-project-audit` template.
   - Focus on "Crucial Pending Tasks" and "Strategic Recommendations".
