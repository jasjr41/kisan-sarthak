const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

const generateAIResponse = async ({
    question,
    farmer,
    farm,
    weather,
    forecast,
    recommendations,
    farmingHistory
}) => {

    if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is not configured.");
    }

    const prompt = `
You are an AI Farming Assistant inside a Smart Farming Advisor application.

Your purpose is to help farmers understand their current farming conditions
and make practical decisions using the information provided by the system.

IMPORTANT RULES:
- Use the provided farmer, farm, weather and farming data.
- Do not invent missing information.
- If information is missing, clearly say so.
- Give practical and easy-to-understand advice.
- Do not claim to provide a guaranteed diagnosis.
- For fertilizer, pesticide or disease-related decisions, recommend soil/tissue
  testing or consultation with a qualified agricultural expert when appropriate.
- Do not provide unsafe chemical instructions.
- Keep responses concise but useful.
- Use bullet points when they improve readability.

FARMER:
${JSON.stringify(farmer || {}, null, 2)}

FARM PROFILE:
${JSON.stringify(farm || {}, null, 2)}

CURRENT WEATHER:
${JSON.stringify(weather || {}, null, 2)}

WEATHER FORECAST:
${JSON.stringify(forecast || [], null, 2)}

CURRENT SYSTEM RECOMMENDATIONS:
${JSON.stringify(recommendations || [], null, 2)}

RECENT FARMING HISTORY:
${JSON.stringify(farmingHistory || [], null, 2)}

FARMER QUESTION:
${question}

Provide a helpful answer based on the available information.
`;

    const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
        contents: prompt
    });

    return response.text;
};

module.exports = {
    generateAIResponse
};