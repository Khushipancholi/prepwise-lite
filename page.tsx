import { supabase } from '@/lib/supabase'
import PlanCard from '@/components/PlanCard'
import Link from 'next/link'

export const revalidate = 0 // always fetch fresh

export default async function PlansPage() {
  const { data: plans, error } = await supabase
    .from('study_plans')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <p className="text-red-500 text-lg mb-4">⚠️ Could not load plans: {error.message}</p>
        <Link href="/" className="text-purple-600 hover:underline text-sm">
          ← Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-purple-700">My Study Plans</h1>
          <p className="text-gray-400 mt-1 text-sm">
            {plans?.length ?? 0} plan{plans?.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        <Link
          href="/"
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
        >
          ➕ New Plan
        </Link>
      </div>

      {/* Empty state */}
      {!plans || plans.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-purple-200">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-gray-500 text-lg font-medium">No study plans yet.</p>
          <p className="text-gray-400 text-sm mt-1 mb-6">
            Generate your first AI study plan to get started!
          </p>
          <Link
            href="/"
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition text-sm"
          >
            ✨ Create Study Plan
          </Link>
        </div>
      ) : (
        <div>
          {plans.map((plan: any) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}

    </div>
  )
}
