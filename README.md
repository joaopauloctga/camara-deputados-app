# camara-deputados-app
The idea here is just to practice react, next, node js and chat gpt 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Configure cache layer [not required] but strongly recommended.

Up all containers, including the Redis container.
```bash
docker compose up -d
```

Create env.local file and added the following variables.
```bash
NEXT_PUBLIC_API_DOMAIN=http://localhost:3000/api/
CAMARA_REDIS_HOST=127.0.0.1
CAMARA_REDIS_PORT=6379 
APPLICATION_CACHE_ENABLED=1 
APPLICATION_CACHE_SERVICE='redis'
```

To disable the cache just set APPLICATION_CACHE_ENABLED to 0

If you want to use another cache server replace the value of APPLICATION_CACHE_SERVICE
But that is not enough, you need to add the implementation of this cache, look at redis.js and cache.js and follow the example.

If you are running the Next application in another port or domain remember to update NEXT_PUBLIC_API_DOMAIN.


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
>>>>>>> ebc286f (Initial commit from Create Next App)
