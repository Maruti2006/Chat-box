import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

const MENU_ITEMS = [
  { name: 'Home', href: '#home' },
  { name: 'Legal Rights', href: '#legal-rights' },
  { name: 'AI Legal Chat', href: '#ai-chat' },
  { name: 'Law Search', href: '#law-search' },
  { name: 'Legal Guidance', href: '#legal-guidance' },
  { name: 'Contact Us', href: '#contact-us' },
  { name: 'About Us', href: '#about-us' },
];

interface HeaderProps {
  onOpenSearch: () => void;
}

export default function Header({ onOpenSearch }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on menu item click
  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  // Close on outside click
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('click', handler);
    }
    return () => {
      document.removeEventListener('click', handler);
    };
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {/* Hamburger */}
          <svg
            className="w-6 h-6 text-primary"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <h1 className="text-xl font-bold text-primary cursor-pointer select-none">LegalHelp AI</h1>
        <nav
          ref={menuRef}
          className={clsx(
            'absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md md:static md:shadow-none md:w-auto md:flex md:space-x-8',
            menuOpen ? 'block' : 'hidden',
            'md:block'
          )}
        >
          <ul className="flex flex-col md:flex-row">
            {MENU_ITEMS.map(({ name, href }) => (
              <li key={name}>
                <a
                  href={href}
                  onClick={handleMenuItemClick}
                  className="block px-4 py-2 text-primary hover:bg-primary hover:text-white md:hover:bg-transparent md:hover:text-primary md:p-2 cursor-pointer"
                >
                  {name}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  onOpenSearch();
                  setMenuOpen(false);
                }}
                className="block px-4 py-2 text-primary hover:bg-primary hover:text-white md:hover:bg-transparent md:hover:text-primary md:p-2 cursor-pointer"
                aria-label="Open search"
              >
                🔍 Search
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
