import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function detectIntent(question){

const prompt = `
Classify the analytics question into one of these intents:

visitors_today
top_pages
traffic_drop
revenue
product_views
unknown

Return ONLY the intent name.

Question:
${question}
`;

const res = await groq.chat.completions.create({
model: "llama-3.1-8b-instant",
messages: [{ role: "user", content: prompt }]
});

return res.choices[0].message.content.trim();
}