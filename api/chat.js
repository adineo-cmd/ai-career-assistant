import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    try {
      const completion = await client.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }]
      });
      res.status(200).json({ reply: completion.choices[0].message.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ reply: 'Error generating response' });
    }
  } else {
    res.status(405).json({ reply: 'Method Not Allowed' });
  }
}
