# ISHTOP.UZ — Freelance Marketplace for Uzbekistan

A production-ready freelance and service marketplace tailored for Uzbekistan, built with **React 18 + TypeScript + Vite + Tailwind CSS + Supabase (PostgreSQL + RLS)**.

## Key Features & Production Rules

- **SOATO Uzbekistan Hierarchy**: Official location classifier dataset for all 14 top-level regions (12 Viloyats + Republic of Karakalpakstan + Tashkent City as separate region) and 200+ districts with cascading selection.
- **Strict Non-Admin Public Job Block**: Normal users and freelancers CANNOT publish public jobs (enforced via PostgreSQL RLS policies). Clicking "E'lon joylashtirish" opens an admin contact & 50%/50% policy guide modal with Telegram (`https://t.me/+998773879545`) + Email support, or option to submit a private project request (`REQUESTED` status).
- **13-State Project State Machine**: Enforces strict transitions from `REQUESTED` through payment verifications to `COMPLETED`.
- **50% / 50% Money Security**: Amounts stored as integer UZS so'm (`BIGINT`), avoiding floating-point rounding drift.
- **Private Payment Receipts**: Receipts uploaded to private `payment-receipts` bucket, accessible only via uploader/admin signed URLs.
- **Ratings & Verified Reviews**: Single review per completed project (`project_id` unique constraint), auto-recalculating average rating.

## Tech Stack

- **Frontend**: React 18, TypeScript 5, Vite 5, Tailwind CSS 3
- **Data Layer**: TanStack Query v5, Supabase Client v2
- **Validation**: React Hook Form + Zod
- **Testing**: Vitest (8 unit & policy tests passing)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your Supabase project credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
SUPABASE_DB_URL=postgres://postgres:password@host:5432/postgres
VITE_TELEGRAM_PHONE=+998773879545
VITE_SUPPORT_EMAIL=support@ishtop.uz
```

### 3. Setup Database & Seed Data

```bash
npm run db:setup
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Run Unit & Security Tests

```bash
npx vitest run
```

### 6. Production Build

```bash
npm run build
```

## Demo Logins (Password for all: `Admin123!` or `User123!`)

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@ishtop.uz` | `Admin123!` |
| Client | `client1@ishtop.uz` | `User123!` |
| Freelancer | `dev1@ishtop.uz` | `User123!` |