
import { GoogleGenAI } from "@google/genai";

export const getSommelierAdvice = async (userMessage: string) => {
  try {
    // Create AI instance only when needed to avoid issues with global process.env access
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: "You are a professional Georgian Sommelier for the 'Niamori' wine brand. You provide advice in Georgian. Help customers choose between Saperavi, Rkatsiteli, Brandy, or Chacha. Be elegant and helpful.",
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "უკაცრავად, მოხდა შეცდომა. გთხოვთ სცადოთ მოგვიანებით.";
  }
};
