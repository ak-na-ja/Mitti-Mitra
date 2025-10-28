import { GoogleGenAI } from "@google/genai";

// Blueprint integration: javascript_gemini
// Using Gemini 2.5 Flash for fast, cost-effective image analysis
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface CropAnalysis {
  issues: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    solution: string;
  }>;
  generalHealth: string;
  recommendations: string[];
}

export interface TranslationRequest {
  generalHealth: string;
  issues: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    solution: string;
  }>;
  recommendations: string[];
}

export async function analyzeCropImage(imageBase64: string, mimeType: string, language: string = 'en'): Promise<CropAnalysis> {
  try {
    const languageInstruction = language === 'hi' 
      ? 'Respond in Hindi language (Devanagari script).'
      : 'Respond in English language.';

    const systemPrompt = `You are an expert agricultural advisor specializing in crop disease identification and soil health analysis for small farmers in India.

${languageInstruction}

Analyze the uploaded image and identify:
1. Any diseases, pests, or nutrient deficiencies visible on leaves or plants
2. Soil health issues if soil is visible
3. Overall plant health status

For each issue found, provide:
- Type of issue (disease name, pest name, or deficiency)
- Severity level (low, medium, high)
- Clear description in simple terms
- Practical, affordable solution using locally available materials. Format solutions as bullet points (each point on a new line starting with •)

Respond with JSON in this exact format:
{
  "issues": [
    {
      "type": "Issue name",
      "severity": "low/medium/high",
      "description": "Simple description",
      "solution": "• First step\n• Second step\n• Third step"
    }
  ],
  "generalHealth": "Overall health assessment",
  "recommendations": ["Recommendation 1", "Recommendation 2"]
}

If the image shows healthy crops with no issues, return an empty issues array and positive health assessment.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            issues: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: { type: "string" },
                  severity: { type: "string", enum: ["low", "medium", "high"] },
                  description: { type: "string" },
                  solution: { type: "string" },
                },
                required: ["type", "severity", "description", "solution"],
              },
            },
            generalHealth: { type: "string" },
            recommendations: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["issues", "generalHealth", "recommendations"],
        },
      },
      contents: [
        {
          inlineData: {
            data: imageBase64,
            mimeType: mimeType,
          },
        },
        "Analyze this crop/soil image and provide detailed diagnosis with solutions.",
      ],
    });

    const rawJson = response.text;
    
    if (rawJson) {
      const data: CropAnalysis = JSON.parse(rawJson);
      return data;
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Gemini analysis error:", error);
    throw new Error(`Failed to analyze image: ${error}`);
  }
}

export async function translateAnalysisToHindi(analysis: TranslationRequest): Promise<CropAnalysis> {
  try {
    const systemPrompt = `You are a professional translator specializing in agricultural terminology. Translate the following crop analysis from English to Hindi (Devanagari script).

IMPORTANT INSTRUCTIONS:
- Translate ALL text to Hindi, including technical agricultural terms
- Maintain the exact same JSON structure
- Keep severity levels as "low", "medium", "high" (do not translate these)
- Preserve bullet point formatting in solutions (keep the • character)
- Use simple, clear Hindi that farmers can understand
- Do NOT change the meaning or add extra information

Respond with JSON in this exact format:
{
  "issues": [
    {
      "type": "Hindi translation of issue name",
      "severity": "keep as low/medium/high",
      "description": "Hindi translation of description",
      "solution": "• Hindi translation of first step\\n• Hindi translation of second step\\n• etc"
    }
  ],
  "generalHealth": "Hindi translation of health assessment",
  "recommendations": ["Hindi translation of recommendation 1", "Hindi translation of recommendation 2"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            issues: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  type: { type: "string" },
                  severity: { type: "string", enum: ["low", "medium", "high"] },
                  description: { type: "string" },
                  solution: { type: "string" },
                },
                required: ["type", "severity", "description", "solution"],
              },
            },
            generalHealth: { type: "string" },
            recommendations: {
              type: "array",
              items: { type: "string" },
            },
          },
          required: ["issues", "generalHealth", "recommendations"],
        },
      },
      contents: [
        JSON.stringify(analysis, null, 2),
      ],
    });

    const rawJson = response.text;
    
    if (rawJson) {
      const data: CropAnalysis = JSON.parse(rawJson);
      return data;
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error(`Failed to translate analysis: ${error}`);
  }
}
