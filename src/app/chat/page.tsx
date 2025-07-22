'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    if (!response.body) {
      setMessages((prev) => [...prev, { role: 'assistant', content: '⚠️ No response body' }]);
      setLoading(false);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiMessage = '';
    const assistantMessage: Message = { role: 'assistant', content: '' };
    setMessages((prev) => [...prev, assistantMessage]);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      aiMessage += chunk;

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: aiMessage };
        return updated;
      });
    }

    setLoading(false);
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">👋 Hi! I'm your AI Assistant.</h1>

      <div className="space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-md text-sm whitespace-pre-wrap ${
              m.role === 'user' ? 'bg-gray-100' : 'bg-green-50'
            }`}
          >
            <strong>{m.role === 'user' ? 'You' : 'AI'}:</strong> {m.content}
          </div>
        ))}
        {loading && <div className="text-gray-400 text-sm italic">AI is thinking...</div>}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          Send
        </Button>
      </form>
    </main>
  );
}
