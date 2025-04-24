// app/api/summarize/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { noteContent } = body;

  if (!noteContent) {
    return NextResponse.json({ error: 'Note content is required' }, { status: 400 });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192', //'mixtral-8x7b-32768', // You can change this to 'llama3-70b-8192' or other available Groq models
        messages: [
          {
            role: 'user',
            content: `Summarize the following note:\n\n${noteContent}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content || 'No summary generated.';

    return NextResponse.json({ summary });
  } catch (err) {
    console.error('Error from Groq:', err);
    return NextResponse.json({ error: 'Failed to summarize note' }, { status: 500 });
  }
}
