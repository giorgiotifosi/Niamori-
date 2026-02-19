
import { GoogleGenAI } from "@google/genai";

export const getSommelierAdvice = async (userMessage: string) => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("Gemini API_KEY is missing in environment variables.");
    return "სამწუხაროდ, სერვისი დროებით მიუწვდომელია (API კონფიგურაციის შეცდომა).";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
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
