This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

If you're using Visual Studio Code, install [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for automatically formating code on saving,
configuration is saved in `./vscode/settings.json`

First, enable `husky` with

```bash
yarn husky install
```

Then run the development server by

```bash
npm run dev
# or
yarn dev
```

Or you could start development server by using `Debug: Start debugging` with Visual Studio Code, configuration is saved in `./vscode/launch.json`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

Deployment is automatically by [Vercel](https://vercel.com/upatra/fulfillable

Any new commit to `main` branch will trigger new [production release](https://thefulfillable.vercel.app)

After Team trial plan, we need to use Vercel CLI to force trigger a production build by

![Force Build Vercel](https://i.gyazo.com/0250e5a5669f0f2c5940ac28b4e7c83c.jpg)

## Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
