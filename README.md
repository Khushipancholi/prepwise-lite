# 📚 PrepWise AI — Smart Study Planner

> AI-powered study planner built with **Next.js 14**, **Tailwind CSS**, **Supabase**, and **Groq AI**.  
> Students enter a subject, topics, and exam date to receive a personalised day-by-day study schedule — saved automatically to the cloud.

**By [Khushi Hemendrakumar Pancholi](https://github.com/khushipancholi)**  
Capstone Project · Mastering Next.js – Build and Deploy Full-Stack Apps

---

## ✨ Features

- 🤖 **AI Study Plans** — Groq LLM generates structured day-by-day schedules
- 🗄️ **Cloud Storage** — Plans saved to Supabase PostgreSQL automatically
- 📋 **View Saved Plans** — Browse all your plans at `/plans`
- 📱 **Responsive UI** — Mobile-first, clean purple design with Tailwind CSS
- ⚡ **Instant Deployment** — One-click deploy on Vercel

---

## 🛠 Tech Stack

| Layer      | Technology                    |
|------------|-------------------------------|
| Framework  | Next.js 14 (App Router)       |
| Styling    | Tailwind CSS                  |
| Database   | Supabase (PostgreSQL)         |
| AI         | Groq API (llama3-8b-8192)     |
| Deployment | Vercel                        |
| Language   | TypeScript                    |

---

## 🚀 Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/khushipancholi/prepwise-lite.git
cd prepwise-lite
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the Supabase table

Go to [supabase.com](https://supabase.com) → your project → **SQL Editor** → paste and run:

```sql
create table if not exists study_plans (
  id         uuid        primary key default gen_random_uuid(),
  subject    text        not null,
  topics     text        not null,
  exam_date  date        not null,
  plan       text        not null,
  created_at timestamptz default now()
);
```

(The file is also saved at `supabase/schema.sql` in this repo.)

### 4. Add environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in your keys:

```env
GROQ_API_KEY=gsk_your_groq_api_key_here
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Get your keys from:
- **Groq API Key** → [console.groq.com](https://console.groq.com) *(free)*
- **Supabase keys** → Project Settings → API

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## ☁️ Deploy on Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo
3. Add these environment variables in **Vercel → Project Settings → Environment Variables**:
   - `GROQ_API_KEY`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy** ✅

Every `git push` to `main` auto-redeploys via Vercel CI/CD.

---

## 📁 Project Structure

```
prepwise-lite/
├── app/
│   ├── page.tsx              ← Home page (study form)
│   ├── layout.tsx            ← Root layout + navbar + footer
│   ├── globals.css           ← Tailwind base styles
│   ├── plans/
│   │   └── page.tsx          ← Saved plans viewer
│   └── api/
│       └── generate/
│           └── route.ts      ← POST /api/generate (Groq AI + Supabase save)
│
├── components/
│   ├── StudyForm.tsx         ← Subject / Topics / Exam Date form
│   └── PlanCard.tsx          ← Displays a saved plan
│
├── lib/
│   └── supabase.ts           ← Supabase client singleton
│
├── supabase/
│   └── schema.sql            ← SQL to create the study_plans table
│
├── .env.example              ← Template for environment variables
├── .gitignore
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 📄 License

MIT — feel free to use and extend this project.
