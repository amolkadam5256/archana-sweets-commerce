<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Archana Sweets Project Mandate

### 1. Typography & Design Rules (STRICT)
- **Forbidden Classes**: `text-5xl`, `text-6xl`, `text-7xl`, `text-8xl`, `text-9xl`.
- **Maximum Size**: `text-4xl` (36px).
- **Default Small/Body Text**: `text-xs` (12px) for all normal or small text (p, span, small, etc.).
- **Hierarchy**:
  - Hero Title: `text-4xl` (desktop) | `text-3xl` (tablet) | `text-2xl` (mobile)
  - Hero Subtitle: `text-lg`
  - Section Headings: `text-2xl` to `text-3xl`
  - Product Name: `text-lg`
  - Product Price: `text-xl`
  - Body Content: `text-base` (or `text-xs` when specified for dense UI)
  - Footer: `text-sm`

### 2. Content & Layout Rules
- **Minimalism**: Headlines (3-6 words), Subheadings (10-15 words), Paragraphs (20-30 words).
- **White Space**: Prioritize white space, high-quality photography, and visual hierarchy over text blocks.
- **Aesthetic**: Premium, Modern, Minimal, Luxury, Conversion-focused. (Inspiration: Apple, Stripe, Airbnb).
- **No Clutter**: Avoid oversized headings, large text blocks, and excessive animations.

### 3. Engineering Rules
- **Codebase Audits**: Before every build or completion, scan for forbidden text classes and replace with approved sizes.
- **Stack**: Preserve Next.js 15+, React 19, Tailwind CSS 4, TypeScript, Redux Toolkit, and FastAPI backend.
- **Brand Consistency**: Keep the brand warm, traditional, premium, and mobile-first.
- **Route Metadata**: Use real route metadata for all public pages.
- **Validation**: Every form must have a validation schema and clear error states.
- **Performance**: Recalculate all payment totals on the server; use server components where possible.
- **Media**: Ensure fast loading through image optimization.
- **Data Integrity**: DO NOT use data from previous projects (e.g., Growthik Media). Use project-specific content only.
