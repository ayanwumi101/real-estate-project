# Deployment Instructions for This Next.js Application

This guide provides steps to deploy this Next.js application to hosting platforms.

## 1. Vercel
Vercel is the recommended platform for deploying Next.js apps.

1. Sign in to [Vercel](https://vercel.com/).
2. Click on **New Project** and import your Next.js repository.
3. Configure your project settings if needed.
4. Click **Deploy**.  
  Vercel will automatically build and deploy your app.

## 2. Netlify
1. Sign in to [Netlify](https://www.netlify.com/).
2. Click **Add New Site** > **Import an Existing Project**.
3. Connect your Git repository.
4. Set the build command to `pnpm run build` and the publish directory to `.next`.
5. Click **Deploy Site**.

## 3. AWS Amplify
1. Sign in to [AWS Amplify](https://aws.amazon.com/amplify/).
2. Click **Get Started** under "Deploy".
3. Connect your Git repository.
4. Configure the build settings (Amplify detects Next.js automatically).
5. Click **Save and Deploy**.

## 4. Custom Server (e.g., DigitalOcean, Heroku)
1. Install Dependencies:
  ```bash
  pnpm install
  ```
2. Build the app locally:
  ```bash
  pnpm run build
  ```
3. Start the app:
  ```bash
  pnpm run dev
  ```

## Environment Variables
NEXT_PUBLIC_API_BASE_URL=https://staging.vestiers.ng/api/v1
