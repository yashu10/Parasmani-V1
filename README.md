# Handoff: PEPL (Parasmani Engineering) website, Next.js build for Vercel

## Overview
> **Build source: `design/PEPL Website Orange.dc.html`** (final approved version). The older `PEPL Website Motion.dc.html` is kept only for reference. Where the two differ, follow Orange.

This is an 11-page B2B marketing site for Parasmani Engineering Pvt. Ltd., a heavy steel fabrication company. It has a dark theme by default and a light theme behind a toggle. Behind the content sits an ambient Three.js wireframe background. Content reveals as you scroll, headline words rise into place, and stat numbers count up. The Contact page has a validating RFQ form.

**Goal:** rebuild it in Next.js (App Router) with good SEO: every page server-rendered or static at a real URL. Then deploy to Vercel for testing.

## About the design files
Everything in `design/` is a **design reference built in HTML**, not production code. Open `design/PEPL Website Orange.dc.html` in a browser to see it. Rebuild it in idiomatic Next.js + React. Do not embed the HTML file or `support.js` in the app.

## Fidelity
**High-fidelity.** Colors, type, spacing, copy and motion are final. Match them pixel for pixel. Anything shown with a "pending verification" flag is still waiting for client confirmation (see Data integrity).

## Target stack
- Next.js 15, App Router, TypeScript
- `three` for the background, loaded client-only
- `gsap` with `@gsap/react` (`useGSAP`, ScrollTrigger) for reveals. The prototype uses the Web Animations API plus IntersectionObserver. Either approach is fine as long as timings match.
- Theme: a `data-theme` attribute on `<html>`, via `next-themes` (`attribute="data-theme"`, `defaultTheme="dark"`)
- Font: `next/font/google` Archivo, weights 400/500/600/700/800
- Styling: CSS Modules or plain global CSS using the variables below. No Tailwind needed.
- Images: `next/image`, files kept locally in `public/images/`

## Routing: the most important SEO change
The prototype is a single page with hash routing (`#about`, `#contact`, …). **Replace that with real routes:**

| Route | Screen | H1 |
|---|---|---|
| `/` | Home | ENGINEERING STEEL. BUILDING POSSIBILITY. |
| `/about` | About | AN ORGANISATION BUILT ON FOUR VALUES. |
| `/capabilities` | Capabilities | ENGINEERED FOR COMPLEXITY. |
| `/industries` | Industries | ENGINEERED FOR INDUSTRY. |
| `/projects` | Projects | PROJECTS ARE THE PROOF. |
| `/facility` | Facility | WHERE ENGINEERING BECOMES REAL. |
| `/quality` | Quality | QUALITY IS ENGINEERED INTO EVERY STAGE. |
| `/technology` | Technology | ONE DATA CHAIN. NOTHING RE-TYPED. |
| `/careers` | Careers (nav visibility via env `NEXT_PUBLIC_SHOW_CAREERS`) | OWNERSHIP IS A JOB DESCRIPTION HERE. |
| `/rdso-approval` | RDSO (12 document cards, PDFs linked from client site; copy PDFs to `public/rdso/`) | RDSO APPROVAL UNDER PROCESS. |
| `/contact` | Contact + RFQ | LET'S ENGINEER YOUR NEXT PROJECT. |

Optional later: `/industries/[slug]` and `/projects/[slug]` detail pages, generated with `generateStaticParams`. They help SEO for long-tail searches.

### SEO checklist
- Every page is a **Server Component**. Only the background canvas, theme toggle, mobile menu, film modal, motion wrappers and RFQ form are `'use client'`.
- Export `metadata` from every page with a unique `title`, `description`, `alternates.canonical` and `openGraph`. Set `metadataBase` in the root layout.
- Put the full H1 text and copy in the HTML. The per-word split animation must run on the client **after hydration**, so crawlers still see the plain text. Hidden-before-reveal styles apply only when JS is running: add a `js` class on `<html>` and gate `[data-reveal]{opacity:0}` behind it.
- Create `app/sitemap.ts` and `app/robots.ts`. Leave `/careers` out of the sitemap while it's hidden.
- Add JSON-LD in the root layout: `Organization` (name, logo, url, address, contact point). Add `LocalBusiness` if the client provides the address.
- Every `next/image` needs descriptive `alt` text. Mark the hero image `priority`.
- Target Lighthouse scores of 90+ for Performance, SEO and Accessibility. Three.js must not block LCP (see Background).

