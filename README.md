# Kairo + MicroCRM

Marketing site (automation agents) + MicroCRM — one command.

## Start

```bash
npm install
npm run dev
```

Open **http://localhost:3000**

| Page | URL |
|------|-----|
| Marketing + agents | http://localhost:3000 |
| Agents section | http://localhost:3000/#agents |
| CRM login | http://localhost:3000/login |

### Demo login (ready now — no Supabase)

Password for all: **`demo123`**

| Email | Role |
|-------|------|
| `admin@kairo.ai` | Admin |
| `sales@kairo.ai` | Sales |
| `accounting@kairo.ai` | Accounting |

**Note:** First open of `/login` after `npm run dev` can take ~20–30s (compile on this drive). Refresh after that — it should load in under 1–2s.

## Optional: production Supabase / Stripe / Resend

Copy `.env.example` → `.env.local` and fill keys. Until then, demo mode runs locally.
