
import { GoogleGenAI, Type } from "@google/genai";
import { SummaryResult, RevisionMode } from "../types";

export const summarizeText = async (text: string, mode: RevisionMode): Promise<SummaryResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const modeInstructions = {
    concise: "Keep it extremely brief and high-level.",
    detailed: "Provide in-depth explanations of complex concepts.",
    'bullet-points': "Focus heavily on structured lists and steps."
  };

  const prompt = `
    Analyze the following academic text and provide a structured revision summary suitable for exam preparation.
    
    Revision Mode: ${modeInstructions[mode]}
    
    Text to summarize:
    ${text}
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: `You are an elite academic tutor. Your goal is to help students revise large lessons quickly. 
      You must always return a JSON object with the following structure:
      {
        "overview": "A brief meaningful overview of the entire text",
        "keyPoints": ["Important point 1", "Important point 2", ...],
        "definitions": [{"term": "concept name", "meaning": "clear simplified definition"}],
        "examTakeaway": "A final essential tip or core idea for exams"
      }
      Focus on key concepts and simplified language.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overview: { type: Type.STRING },
          keyPoints: { 
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          definitions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                term: { type: Type.STRING },
                meaning: { type: Type.STRING }
              },
              required: ["term", "meaning"]
            }
          },
          examTakeaway: { type: Type.STRING }
        },
        required: ["overview", "keyPoints", "definitions", "examTakeaway"]
      }
    },
  });

  const result = JSON.parse(response.text || '{}') as SummaryResult;
  return result;
};
