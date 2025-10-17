import { useState, useEffect } from 'react';

interface LegalRight {
  id: number;
  title: string;
  category: 'Constitutional' | 'Criminal' | 'Civil' | 'Family' | 'Procedural';
  description: string;
  rating: number;
}

interface LegalRightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  rights: LegalRight[];
}

const CATEGORIES = ['All', 'Constitutional', 'Criminal', 'Civil', 'Family', 'Procedural'] as const;

export default function LegalRightsModal({ isOpen, onClose, rights }: LegalRightsModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<typeof CATEGORIES[number]>('All');
  const [filteredRights, setFilteredRights] = useState<LegalRight[]>(rights);

  useEffect(() => {
    let filtered = rights;
    if (categoryFilter !== 'All') {
      filtered = filtered.filter((r) => r.category === categoryFilter);
    }
    if (searchTerm.trim()) {
      filtered = filtered.filter((r) =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredRights(filtered);
  }, [searchTerm, categoryFilter, rights]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-rights-title"
      tabIndex={-1}
      className="fixed inset-0 z-60 overflow-auto bg-black bg-opacity-40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-lg relative"
      >
        <h2 id="legal-rights-title" className="text-2xl font-semibold text-primary mb-4">
          All Indian Legal Rights
        </h2>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mb-6">
          <input
            type="search"
            name="search"
            id="search-rights"
            className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Search rights..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            aria-label="Filter by category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as typeof CATEGORIES[number])}
            className="mt-2 md:mt-0 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto mt-2 md:mt-0 bg-red-600 hover:bg-red-700 text-white rounded-md px-4 py-2 font-semibold"
            aria-label="Close modal"
          >
            Back
          </button>
        </div>
        {filteredRights.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">No rights found matching criteria.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRights.map(({ id, title, category, description, rating }) => (
              <div
                key={id}
                className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 cursor-default border border-gray-200 dark:border-gray-600"
                tabIndex={0}
                aria-label={`${title} legal right, category ${category}, rating ${rating} stars`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-primary">{title}</h3>
                  <span className="inline-block rounded-full px-3 py-1 text-xs font-semibold bg-primary text-white">
                    {category}
                  </span>
                </div>
                <p className="text-gray-800 dark:text-gray-300 mb-2">{description}</p>
                <div aria-label={`Rating: ${rating} out of 5 stars`} role="img" className="text-yellow-400">
                  {'★'.repeat(rating) + '☆'.repeat(5 - rating)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
