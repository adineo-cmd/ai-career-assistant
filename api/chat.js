import Groq from "groq-sdk";

async function tryGroq(message) {
  const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: "You are an AI Career Assistant." },
        { role: "user", content: message },
      ],
    });

    return completion.choices?.[0]?.message?.content || null;
  } catch (err) {
    console.log("Groq failed:", err.message);
    return null;
  }
}

async function tryHuggingFace(message) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: message }),
      }
    );

    const data = await response.json();
    return data.generated_text || data?.[0]?.generated_text || null;
  } catch (err) {
    console.log("HuggingFace failed:", err.message);
    return null;
  }
}

async function tryOllama(message) {
  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt: message,
        stream: false,
      }),
    });

    const data = await response.json();
    return data.response || null;
  } catch (err) {
    console.log("Ollama Offline:", err.message);
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message Required!" });
  }

  let reply;

  reply = await tryGroq(message);
  if (!reply) reply = await tryHuggingFace(message);
  if (!reply) reply = await tryOllama(message);

  if (!reply) {
    return res.status(500).json({ error: "All AI Providers Failed!" });
  }

  return res.status(200).json({ reply });
}
