import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const generateAnswer = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-1.5-flash-latest",
    config: {
      temperature: 0.7,
    },
    contents: prompt,
  });
  return response.text as string;
};
