# ChairFill Pricing Website

Clean one-page pricing website for ChairFill, built as a React + Vite + Tailwind CSS app.

The site includes a SaaS-style hero, pricing cards, an interactive call-filtering demo, a how-it-works section, and final demo CTA. There is no backend, login, database, or external integration required.

## Project Files

```text
index.html
package.json
src/
  App.tsx
  main.tsx
  styles.css
  components/
    CallDemo.tsx
    PricingCard.tsx
tsconfig.json
vite.config.ts
vercel.json
```

## Run Locally

Install dependencies:

```bash
npm install
```

Start the Vite dev server:

```bash
npm run dev
```

Open the local URL Vite prints, usually:

```text
http://localhost:5173
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deploy On Vercel

1. Push this project to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and choose `Add New Project`.
3. Import the repository.
4. Vercel should detect Vite automatically. If you need to set it manually:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Click `Deploy`.

The included [`vercel.json`](/Users/maddext/Documents/New%20project/vercel.json) also sets the build command and output directory for Vercel.

## Connect chairfill.co On Vercel

1. Open the deployed Vercel project.
2. Go to `Settings` -> `Domains`.
3. Add `chairfill.co`.
4. Follow Vercel's DNS instructions at your domain registrar.
5. Wait for DNS propagation and confirm Vercel shows the domain as valid.

## Book Demo / Calendly Link

All demo and pricing CTA buttons currently point to:

```text
https://calendly.com/maddexternes-chairfill-demo/chairfill-front-desk-demo
```

To change it later, update the `demoUrl` constant in [`src/App.tsx`](/Users/maddext/Documents/New%20project/src/App.tsx).
