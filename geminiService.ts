
import { GoogleGenAI } from "@google/genai";

/**
 * Professional Sommelier advice service.
 * Using a local initialization strategy to prevent global scope errors 
 * during early application hydration.
 */
export const getSommelierAdvice = async (userMessage: string) => {
  // Always fetch the latest key from the environment
  const apiKey = process.env.API_KEY || (window as any).process?.env?.API_KEY;

  if (!apiKey || apiKey === "") {
    console.error("Gemini API_KEY is missing. Please configure it in Vercel.");
    return "სამწუხაროდ, AI ასისტენტი დროებით მიუწვდომელია. გთხოვთ დაგვიკავშირდეთ ნომერზე: +995 555 682 266";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: "You are a professional Georgian Sommelier for the 'Niamori' wine brand. You provide advice in Georgian. Help customers choose between Saperavi, Rkatsiteli, Brandy, or Chacha. Be elegant and helpful. The website brand is Niamori (ნიამორი).",
        temperature: 0.7,
      },
    });
    
    return response.text || "ბოდიში, პასუხის მომზადება ვერ მოხერხდა.";
  } catch (error) {
    console.error("Gemini Service Error:", error);
    return "უკაცრავად, მოხდა ტექნიკური ხარვეზი. სცადეთ მოგვიანებით.";
  }
};
