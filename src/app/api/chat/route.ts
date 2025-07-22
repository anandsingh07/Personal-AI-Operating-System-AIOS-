// src/app/api/chat/route.ts
import { NextRequest } from 'next/server';

export const runtime = 'edge'; // enables edge streaming

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', // update this in prod
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages,
          stream: true,
          max_tokens: 1000,
        }),
      });

      if (!response.body) {
        controller.enqueue(encoder.encode('⚠️ No response body'));
        controller.close();
        return;
      }

      const reader = response.body.getReader();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // keep incomplete line for next chunk

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || trimmed === 'data: [DONE]') continue;

          try {
            const jsonStr = trimmed.replace(/^data:\s*/, '');
            const json = JSON.parse(jsonStr);
            const content = json.choices?.[0]?.delta?.content;

            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          } catch {
            // Do nothing — malformed partial chunks are common during streaming
          }
        }
      }

      controller.close();
    },
  });

  return new Response(stream);
}
