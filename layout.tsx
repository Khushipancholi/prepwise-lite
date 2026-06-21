import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PrepWise AI — Smart Study Planner',
  description:
    'AI-powered study planner. Enter your subject, topics, and exam date to get a personalized schedule.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">

        {/* ── Navbar ── */}
        <nav className="bg-white border-b border-purple-100 shadow-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span className="text-xl font-bold text-purple-700">PrepWise AI</span>
            </a>
            <div className="flex gap-6">
              <a href="/" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition">
                Home
              </a>
              <a href="/plans" className="text-sm font-medium text-gray-600 hover:text-purple-700 transition">
                My Plans
              </a>
            </div>
          </div>
        </nav>

        {/* ── Page content ── */}
        <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>

        {/* ── Footer ── */}
        <footer className="mt-16 border-t border-purple-100 bg-white py-6 text-center text-sm text-gray-400">
          PrepWise AI &nbsp;·&nbsp; Built by{' '}
          <a
            href="https://github.com/khushipancholi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-500 hover:underline"
          >
            Khushi Pancholi
          </a>
          &nbsp;·&nbsp; Next.js · Supabase · Groq AI · Vercel
        </footer>
      </body>
    </html>
  )
}
