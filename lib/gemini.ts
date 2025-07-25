import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const generateAnswer = async (prompt: string) => {
  const response = await ai.models.generateContent({
    model: "gemini-pro",
    contents: prompt,
  });
  return response.text as string;
};