## Orange version: changes vs Motion
- **Highlight colour** `--hl`: `#FF8A2A` (dark) / `#D95F0E` (light). Used for the last words of H1/H2 (`data-hl`), active nav line, submenu markers, RDSO status.
- **Header nav:** Home, About ▾, Industries, Projects, RDSO, Contact (+Careers when enabled). **About** opens a hover/focus dropdown with Capabilities, Facility, Technology, Quality (drop-in 0.28s, translateY -8→0). On mobile the full-screen menu shows the same grouping (About with its 4 sub-links indented). Logo height 42px.
- **Page headers:** every page opens with a full-width background photo (`min-height: clamp(420px,62vh,640px)`) and a left-to-right gradient overlay `rgba(var(--bg-rgb), .94 → .05)` so the text stays readable.
- **Site background:** default is a fixed full-viewport photo (`assets/stock/prefab-bg.jpg`, prefab steel frame) under a dark overlay (~88%). The Three.js background is optional (`backgroundMode: Image | 3D`); ship **Image** as default and lazy-load Three.js only if 3D is enabled.
- **Buttons:** all have a hover animation (fill swap + slight lift). Copy it from the inline `style-hover` rules.
- **Images are full colour** (no grayscale filter).
- **Copy updates:** "Design & Engineering" (not "Engineering & Detailing"); the "Not just fabrication" banner copy is updated across all pages — take the text from the Orange file.

- **Clients & Project Partners:** 8 logos in `design/assets/clients/` (L&T, AM/NS India, Jindal Steel, Adani Solar, KEC, Hindustan Zinc, BHEL, JSW), on white tiles. Shown on **Home** (compact grid) and at the bottom of **About** (large grid). Copy to `public/images/clients/`, use next/image with alt = company name. JSW source is only 124x61px, replace when a better file is available.

## Suggested structure
```
app/
  layout.tsx            fonts, ThemeProvider, Header, Footer, <Background/>, JSON-LD
  page.tsx              Home
  about/page.tsx … contact/page.tsx
  contact/actions.ts    RFQ server action
  sitemap.ts  robots.ts
components/
  Header.tsx  MobileMenu.tsx  ThemeToggle.tsx  Footer.tsx  ScrollProgress.tsx
  Background.tsx        'use client', dynamic(import, {ssr:false})
  Reveal.tsx  WordsRise.tsx  CountUp.tsx
  FilmModal.tsx  RfqForm.tsx  PendingFlag.tsx
lib/
  content.ts            industries, projects, stages, machinery, values, leadership, clients
  bg/scene.ts           port of pepl-bg.js as an ES module
public/images/          copied from design/assets/stock/*.jpg + pepl-logo.png
```
All copy lives inline in `design/PEPL Website Orange.dc.html` (the template plus the arrays in `renderVals()`). Move it into `lib/content.ts`.

## Design tokens
Dark is the default. Light applies under `[data-theme="light"]`.

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#0A1622` | `#FFFFFF` |
| `--bg2` (surfaces, inputs) | `#122232` | `#F1F4F7` |
| `--bg3` | `#07111B` | `#E9EEF3` |
| `--ink` (text) | `#F3F2F2` | `#0A1622` |
| `--soft` (secondary text) | `#C3CDD7` | `#2F4356` |
| `--mute` (labels, meta) | `#8C9AA8` | `#56677A` |
| `--acc` (accent) | `#5AA6E6` | `#00508E` |
| `--ink-rgb` / `--bg-rgb` | `243,242,242` / `10,22,34` | `10,22,34` / `255,255,255` |

- Brand blue `#00508E` is used for `::selection` and the thumbnail. The 3D accent is `#3D8FD6`.
- **Radius is 0 everywhere.** Dividers are 2px solid `rgba(var(--ink-rgb),0.24)` or stronger. Don't use hairlines.
- **Type** is Archivo throughout. Headings are uppercase, weight 800, with tight tracking. Labels are uppercase 12–13px, weight 600–700, letter-spacing about 0.08em. Body copy is 15–18px at line-height about 1.55, using `text-wrap: pretty`. Read exact sizes from the inline styles in the design file. Mobile breakpoint is `< 1200px`.
- **Layout:** a visible modular grid, everything flush left, button labels left-aligned.
- **Theme transition:** `background-color, color, border-color` over 0.5s ease.
- **Logo:** `assets/pepl-logo.png`. In dark mode it's recolored with `filter: brightness(0) invert(1)`. In light mode it has no filter.
- **Focus:** `outline: 2px solid var(--acc); outline-offset: 2px`.

