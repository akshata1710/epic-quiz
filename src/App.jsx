import { useState } from 'react'
import ConfigPanel from './components/ConfigPanel'
import QuizForm from './components/QuizForm'
import { generateQuiz } from './api'

function App() {
  const [step, setStep] = useState('config')
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleGenerate(topic, grade, count, types) {
    setLoading(true)
    setError('')
    try {
      const data = await generateQuiz(topic, grade, count, types)
      setQuiz(data)
      setStep('quiz')
    } catch (e) {
      setError('Could not generate quiz. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {step === 'config' && (
        <ConfigPanel onGenerate={handleGenerate} loading={loading} error={error} />
      )}
      {step === 'quiz' && (
        <QuizForm quiz={quiz} onReset={() => setStep('config')} />
      )}
    </div>
  )
}

export default App