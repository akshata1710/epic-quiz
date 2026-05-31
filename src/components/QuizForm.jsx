import { useState } from 'react'
import QuestionCard from './QuestionCard'
import ScoreBanner from './ScoreBanner'

export default function QuizForm({ quiz, onReset }) {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleAnswer(id, value) {
    setAnswers(prev => ({ ...prev, [id]: { value } }))
  }

  function handleSubmit() {
    setSubmitted(true)
  }

  const scoreable = quiz.questions.filter(q => q.type !== 'short_answer')
  const correct = scoreable.filter(q => {
    const ans = answers[q.id]
    if (!ans) return false
    if (q.type === 'true_false') return ans.value === q.correct
    const labels = ['A', 'B', 'C', 'D']
    const idx = q.options.indexOf(ans.value)
    return labels[idx] === q.correct
  }).length

  return (
    <div style={{ maxWidth: 560, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ fontSize: 20, marginBottom: 4 }}>{quiz.title}</h2>
      <p style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>{quiz.description}</p>

      {quiz.questions.map((q, i) => (
        <QuestionCard
          key={q.id}
          question={q}
          index={i}
          answer={answers[q.id]}
          onAnswer={handleAnswer}
          submitted={submitted}
        />
      ))}

      {!submitted ? (
        <button onClick={handleSubmit} style={{ width: '100%', padding: 12, background: '#1D9E75', color: 'white', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
          Submit answers
        </button>
      ) : (
        <ScoreBanner correct={correct} total={scoreable.length} onReset={onReset} />
      )}
    </div>
  )
}