# pantry-web

Web interface for [pantry-api](https://github.com/nickelghost/pantry-api), my personal grocery inventory tracker.

It's a quick and dirty app that's not supposed to reflect the best practices, since I'm not a web **app** developer.

Built with SvelteKit and Firebase Auth.

## Features

- Google sign-in (or email/password locally)
- Create, edit, move, and delete pantry items
- Organize items into locations
- Tag items and filter by tag
- Expiry date warnings

## Setup

1. Install dependencies:

   ```sh
   pnpm install
   ```

2. Create a `.env` file with your Firebase and API config:

   ```env
   FIREBASE_API_KEY=...
   FIREBASE_AUTH_DOMAIN=...
   FIREBASE_PROJECT_ID=...
   API_URL=https://api.pantry.example.com
   ```

3. Start the dev server:

   ```sh
   pnpm dev
   ```

   On localhost, sign-in uses email/password. On production, Google sign-in is used.

## Build

```sh
pnpm build
```

Outputs a static site to `build/`, deployable via Firebase Hosting or any static host.

## Other commands

```sh
pnpm check     # type-check
pnpm lint      # lint + format check
pnpm format    # auto-format
```
