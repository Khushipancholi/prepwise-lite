'use client'

import { useState } from 'react'

interface PlanResult {
  plan: string
  subject: string
  topics: string
  examDate: string
}

export default function StudyForm() {
  const [subject, setSubject]     = useState('')
  const [topics, setTopics]       = useState('')
  const [examDate, setExamDate]   = useState('')
  const [result, setResult]       = useState<PlanResult | null>(null)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const [saved, setSaved]         = useState(false)

  const today    = new Date().toISOString().split('T')[0]
  const isValid  = subject.trim() && topics.trim() && examDate

  // ── Submit ──────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!isValid) return
    setLoading(true)
    setError('')
    setResult(null)
    setSaved(false)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, topics, examDate }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Something went wrong.')

      setResult({ plan: data.plan, subject, topics, examDate })
      setSaved(data.saved ?? false)
    } catch (e: any) {
      setError(e.message || 'Failed to generate plan. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // ── Reset ────────────────────────────────────────────────────────────────
  const handleReset = () => {
    setSubject(''); setTopics(''); setExamDate('')
    setResult(null); setError(''); setSaved(false)
  }

  return (
    <div className="max-w-2xl mx-auto">

      {/* ── Form card ── */}
      <div className="bg-white rounded-3xl shadow-lg border border-purple-100 p-8">

        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 text-sm font-bold">
            1
          </span>
          Tell us about your exam
        </h2>

        {/* Subject */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Subject <span className="text-purple-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Mathematics, Physics, History…"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
        </div>

        {/* Topics */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Topics to Cover <span className="text-purple-500">*</span>
          </label>
          <textarea
            placeholder="e.g. Algebra, Calculus, Trigonometry, Statistics…"
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition resize-none"
            value={topics}
            onChange={e => setTopics(e.target.value)}
          />
          <p className="text-xs text-gray-400 mt-1">Separate topics with commas</p>
        </div>

        {/* Exam Date */}
        <div className="mb-7">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Exam Date <span className="text-purple-500">*</span>
          </label>
          <input
            type="date"
            min={today}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm
                       focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
            value={examDate}
            onChange={e => setExamDate(e.target.value)}
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !isValid}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300
                     text-white font-semibold py-3.5 rounded-xl transition text-sm
                     flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Generating your plan…
            </>
          ) : (
            '✨ Generate Study Plan'
          )}
        </button>
      </div>

      {/* ── Result card ── */}
      {result && (
        <div className="mt-8 bg-white rounded-3xl shadow-lg border border-green-100 p-8">

          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Your Study Plan</h2>
              <p className="text-sm text-gray-400 mt-1">
                📘 {result.subject} &nbsp;·&nbsp; Exam on{' '}
                {new Date(result.examDate).toLocaleDateString('en-US', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </p>
            </div>
            {saved && (
              <span className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1 rounded-full whitespace-nowrap">
                ✅ Saved
              </span>
            )}
          </div>

          {/* Plan text */}
          <div className="bg-purple-50 rounded-2xl p-6 text-sm text-gray-700 leading-7 whitespace-pre-wrap font-mono border border-purple-100 max-h-[500px] overflow-y-auto">
            {result.plan}
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex gap-3">
            <a
              href="/plans"
              className="flex-1 text-center border border-purple-200 text-purple-700 font-semibold
                         py-2.5 rounded-xl text-sm hover:bg-purple-50 transition"
            >
              📋 View All Plans
            </a>
            <button
              onClick={handleReset}
              className="flex-1 bg-purple-600 text-white font-semibold py-2.5 rounded-xl text-sm hover:bg-purple-700 transition"
            >
              ➕ New Plan
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
