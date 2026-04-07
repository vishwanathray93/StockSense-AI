import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function generateSQL(question){

const prompt = `
You are a PostgreSQL analytics expert.

Tables:
shops
visitors
sessions
page_views
click_events
products
product_views
add_to_cart_events
orders
daily_stats

Rules:
- Only SELECT queries
- Return SQL only
- PostgreSQL syntax

Question:
${question}
`;

const res = await groq.chat.completions.create({
model: "llama-3.1-8b-instant",
messages:[
{
role:"user",
content:prompt
}
]
});

return res.choices[0].message.content.trim();

}