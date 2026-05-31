export default function QuestionCard({ question, index, answer, onAnswer, submitted }) {
  const { id, type, question: text, options, correct, explanation } = question
  const mcLabels = ['A', 'B', 'C', 'D']

  function getOptionStyle(opt, i) {
    const base = { ...optionStyle }
    if (!submitted) {
      if (answer?.value === opt) return { ...base, borderColor: '#1D9E75', background: '#E1F5EE' }
      return base
    }
    const label = type === 'multiple_choice' ? mcLabels[i] : opt
    if (label === correct || opt === correct) return { ...base, borderColor: '#1D9E75', background: '#E1F5EE' }
    if (answer?.value === opt && label !== correct && opt !== correct)
      return { ...base, borderColor: '#D85A30', background: '#FAECE7' }
    return base
  }

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <div style={numStyle}>{index + 1}</div>
        <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.4 }}>{text}</div>
      </div>

      {type === 'short_answer' ? (
        <input
          placeholder="Type your answer here…"
          disabled={submitted}
          style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box' }}
        />
      ) : (
        options.map((opt, i) => (
          <div
            key={i}
            onClick={() => !submitted && onAnswer(id, opt)}
            style={getOptionStyle(opt, i)}
          >
            {type === 'multiple_choice' && (
              <span style={{ color: '#888', fontSize: 13, marginRight: 6 }}>{mcLabels[i]}.</span>
            )}
            {opt}
          </div>
        ))
      )}

      {submitted && explanation && (
        <div style={{ marginTop: 10, padding: '8px 12px', borderRadius: 8, background: '#E1F5EE', color: '#0F6E56', fontSize: 13 }}>
          {explanation}
        </div>
      )}
    </div>
  )
}

const cardStyle = { background: 'white', border: '1px solid #e5e7eb', borderRadius: 12, padding: '1.25rem', marginBottom: 12 }
const numStyle = { minWidth: 24, height: 24, borderRadius: '50%', background: '#E1F5EE', color: '#0F6E56', fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }
const optionStyle = { display: 'flex', alignItems: 'center', padding: '8px 12px', borderRadius: 8, border: '1px solid #e5e7eb', marginBottom: 8, cursor: 'pointer', fontSize: 14, transition: 'border-color 0.15s' }