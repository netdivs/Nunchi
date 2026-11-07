This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load Cormorant Garamond and DM Sans.

## Live homepage integrations

The homepage includes three dynamic sections: Google Reviews, Instagram, and
Exclusive Offers. Copy `.env.example` to `.env.local` and fill in the values you
have available. Sections render an honest empty state until their credentials
are connected — no review, rating, or Instagram post is fabricated.

### Google Reviews

Uses the official Google Places API (New) Place Details endpoint and caches the
result for one hour. Set `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID`, and
enable Places API (New) on the key. The API key stays on the server and is only
used by `/api/google-reviews`.

### Instagram Feed

Uses the official Instagram Graph API and caches the result for 30 minutes. Set
`INSTAGRAM_ACCESS_TOKEN` and `INSTAGRAM_USER_ID` for an Instagram
Business/Creator account. The access token stays on the server and is only used
by `/api/instagram`.

### Offers manager

Offers are stored in `data/offers.json` and managed at `/admin/offers`. Set
`ADMIN_PASSWORD` (and preferably `ADMIN_SESSION_SECRET`) to enable the manager.
Expired or unpublished offers are automatically hidden from the homepage and
`/offers`. Both pages revalidate every five minutes, and admin actions refresh
them immediately. For serverless deployments, set `OFFERS_FILE` to a persistent
writable path or replace the storage adapter in `src/lib/offers.ts` with a
database/CMS.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
