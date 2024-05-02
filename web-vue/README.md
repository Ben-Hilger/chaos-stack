# Nuxt for Chaos Stack
  
This directory holds the Nuxt enviroment used in the chaos stack. Current capabilities include:
1. Web App
2. Server-side API (coming soon)

Interested in learning about nuxt? Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

If you would like to build and view the project below, please follow the setup instructions

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Required Environment Variables: `NUXT_PUBLIC_EXPRESS_API_BASE`
* This should point to the server running in the `api-express` directory
## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```
