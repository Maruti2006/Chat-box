import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [input, setInput] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md mx-auto mt-8">
      <input
        type="search"
        aria-label="Search laws or rights"
        className="flex-grow border border-gray-400 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Search Indian laws, rights..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-primary text-white px-6 rounded-r-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Search"
      >
        Search
      </button>
    </form>
  );
}
