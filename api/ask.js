import Groq from "groq-sdk";

export const config = {
  runtime: "edge"
};

export default async function handler(request) {
  try {

    // Parse JSON safely
    const { question } = await request.json();

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const response = await groq.chat.completions.create({
      model: "llama-3.2-1b-preview",
      messages: [
        { role: "user", content: question }
      ]
    });

    return new Response(
      JSON.stringify({ answer: response.choices[0].message.content }),
      {
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
