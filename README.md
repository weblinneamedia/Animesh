# Animesh Hazra — Personal Portfolio

Premium personal brand website for **Animesh Hazra**, positioned as a Freelance Full-Stack Developer & Digital Solutions Specialist.

Built to feel like a mix of personal portfolio, creative technology studio, and digital solutions agency — while remaining lightweight, maintainable, and Vercel-ready.

## Tech stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Motion (Framer Motion)
- Lucide React
- ESLint

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and configure as needed:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO, sitemap, Open Graph |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Optional analytics integration flag (`true` / `false`) |
| `FORMSPREE_FORM_ID` | Optional Formspree form id for contact delivery |
| `CONTACT_WEBHOOK_URL` | Optional webhook endpoint for contact submissions |

No secrets are required to run the site locally.

## Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Vercel deployment

1. Push this repository to GitHub / GitLab / Bitbucket.
2. Import the project in [Vercel](https://vercel.com).
3. Set environment variables from `.env.example` in the Vercel project settings.
4. Deploy. Vercel will run `npm run build` automatically.

Recommended production env:

- `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app`
- `FORMSPREE_FORM_ID=...` (or `CONTACT_WEBHOOK_URL=...`) when you want live contact delivery

## Content configuration

All personal/content data is centralized and easy to update:

- `data/projects.ts` — projects / case studies
- `data/skills.ts` — technology arsenal
- `data/services.ts` — services
- `data/experience.ts` — journey / experience timeline
- `data/testimonials.ts` — testimonials (section hidden while empty)
- `data/social.ts` — social links (disabled until real URLs are set)
- `data/content.ts` — process, blueprint, why-me content
- `lib/constants.ts` — site metadata and nav

Placeholder projects are clearly labeled. Replace them with verified work before presenting the site as a live portfolio of shipped products.

## Architecture

```text
app/                 # App Router pages, layout, SEO, API
components/          # Section and UI components
data/                # Editable content
lib/                 # Shared utils + constants
public/images/       # Optimized static assets
```

## Notes

- Prefer server components by default; client components are used only for interactivity/animation.
- Contact form includes client validation, accessible labels, loading/success/error states, and honeypot spam protection.
- Custom cursor is desktop-only and disabled for touch / reduced-motion users.
- Testimonials remain hidden until real quotes are added to `data/testimonials.ts`.
