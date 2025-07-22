// src/app/layout.tsx
import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Personal AI OS',
  description: 'Your AI-powered assistant',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <nav className="w-full bg-gray-100 p-4 shadow flex justify-center space-x-6">
          <Link href="/chat" className="hover:underline">Chat</Link>
          <Link href="/notes" className="hover:underline">Notes</Link>
          <Link href="/tasks" className="hover:underline">Tasks</Link>
          <Link href="/memory" className="hover:underline">Memory</Link>
          <Link href="/settings" className="hover:underline">Settings</Link>
        </nav>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
