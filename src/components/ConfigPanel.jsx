import { useState } from 'react'

const TYPES = [
  { id: 'multiple_choice', label: 'Multiple choice' },
  { id: 'true_false', label: 'True / False' },
  { id: 'short_answer', label: 'Short answer' },
]

export default function ConfigPanel({ onGenerate, loading, error }) {
  const [topic, setTopic] = useState('')
  const [grade, setGrade] = useState('3-5')
  const [count, setCount] = useState('5')
  const [types, setTypes] = useState(['multiple_choice'])

  function toggleType(id) {
    setTypes(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    )
  }

  function handleSubmit() {
    if (!topic.trim()) return alert('Please enter a topic.')
    if (types.length === 0) return alert('Select at least one question type.')
    onGenerate(topic, grade, count, types)
  }

  return (
    <div style={{ maxWidth: 560, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 24, marginBottom: 4 }}>Quiz Generator</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>AI-powered • Epic Kids style</p>

      <label style={labelStyle}>Topic or passage</label>
      <textarea
        value={topic}
        onChange={e => setTopic(e.target.value)}
        placeholder="e.g. The water cycle, Charlotte's Web chapter 1..."
        style={{ ...inputStyle, height: 80, resize: 'vertical' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
        <div>
          <label style={labelStyle}>Grade level</label>
          <select value={grade} onChange={e => setGrade(e.target.value)} style={inputStyle}>
            <option value="K-2">Kindergarten – Grade 2</option>
            <option value="3-5">Grades 3 – 5</option>
            <option value="6-8">Grades 6 – 8</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Number of questions</label>
          <select value={count} onChange={e => setCount(e.target.value)} style={inputStyle}>
            <option value="3">3 questions</option>
            <option value="5">5 questions</option>
            <option value="8">8 questions</option>
          </select>
        </div>
      </div>

      <label style={labelStyle}>Question types</label>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {TYPES.map(t => (
          <button
            key={t.id}
            onClick={() => toggleType(t.id)}
            style={chipStyle(types.includes(t.id))}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && <p style={{ color: '#D85A30', fontSize: 13, marginBottom: 12 }}>{error}</p>}

      <button onClick={handleSubmit} disabled={loading} style={btnStyle}>
        {loading ? 'Generating…' : 'Generate quiz'}
      </button>
    </div>
  )
}

const labelStyle = { display: 'block', fontSize: 13, color: '#555', marginBottom: 6, fontWeight: 500 }
const inputStyle = { width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #ddd', fontSize: 14, marginBottom: 16, boxSizing: 'border-box' }
const btnStyle = { width: '100%', padding: 12, background: '#1D9E75', color: 'white', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: 'pointer' }
const chipStyle = active => ({
  padding: '6px 14px', borderRadius: 20, fontSize: 13, cursor: 'pointer',
  border: '1px solid', borderColor: active ? '#1D9E75' : '#ddd',
  background: active ? '#E1F5EE' : 'white',
  color: active ? '#0F6E56' : '#555'
})