## Interactions and motion
- **Page change:** scroll to top, then the screen fades in (opacity 0→1, translateY 26→0, 0.5s, `cubic-bezier(0.16,1,0.3,1)`).
- **Block reveal:** each top-level block fades in when 10% of it is visible (opacity 0→1, y 24→0, 0.6s, same ease). If a block is a grid with 3 or more children, the children reveal one after another, 0.06s apart.
- **Headline words (`data-words`):** each word sits in an `overflow:hidden` span and rises from translateY(105%) to 0 over 0.75s, 0.045s apart, once 30% of the headline is visible.
- **Count-up (`data-count`):** integers of 10 or more count from 0 over 1.1s with ease-out cubic, formatted with `en-IN` grouping. Starts when 60% visible.
- **Scroll progress bar:** fixed at the top; width = scrollY / (scrollHeight − innerHeight).
- **Marquee:** the clients strip loops `translateX(0 → -50%)` on duplicated content.
- **Sweep:** accent rules draw in with `scaleX(0 → 1)`.
- **Reduced motion:** with `prefers-reduced-motion: reduce`, skip all reveals and the background animation, and show everything statically.
- **Background (`pepl-bg.js`):** a fixed full-viewport canvas at z-index 0. A radial-gradient vignette overlay sits at z-index 1, with content above it. It has four wireframe variants (0 knot, 1 lattice, 2 solid, 3 fourth variant) that crossfade on route change:
  home 0, about 2, capabilities 1, industries 3, projects 1, facility 3, quality 2, technology 0, careers 2, rdso 3, contact 1.
  API to port: `mount(canvas) → { setVariant(n), setTheme('dark'|'light'), dispose() }`. Load it only after first paint (`dynamic` with `ssr:false`, or start after `requestIdleCallback`). Pause it when the tab is hidden. Cap pixel ratio at 1.5.
- **Theme toggle:** saved in `localStorage` (`pepl-mono`: `"1"` means light) and calls `bg.setTheme`. With next-themes, use an inline script to avoid a theme flash on load.
- **Mobile menu:** a full-screen overlay below 1200px that closes on navigation.
- **Film modal:** opened from Home, closes on Esc or backdrop click, and locks page scroll while open.

## RFQ form (Contact)
Fields, with * marking required:
Name*, Company*, Designation, Email*, Mobile*, Project location, Required tonnage (number), Material grade, Expected delivery (date), Inspection agency, Scope of work* (textarea), and a drawing upload (optional).

Validation happens on submit, then live after that:
- Required fields can't be empty ("This field is required.").
- Email must match `^[^\s@]+@[^\s@]+\.[^\s@]+$` ("Enter a valid email address.").
- Mobile needs at least 10 digits ("Enter a valid mobile number.").

Invalid fields get `aria-invalid` and a border in `--acc`, with the error text below. When the form is valid it shows a success state.

Production: a server action validates again with zod, then sends email through **Resend** (`RESEND_API_KEY`, `RFQ_TO_EMAIL` as Vercel env vars). For file uploads, use Vercel Blob or send the file as an email attachment (up to 10 MB). Add a honeypot field and basic rate limiting.

## Data integrity
The prototype marks unverified client facts (certifications, capacities, client logos, numbers) with a "pending verification" flag (`showVerificationFlags`). Build it as a `PendingFlag` component controlled by an env flag. Keep it **on** for the Vercel preview and turn it off only after the client signs off.

## Assets
- `design/assets/pepl-logo.png` is the client logo.
- `design/assets/stock/*.jpg` holds 29 images (A–Z, AA–AC). They're pulled from the client's current website and a stock placeholder set. The image-to-section mapping is in `renderVals()` (`S_IND`, `S_PRJ`, `S_STG`, `S_MCH`, and the `P(...)` calls in the template). Ask the client for high-res originals and confirm usage rights before launch.
- Icons: Lucide (`lucide-react`).

## Deploy to Vercel
1. Push to a GitHub repo.
2. On vercel.com, add a new project, import the repo and keep the framework preset on Next.js.
3. Add the env vars: `RESEND_API_KEY`, `RFQ_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SHOW_PENDING=1`, `NEXT_PUBLIC_SHOW_CAREERS=1`.
4. Every push gets a preview URL; `main` becomes production. Add the custom domain later under Settings → Domains.
5. While the site is on test URLs, return `noindex` from `robots.ts` so it isn't indexed. Allow indexing only on the final domain.

## Files
- `design/PEPL Website Orange.dc.html`: **the build source**, all 11 screens, copy and behavior
- `design/PEPL Website Motion.dc.html`: older reference only
- `design/pepl-bg.js`: the Three.js background (port to TS)
- `design/vendor/three.global.js`: three build used by the prototype (use the npm `three` package instead)
- `design/assets/`: logo and images
- `design/_ds/…/styles.css`: base design-system sheet (Modernist) that the prototype links
- `design/support.js`, `design/image-slot.js`: prototype runtime only, **do not port**
