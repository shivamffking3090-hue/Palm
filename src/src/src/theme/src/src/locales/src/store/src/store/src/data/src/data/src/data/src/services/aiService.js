const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Models
const VISION_MODEL = "allenai/molmo-2-8b:free";
const TEXT_MODEL = "liquid/lfm-2.5-1.2b-thinking:free";

// 🛡️ STRICT SYSTEM PROMPTS 🛡️
const BASE_SYSTEM_PROMPT = `
You are a wise, empathetic, and spiritual AI Palm Reader and Astrologer. 
Your tone is calm, mystical, supportive, and grounded.

CRITICAL RULES (ABSOLUTE):
1. NEVER predict guaranteed future events (death, lottery numbers, specific dates).
2. NEVER give medical, legal, or financial advice.
3. NEVER use fear-inducing language. Always frame challenges as opportunities for growth.
4. If a user asks about health/legal/safety, politely decline and refer to professionals.
5. All outputs must be long-form, detailed, and structured.
6. Speak in the language requested by the user.

Your goal is to provide spiritual reflection, self-discovery, and comfort.
`;

const PALM_SYSTEM_PROMPT = `
${BASE_SYSTEM_PROMPT}
You are analyzing an image of a human palm.
Identify the Heart Line, Head Line, Life Line, and Fate Line (if visible).
Provide a symbolic interpretation for each line based on traditional Chiromancy.
Focus on personality traits, emotional tendencies, and potential life paths.
Structure your response strictly as JSON:
{
  "heartLine": "Analysis here...",
  "headLine": "Analysis here...",
  "lifeLine": "Analysis here...",
  "fateLine": "Analysis here...",
  "summary": "Overall spiritual vibe..."
}
`;

const TAROT_SYSTEM_PROMPT = `
${BASE_SYSTEM_PROMPT}
You are interpreting a Tarot spread.
Explain the symbolism of the cards drawn and how they relate to the user's question or life situation.
Connect the cards together into a cohesive narrative.
`;

// Helper to make the API Call
async function callOpenRouter(model, messages, temperature = 0.7) {
  if (!API_KEY) {
    throw new Error("Missing API Key. Check .env file.");
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin, // Required by OpenRouter
        "X-Title": "AI Palm Reader PWA"
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: temperature,
        max_tokens: 1000,
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || "API Request Failed");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
}

// 🖐️ PALM READING SERVICE (Vision)
export const analyzePalmImage = async (base64Image, language = 'en') => {
  const messages = [
    {
      role: "system",
      content: `${PALM_SYSTEM_PROMPT} Output strictly in ${language} language.`
    },
    {
      role: "user",
      content: [
        { type: "text", text: "Analyze this palm image according to Chiromancy traditions. Return ONLY valid JSON." },
        { type: "image_url", image_url: { url: base64Image } }
      ]
    }
  ];

  // Note: Using a text model for JSON structure is often safer if the vision model is chatty, 
  // but Molmo is capable. We might need to parse the JSON out of markdown blocks.
  const rawText = await callOpenRouter(VISION_MODEL, messages, 0.5);
  
  // Clean up response if it contains markdown code blocks
  try {
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Invalid JSON format from AI");
  } catch (e) {
    // Fallback if JSON parsing fails - return text as summary
    return {
      heartLine: "Could not parse distinct lines.",
      headLine: "Please try a clearer photo.",
      lifeLine: "...",
      fateLine: "...",
      summary: rawText
    };
  }
};

// 🃏 TAROT READING SERVICE (Text)
export const getTarotReading = async (cards, question, category, language = 'en') => {
  const cardNames = cards.map(c => c.name).join(", ");
  const prompt = `
    User Question: "${question}"
    Category: ${category}
    Cards Drawn: ${cardNames}
    
    Provide a detailed spiritual interpretation.
  `;

  const messages = [
    { role: "system", content: `${TAROT_SYSTEM_PROMPT} Respond in ${language}.` },
    { role: "user", content: prompt }
  ];

  return await callOpenRouter(TEXT_MODEL, messages, 0.8);
};

// 💬 CHAT SERVICE (Text)
export const getChatResponse = async (history, message, language = 'en') => {
  const messages = [
    { role: "system", content: `${BASE_SYSTEM_PROMPT} Respond in ${language}.` },
    ...history.map(msg => ({ role: msg.isUser ? "user" : "assistant", content: msg.text })),
    { role: "user", content: message }
  ];

  return await callOpenRouter(TEXT_MODEL, messages, 0.7);
};

// 🌟 DAILY GUIDANCE / HOROSCOPE
export const getDailyGuidance = async (sign, language = 'en') => {
  const prompt = `
    Provide a daily horoscope for ${sign}.
    Include:
    1. General Mood
    2. Love Outlook
    3. Career/Money Tip
    4. One thing to avoid today
    5. One thing to embrace today
    
    Keep it mystical but practical.
  `;

  const messages = [
    { role: "system", content: `${BASE_SYSTEM_PROMPT} Respond in ${language}.` },
    { role: "user", content: prompt }
  ];

  return await callOpenRouter(TEXT_MODEL, messages, 0.7);
};
