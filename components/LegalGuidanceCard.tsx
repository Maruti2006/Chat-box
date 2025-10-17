import { useState } from 'react';

interface LegalGuidanceCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
}

export default function LegalGuidanceCard({ title, icon, description, details }: LegalGuidanceCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg cursor-pointer transform transition-transform hover:scale-[1.03]">
      <div className="flex items-center space-x-4">
        <div className="text-primary text-4xl">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
      {!expanded ? (
        <button
          onClick={() => setExpanded(true)}
          className="mt-4 text-primary underline font-medium hover:text-primary-dark"
          aria-expanded={expanded}
        >
          Explore More
        </button>
      ) : (
        <div className="mt-4 text-gray-700 dark:text-gray-300 space-y-2">
          <ul className="list-disc pl-5">
            {details.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <button
            onClick={() => setExpanded(false)}
            className="mt-2 text-red-500 underline font-medium hover:text-red-700"
          >
            Collapse
          </button>
        </div>
      )}
    </div>
  );
}
