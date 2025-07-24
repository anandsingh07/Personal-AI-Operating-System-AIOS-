import './globals.css';
import Navbar from '@/components/navbar';

export const metadata = {
  title: 'Personal AI OS',
  description: 'Your AI-powered assistant',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <Navbar />
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
