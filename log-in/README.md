# Login with MetaMask

This demo is published as part of the corresponding blog article: ["One-Click Login with Blockchain: a MetaMask Tutorial"](https://www.toptal.com/ethereum/one-click-login-flows-a-metamask-tutorial).


## Live Demo: https://amaurym.com/login-with-metamask-demo/

![demo](https://uploads.toptal.io/blog/image/125794/toptal-blog-image-1522395423193-b3227ea1f43c6cbb9f78e090bd7bb2ee.gif)

## Getting Started

There are 2 packages in this repo: a [`backend`](./packages/backend) which is a REST API written in Express, and a [`frontend`](./packages/frontend) which is a React single-page application. It's really a demo, so I tried to use as few libraries as possible, and the most popular ones when possible.

Start the demo using Yarn:

From the root folder of this repo, run

```bash
yarn install # Install root dependencies (for TS & linting in your IDE)
cd packages/backend && yarn install # Install backend packages
cd ../frontend && yarn install # Install frontend packages
cd ../.. # Go back to root folder
yarn start # Will launch the frontend and the backend at the same time
```

The backend should be running on `localhost:8000`, and the frontend on `localhost:3000`.

Alternatively, you can start the frontend and the backend separately:

```bash
# Start the backend
cd packages/backend
yarn start

# Start the frontend
cd packages/frontend
yarn start
```

## Tests

Since this project is a demo, I haven't written any tests for it. Only code linting is performed, via eslint and prettier, which you can run using `yarn lint`.


