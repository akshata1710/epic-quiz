export default function ScoreBanner({ correct, total, onReset }) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0
  const msg = pct >= 80 ? 'Amazing work!' : pct >= 50 ? 'Good effort!' : 'Keep reading!'

  return (
    <div style={{ background: '#E1F5EE', border: '1px solid #5DCAA5', borderRadius: 12, padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 16, marginTop: 16 }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'white', border: '2px solid #1D9E75', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: '#0F6E56' }}>{pct}%</span>
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: 500, color: '#0F6E56', margin: 0 }}>{msg}</p>
        <p style={{ fontSize: 13, color: '#0F6E56', margin: 0 }}>{correct} of {total} correct</p>
      </div>
      <button onClick={onReset} style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #1D9E75', background: 'white', color: '#0F6E56', cursor: 'pointer', fontSize: 13 }}>
        New quiz
      </button>
    </div>
  )
}