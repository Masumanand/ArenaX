// Google Gemini AI Service Integration
// This service handles generative commentary and tactical insights

const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export const fetchAICommentary = async (action, persona, sport) => {
  try {
    if (GEMINI_API_KEY !== "YOUR_GEMINI_API_KEY") {
      const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Act as a ${persona} sports commentator for a ${sport} match. 
                     Provide a short, punchy reaction to this event: ${action}`
            }]
          }]
        })
      });
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    }

    // Local Mock Logic for Demo
    const mocks = {
      tactical: {
        'SIX!': "Technical brilliance. The launch angle was optimized for maximum carry.",
        'GOAL!': "Defensive structure compromised. The transitional play was executed perfectly.",
        'DEFAULT': "Analyzing tactical positioning. The mid-block is proving effective."
      },
      hype: {
        'SIX!': "UNBELIEVABLE! That's absolute carnage! The roof is coming off! 🚀",
        'GOAL!': "OH MY DAYS! Pure magic! He's just rewritten the history books! 🔥",
        'DEFAULT': "The tension is palpable! Every fan is on their feet!"
      }
    };

    const style = mocks[persona] || mocks.tactical;
    return style[action] || style.DEFAULT;

  } catch (error) {
    console.error("Gemini AI Error:", error);
    return null;
  }
};

export const getTacticalAnalysis = async (matchState) => {
  console.log("Analyzing match state:", matchState);
  return "AI Analysis: The current formation is favoring wide attacks.";
};
