'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/chat', label: 'Chat', icon: '💬' },
  { href: '/notes', label: 'Notes', icon: '📝' },
  { href: '/tasks', label: 'Tasks', icon: '✅' },
  { href: '/memory', label: 'Memory', icon: '🧠' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-gray-100 backdrop-blur p-3 shadow flex flex-wrap justify-center overflow-x-auto gap-2"
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-2 px-3 py-1 rounded-md transition text-sm md:text-base whitespace-nowrap ${
            pathname === item.href
              ? 'bg-blue-100 text-blue-700 font-semibold'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <span className="text-lg">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
