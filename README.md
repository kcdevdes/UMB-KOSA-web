# KOSA - UMass Boston Korean Student Association

Official repository for the UMass Boston Korean Student Association (KOSA) website. The site helps current and prospective members stay informed about events, leadership, and community initiatives.

🌐 Live site: [https://umbkosa.org](https://umbkosa.org)

## Overview

KOSA connects Korean students and the broader UMass Boston community through cultural programming and student support. The website delivers:

- Multilingual pages (English & Korean) powered by `next-intl`
- Static overviews of the executive board, mission, and featured programs
- A contact form that routes messages to the team’s shared inbox
- Instagram-powered highlights on the Story page (via the Graph API)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript + React 19
- **Styling**: Tailwind CSS with custom design tokens
- **Internationalization**: next-intl with locale-aware routing under `app/[locale]/`
- **Email Delivery**: Nodemailer with SMTP transport

## Project Structure

```
app/
├─ layout.tsx                 # Root layout (font, metadata)
├─ [locale]/                  # Locale-aware routes (en, ko)
│  └─ (routes)/               # Actual pages (home, about, contact, story...)
components/                   # Reusable UI building blocks
lib/email/                    # Nodemailer helpers
public/locales/               # Translation JSON files
```

## Getting Started

### Prerequisites

- Node.js 20 (LTS) or newer
- npm 10+
- SMTP credentials for the contact form
- Instagram Graph API access token (optional, for Story page content)

### Installation

```bash
git clone https://github.com/kcdevdes/UMB-KOSA-web.git
cd UMB-KOSA-web
npm install
npm run dev
```

Create a `.env.local` file in the project root and populate it with the environment variables listed below.

The development server runs at [http://localhost:3000](http://localhost:3000). Use the locale prefix in URLs, e.g. `/en/about` or `/ko/contact`.

### Available Scripts

- `npm run dev` – Start the development server (Turbopack)
- `npm run build` – Create an optimized production build (SSG + ISR)
- `npm run start` – Serve the production build
- `npm run lint` – Run the Next.js ESLint ruleset

## Environment Variables

Add these to `.env.local` (do not commit this file). Variables marked **required** must be present for production.

| Variable | Required | Description |
| --- | --- | --- |
| `CONTACT_RECEIVER_EMAIL` | ✅ | Destination inbox for contact form submissions |
| `CONTACT_FROM_EMAIL` | ➖ | Custom "from" address (defaults to `SMTP_USER`) |
| `SMTP_HOST` | ✅ | SMTP server host name |
| `SMTP_PORT` | ✅ | SMTP port (e.g. 587 for TLS) |
| `SMTP_USER` | ✅ | SMTP auth user / email |
| `SMTP_PASS` | ✅ | SMTP auth password or app password |
| `SMTP_SECURE` | ➖ | Set to `true` when using port 465 |

> Tip: For local development, you can use services like [Mailtrap](https://mailtrap.io/) or [Ethereal](https://ethereal.email/) to test SMTP without sending real emails.

## Localisation Workflow

- Translation files live in `public/locales/en.json` and `public/locales/ko.json`.
- Use the same key paths across locales. New pages should load translations via `getTranslations('<namespace>')` or `useTranslations('<namespace>')`.
- To add another language, add its code to `locales` in `i18n.ts`, create the new JSON file in `public/locales`, and update navigation labels.

## Deployment

1. Run `npm run build` to verify the project bundles successfully.
2. Deploy to any platform that supports Node.js and Next.js (e.g. Vercel, Netlify, Render).
3. Ensure all required environment variables are configured in the hosting provider.

The build uses static site generation for all routes and supports Incremental Static Regeneration (ISR) on data-dependent endpoints like the Instagram feed.

## Contributing

We welcome contributions from KOSA members and the wider community:

1. Fork the repository and create a topic branch.
2. Add or update tests if you introduce new logic.
3. Open a pull request describing your changes. Screenshots or video clips are appreciated for UI updates.

## Contact

Questions or partnership ideas? Email <gibeom.choi001@umb.edu> or connect with us on Instagram [@umbkosa](https://www.instagram.com/umbkosa).

© 2025 KOSA - UMass Boston Korean Student Association. All rights reserved.

## Changelog

- **2.0.2** – Localization refresh, new App Router architecture, updated contact form pipeline
- **2.0.1 (2025-08-30)** – Design renewal
- **1.0.0 (2025-03-30)** – Initial release
