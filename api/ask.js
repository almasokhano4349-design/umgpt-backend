import Groq from "groq-sdk";

export default async function handler(req, res) {
  try {
    // Parse JSON body
    const { question } = req.body;

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    const response = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "user", content: question }
      ]
    });

    res.status(200).json({
      answer: response.choices[0].message.content
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
