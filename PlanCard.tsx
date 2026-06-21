interface Plan {
  id: string
  subject: string
  topics: string
  exam_date: string
  plan: string
  created_at: string
}

export default function PlanCard({ plan }: { plan: Plan }) {
  const examDate = new Date(plan.exam_date).toLocaleDateString('en-US', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const createdAt = new Date(plan.created_at).toLocaleDateString('en-US', {
    day: 'numeric', month: 'short', year: 'numeric',
  })

  const daysLeft = Math.ceil(
    (new Date(plan.exam_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  )

  return (
    <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-6 mb-6 hover:shadow-lg transition">

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-purple-700">{plan.subject}</h3>
          <p className="text-xs text-gray-400 mt-0.5">Generated on {createdAt}</p>
        </div>
        <div className="text-right shrink-0 ml-4">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              daysLeft > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'
            }`}
          >
            {daysLeft > 0 ? `${daysLeft} days left` : 'Exam passed'}
          </span>
          <p className="text-xs text-gray-400 mt-1">📅 {examDate}</p>
        </div>
      </div>

      {/* Topic chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {plan.topics.split(',').map((t, i) => (
          <span
            key={i}
            className="text-xs bg-purple-50 text-purple-600 px-2.5 py-1 rounded-full border border-purple-100"
          >
            {t.trim()}
          </span>
        ))}
      </div>

      {/* Collapsible plan */}
      <details className="group">
        <summary className="cursor-pointer text-sm font-semibold text-purple-600 hover:text-purple-800 transition list-none flex items-center gap-1.5 select-none">
          <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
          View Full Study Plan
        </summary>
        <div className="mt-4 bg-purple-50 rounded-xl p-4 text-sm text-gray-700 leading-7 whitespace-pre-wrap font-mono border border-purple-100 max-h-[400px] overflow-y-auto">
          {plan.plan}
        </div>
      </details>
    </div>
  )
}
