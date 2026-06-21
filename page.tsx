import StudyForm from '@/components/StudyForm'

export default function HomePage() {
  return (
    <div>

      {/* ── Hero ── */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-3">
          Smart Study Planner ✨
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed">
          Enter your subject, topics, and exam date. Our AI will build a
          personalised day-by-day study schedule just for you.
        </p>
      </div>

      {/* ── Feature badges ── */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {[
          { icon: '🤖', label: 'AI-Powered' },
          { icon: '📅', label: 'Day-by-Day Plan' },
          { icon: '🗄️', label: 'Saved to Cloud' },
          { icon: '⚡', label: 'Instant Results' },
        ].map(({ icon, label }) => (
          <span
            key={label}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-purple-100 text-purple-700 text-sm font-medium rounded-full"
          >
            {icon} {label}
          </span>
        ))}
      </div>

      {/* ── Form ── */}
      <StudyForm />
    </div>
  )
}
