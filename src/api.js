export async function generateQuiz(topic, grade, count, types) {
  const prompt = `You are a curriculum designer for Epic Kids, a children's reading platform.
Create a quiz for grade level ${grade} on the topic: "${topic}".
Generate exactly ${count} questions using ONLY these types: ${types.join(', ')}.

Respond ONLY with a JSON object (no markdown, no backticks) in this exact shape:
{
  "title": "Quiz title here",
  "description": "One sentence describing the quiz",
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "question": "Question text?",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correct": "A",
      "explanation": "Brief explanation"
    }
  ]
}

Rules:
- Multiple choice has exactly 4 options labeled A, B, C, D
- True/False has exactly 2 options: "True", "False"
- Short answer has empty options array
- correct field: for MC use the letter only (A/B/C/D), for TF use "True" or "False"
- Return ONLY the JSON, nothing else`;

  const res = await fetch('/api/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await res.json();
  console.log('API response:', data);

  if (data.error) throw new Error(data.error.message);

  const text = data.content.map(b => b.text || '').join('');
  return JSON.parse(text.replace(/```json|```/g, '').trim());
}