// ==========================================================================
// SkillBridge — Student Career Navigator
// Vercel Serverless Function: AI Career Copilot Endpoint
// Secure server-side proxy for Gemini / OpenAI APIs with fallback detection
// ==========================================================================

export default async function handler(req, res) {
  // Enforce POST method
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: 'Only POST requests are supported.'
    });
  }

  try {
    const { message, career, student, currentRatings } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'A valid message string is required.'
      });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    // Build context-aware system prompt
    const systemPrompt = `You are the SkillBridge AI Career Copilot, an expert technical career mentor, senior software architect, and technical recruiter.
Target Career Track: ${career?.title || 'Software Engineering'}
Student Name: ${student?.name || 'Student'}
Target Companies: ${student?.dreamCompanies || 'Top Tech Companies'}
Current Skill Ratings: ${JSON.stringify(currentRatings || {})}

Your goal is to provide concise, actionable, and encouraging technical career advice.
Follow these guidelines:
1. Provide specific, practical advice (mention specific technologies, architecture patterns, and projects).
2. Format responses with clean Markdown (use bolding, bullet points, and code snippets where appropriate).
3. Be candid about industry expectations while remaining motivational.
4. Keep answers focused (under 250 words unless writing a full study schedule or code example).`;

    // 1. Try Google Gemini API if GEMINI_API_KEY is configured
    if (geminiKey) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`;
        
        const geminiResponse = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  { text: `${systemPrompt}\n\nStudent asks: ${message}` }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800
            }
          })
        });

        if (geminiResponse.ok) {
          const geminiData = await geminiResponse.json();
          const replyText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (replyText) {
            return res.status(200).json({
              reply: replyText,
              source: 'ai',
              provider: 'gemini'
            });
          }
        } else {
          console.error('Gemini API returned error:', await geminiResponse.text());
        }
      } catch (geminiErr) {
        console.error('Gemini request failure:', geminiErr);
      }
    }

    // 2. Try OpenAI API if OPENAI_API_KEY is configured
    if (openaiKey) {
      try {
        const openaiUrl = 'https://api.openai.com/v1/chat/completions';
        const openaiResponse = await fetch(openaiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: message }
            ],
            temperature: 0.7,
            max_tokens: 800
          })
        });

        if (openaiResponse.ok) {
          const openaiData = await openaiResponse.json();
          const replyText = openaiData?.choices?.[0]?.message?.content;
          if (replyText) {
            return res.status(200).json({
              reply: replyText,
              source: 'ai',
              provider: 'openai'
            });
          }
        } else {
          console.error('OpenAI API returned error:', await openaiResponse.text());
        }
      } catch (openaiErr) {
        console.error('OpenAI request failure:', openaiErr);
      }
    }

    // 3. Fallback: No API key or remote failure
    return res.status(200).json({
      reply: null,
      source: 'fallback',
      reason: 'No external AI API key configured in Vercel environment variables (GEMINI_API_KEY or OPENAI_API_KEY). Using SkillBridge local rule engine.'
    });

  } catch (err) {
    console.error('Serverless function error:', err);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to process AI request.'
    });
  }
}

