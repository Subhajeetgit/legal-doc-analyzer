import openai from "../config/apiclient.js";

export const analyzeLegalDocument = async (text) => {
  try {
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content:
            "You are a legal document analyzer. You must respond ONLY with valid JSON. No explanations, no markdown.",
        },
        {
          role: "user",
          content: `
Analyze the following legal document.

Tasks:
1. Summarize the document in simple language.
2. Extract important legal clauses as bullet points.
3. Identify potential risks or red flags.

Return JSON strictly in this format:
{
  "summary": string,
  "clauses": string[],
  "risks": string[]
}

Document:
${text}
          `,
        },
      ],
      temperature: 0.2,
      max_output_tokens: 500,
    });

    const output = response.output_text;

    return JSON.parse(output);
  } catch (error) {
    console.error("Legal analysis failed:", error.message);
    throw new Error("Failed to analyze legal document");
  }
};
