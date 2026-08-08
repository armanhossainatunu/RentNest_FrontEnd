# RentNest Frontend

RentNest is a modern rental marketplace frontend built with **Next.js 16**, **React 19**, **Tailwind CSS 4**, and a shadcn-inspired UI component system.

The app supports public property listings, tenant and landlord dashboards, admin management features, authentication, payments, and review workflows.

## Key Features

- Authentication pages for login and registration
- Dashboard support for tenants, landlords, and admins
- Property listing pages with detail views
- Payment flow including success/cancel routes
- Admin tables for users, rentals, payments, and properties
- Recharts-based revenue charts and analytics
- Mobile-friendly responsive UI with shadcn and Radix components

## Project Stack

- Next.js 16.2.10
- React 19.2.4
- TypeScript
- Tailwind CSS 4
- Radix UI
- Recharts
- Axios
- Sonner notifications
- Theme support via `next-themes`

## Folder Structure

- `app/` - Next.js App Router pages and layouts
- `components/` - shared UI components and design system primitives
- `hooks/` - custom React hooks
- `lib/` - application interfaces, types, and utility functions
- `service/` - API helpers for authentication and token refresh
- `public/` - static assets

## Setup

Install dependencies using pnpm:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open the app in your browser at:

```text
http://localhost:3000
```

## Available Scripts

- `pnpm dev` - Run the development server
- `pnpm build` - Build the production application
- `pnpm start` - Start the production server after build
- `pnpm lint` - Run ESLint

## Notes

- The app uses the Next.js App Router with nested layouts and route groups.
- Authentication and dashboard actions are organized inside `app/(authGroup)` and `app/(dashboardGroup)`.
- The `publicGroup` routes contain the public-facing property listings and review flows.
- Payment integration routes live under `app/(paymentGroup)`.

## Deployment

Build the app and deploy to your hosting provider. For Vercel, use the standard Next.js deployment flow.

```bash
pnpm build
pnpm start
```

## Contact

For help or additional setup details, review the application route structure in `app/` and the API helpers in `service/`.
