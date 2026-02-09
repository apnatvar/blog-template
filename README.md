# AP Blog Template

A production-ready starter template for building a **portfolio website with a blog**, powered by:

- Next.js (App Router)
- PayloadCMS
- Tailwind CSS
- Shadcn UI
- GSAP
- Docker + Docker Compose
- Nginx

This template is structured for speed, clarity, and deployment-readiness. It is preconfigured so you can start building immediately.

---

## What This Template Includes

### Core Stack

| Tool         | Version |
| ------------ | ------- |
| Next.js      | 16.1.6  |
| React        | 19.2.3  |
| PayloadCMS   | 3.75.0  |
| Tailwind CSS | 4.x     |
| Shadcn       | 3.8.4   |
| GSAP         | 3.14.2  |
| Lenis        | 1.3.17  |
| TypeScript   | 5.x     |

---

### Database Flexibility

This template supports:

- SQLite
- MongoDB
- PostgreSQL

Switching databases is handled inside `payload.config.ts` using your `getDB` function.

You only need to change:

- `DB_PROVIDER`

Recommended usage:

- SQLite → development
- MongoDB or PostgreSQL → production

No structural changes required.

---

### Infrastructure Ready

- Dockerfile included
- Docker Compose included
- Nginx reverse proxy starter configuration included
- Sample `.env` file variables in this README
- Payload preconfigured and ready
- Project structure intentionally organized

Note: File organization differs from a fresh Payload scaffold. Do not move Payload-related files unless you understand the internal resolution chain. Changing locations will break imports and config resolution.

---

## Sample .env Configuration

Create a file named:

- `.env`

Use the following template:

PAYLOAD_SECRET=long-ungesssable-alphanumeric
NEXT_PUBLIC_SERVER_URL=http://domain.tld

DB_PROVIDER=sqlite

SQLITEDB=domain

NGINX_CONTAINER_NAME=domain-nginx
APP_CONTAINER_NAME=domain-app

MONGO_INITDB_ROOT_PASSWORD=random-strong-string-123456789
MONGO_INITDB_ROOT_USERNAME=domain_user
MONGO_PASSWORD=testing53
MONGO_DATABASE=domain-mongo

FIRST_USER_USERNAME=domain-admin
FIRST_USER_PASSWORD=123
FIRST_USER_ROLE=admin

POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=domain-postgres
POSTGRES_USER=domain_user
POSTGRES_PASSWORD=random-strong-string-123456789

---

## Development Setup (SQLite Recommended)

Install dependencies:

- npm install --legacy-peer-deps

Run development server:

- npm run dev

Open:

- http://localhost:3000

SQLite is ideal for local development. It requires no external service.

---

## Production Setup (Docker + Mongo/Postgres)

If you are deploying with a Docker container make sure that output is set to standalone in next.config.ts. For deploying this page to vercel the configuations had to be changed.

Ensure your `.env` file is configured.

Then build and start containers:

- docker compose up --build -d
- or build first with docker compose build --no-cache
- then run docker compose up -d

To stop:

- docker compose down

For production usage:

- Set `DB_PROVIDER=mongo` or `DB_PROVIDER=postgres`
- Configure database credentials accordingly
- Set a strong `PAYLOAD_SECRET`
- Set correct `NEXT_PUBLIC_SERVER_URL`

---

## Database Switching

Your `payload.config.ts` uses a `getDB` function to switch between:

- SQLite
- MongoDB
- PostgreSQL

This allows you to:

- Develop locally with SQLite
- Deploy production using MongoDB or PostgreSQL
- Avoid rewriting connection logic

Only change environment variables. Do not modify the adapter logic.

---

## First Admin User

The following variables control the initial user:

- FIRST_USER_USERNAME
- FIRST_USER_PASSWORD
- FIRST_USER_ROLE

Adjust before first production deployment.

---

## Nginx Reverse Proxy

A basic Nginx configuration is included.

It:

- Proxies traffic to the Next.js app container
- Provides a clean starting point for TLS setup
- Keeps your app container private

You can expand it later with:

- TLS
- SSL certificates
- Rate limiting
- Security headers
- Caching rules

---

## Project Philosophy

This template is:

- Production-oriented
- Deployment-ready
- CMS-first
- Flexible in database choice

---

## Recommended Workflow

Development:

- SQLite
- npm run dev

Production:

- MongoDB or PostgreSQL
- Docker Compose
- Reverse proxy with Nginx
- Proper domain + SSL

---

## Important Notes

1. Do not relocate Payload config files unless necessary.
2. Do not mix database drivers in production.
3. Always use a strong `PAYLOAD_SECRET`.
4. Always secure your database credentials.

Also: Changing file locations for Payload will be troublesome. It is strongly recommended you leave the Payload files where they are in this template.

---

## Quick Start Summary

git clone <repo>
cd <repo>
npm install
cp .env.example .env
npm run dev

Or for containers:
docker compose up --build -d

---

## Final Notes

This is a structured foundation for:

- Portfolio websites
- Personal brands
- Thought leadership blogs
- CMS-driven static/SSR hybrids
