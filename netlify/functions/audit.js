export default async (req) => {
  try {
    const body = await req.json();
    const { url, channel } = body;

    const prompt = `
You are a senior marketing analytics consultant.
Audit the website ${url} for ${channel}.
Check:
- Funnel leaks
- Tracking & GA4 gaps
- Attribution issues
- CRO improvements
- Growth opportunities
Give bullet point insights.
`;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await openaiRes.json();
    return new Response(JSON.stringify({ result: data.choices[0].message.content }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
