import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: NextRequest) {
  try {
    const { subject, topics, examDate } = await req.json()

    // ── Validate ──────────────────────────────────────────────────────────
    if (!subject?.trim() || !topics?.trim() || !examDate) {
      return NextResponse.json(
        { error: 'subject, topics, and examDate are all required.' },
        { status: 400 }
      )
    }

    const today    = new Date()
    const exam     = new Date(examDate)
    const daysLeft = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    if (daysLeft <= 0) {
      return NextResponse.json(
        { error: 'Exam date must be in the future.' },
        { status: 400 }
      )
    }

    // ── Build prompt ──────────────────────────────────────────────────────
    const prompt = `
You are an expert academic tutor and study coach.
Create a detailed, realistic, day-by-day study plan for the student below.

Student details:
- Subject    : ${subject}
- Topics     : ${topics}
- Exam date  : ${examDate}
- Days left  : ${daysLeft}

Rules:
1. Cover every topic listed, spread evenly across ${daysLeft} days.
2. Start with foundational/easier topics; move to harder ones in the middle.
3. Keep the last 1–2 days for full revision and practice tests.
4. For each day include:
   • Topic(s) to study
   • Clear daily goals
   • Recommended techniques (flashcards, past papers, mind maps, etc.)
   • Estimated study hours (assume 3–5 h/day)
5. Use "Day 1:", "Day 2:" … as headings. Use bullet points inside each day.
6. End with a short motivational note.

Generate the complete plan now:
`

    // ── Call Groq ─────────────────────────────────────────────────────────
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful, expert academic study coach. Always structure plans with clear Day X: headings and bullet points.',
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    })

    const plan = completion.choices[0]?.message?.content ?? 'No plan generated.'

    // ── Save to Supabase ──────────────────────────────────────────────────
    const { error: dbError } = await supabase.from('study_plans').insert({
      subject,
      topics,
      exam_date: examDate,
      plan,
    })

    if (dbError) {
      console.error('Supabase error:', dbError.message)
      // Return plan even if DB save fails
      return NextResponse.json({ plan, saved: false })
    }

    return NextResponse.json({ plan, saved: true })

  } catch (err: any) {
    console.error('API route error:', err)
    return NextResponse.json(
      { error: err.message ?? 'Internal server error.' },
      { status: 500 }
    )
  }
}
