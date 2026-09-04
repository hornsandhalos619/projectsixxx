# Project SiXXX

House site. Est. in Darkness. Next.js App Router at this folder.

Open in GitHub Desktop, publish to hornsandhalos619/projectsixxx, attach **Vercel** to projectsixxx.com. Prefer Vercel over GitHub Pages for this app (SSR, Auth.js, env secrets).

Copy `.env.example` to `.env.local`. Install dependencies, then run the Next production build before you push.

Stack now: **Next.js + Auth.js**. Optional **Supabase** later for leads/roster — not required for G3. No fake payments / no Stripe on Library.

Add posts in `content/journal`. Add artists in `lib/artists.ts`. Add affiliates in `config/affiliates.ts` only. Library titles live in `lib/library.ts`. Resource hub: `/links`. Marketing kit: `/studio` + `content/ads.md`.

## Environment

Keys in `.env.example`:

- Auth: `AUTH_SECRET` `AUTH_URL` `AUTH_GOOGLE_*` `AUTH_TWITTER_*` `AUTH_EMAIL_*` `FOUNDER_EMAILS` `AUTH_DEMO` `AUTH_DEMO_PASSWORD`
- Leads: `LEADS_ENDPOINT` `LEADS_API_KEY` `LEADS_LIST_ID`
- Affiliates: `AFFILIATE_TAG_AMAZON` `AFFILIATE_TAG_SWEETWATER` `AFFILIATE_TAG_THOMANN` `AFFILIATE_TAG_B_AND_H`
- Shop outbound placeholders: `SHOPIFY_URL` `SPREADSHOP_URL` (empty = card only; never invent live URLs)
- Portal live URL: `HORNS_AND_HALOS_URL` (empty = internal `/horns-and-halos`; when set, “Enter / Cross the Threshold” CTAs open it in a new tab)

Founder is seeded only from `FOUNDER_EMAILS`. First signup is never Founder. No role switcher. Wrong admin role is a hidden not-found, not a 403.

## Member tiers (public labels) vs console roles

**One role system for consoles:** Founder · Blog Admin · Shop Admin · Member.

**Public Member progression labels** (display only — no admin doors):

Initiate → Acolyte → Adept → Founder

- Default signed-in Member displays as **Initiate**.
- Console Founder also shows **Founder** on the public ladder.
- Do **not** map Acolyte / Adept to Blog Admin or Shop Admin. Labels never open consoles.

## Shop hub (`/shop`)

Three lanes:

1. Affiliate catalog (existing guitars etc. + SEO leads)
2. Shopify outbound card (`SHOPIFY_URL`)
3. Spreadshop outbound card (`SPREADSHOP_URL`)

Config: `config/shops.ts`.

## Library (`/library`)

On-site e-book / reading library. SAMPLE titles with `/library/[slug]` detail and `/library/[slug]/sample` local reader. No fake payments.

## Links (`/links`)

Community (homeless-support) + research (public-source literacy only). Wired from journal community/research shelves and the footer.

## House rules

Vein Art / Gatekeeper / Night Architect locks stand. Gild is house punctuation only and never on the portal page. Silver is portal metal. Blood ember and gild are never running text. Portal SVG lives at `public/portal-gates.svg`. No sacred symbols. No living-artist copies. No paid kits. No secrets in the tree. Seven pillars: art, music, film, literature, fashion, technology, frontier AI.

## Desktop publish

1. GitHub Desktop, Add Local Repository, this folder.
2. Create a repository in Desktop if needed. No remote credentials on the CLI.
3. Publish to hornsandhalos619/projectsixxx.
4. Import that repo in **Vercel** (preferred). Build is the Next production build. Add domain projectsixxx.com. Paste env keys. Empty placeholders are safe.
