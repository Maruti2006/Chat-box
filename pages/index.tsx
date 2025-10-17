import type { NextPage } from 'next';
import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import LegalGuidanceCard from '../components/LegalGuidanceCard';
import LegalRightsModal from '../components/LegalRightsModal';
import AIChatbot from '../components/AIChatbot';
import SearchBar from '../components/SearchBar';

const rightsData = Array(100)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    title: `Legal Right #${i + 1}`,
    category: ['Constitutional', 'Criminal', 'Civil', 'Family', 'Procedural'][i % 5] as
      | 'Constitutional'
      | 'Criminal'
      | 'Civil'
      | 'Family'
      | 'Procedural',
    description: `This is a description for legal right number ${i + 1} which details its scope and application.`,
    rating: (i % 5) + 1,
  }));

const guidanceCategories = [
  {
    title: 'Constitutional Law',
    icon: '📜',
    description: 'Understand the fundamentals of the Indian Constitution and your constitutional rights.',
    details: [
      'Article 14 guarantees equality before the law.',
      'Article 21 ensures the right to life and personal liberty.',
      'Emergency provisions under Article 352.',
      'Separation of powers between legislature, judiciary, and executive.',
      'Fundamental duties under Article 51A.',
    ],
  },
  {
    title: 'Criminal Law',
    icon: '⚖️',
    description: 'Know about criminal offenses, procedures, and penalties.',
    details: [
      'Indian Penal Code sections defining various crimes.',
      'Filing and investigation of FIR under CrPC.',
      'Bail and bail procedures in criminal cases.',
      'Judicial precedents on self-defense.',
      'Punishment guidelines and sentencing.',
    ],
  },
  {
    title: 'Civil Matters',
    icon: '🏛️',
    description: 'Information on civil disputes, property law, contracts, and consumer rights.',
    details: [
      'Civil Procedure Code for filing suits.',
      'Contract law essentials.',
      'Property rights and transfer of property.',
      'Consumer Protection Act provisions.',
      'Dispute resolution mechanisms.',
    ],
  },
  {
    title: 'Family Law',
    icon: '👪',
    description: 'Rights related to marriage, divorce, child custody, and inheritance.',
    details: [
      'Marriage and divorce under Hindu Marriage Act.',
      'Child custody and maintenance laws.',
      'Succession and inheritance rules.',
      'Domestic violence protections.',
      'Adoption regulations and procedures.',
    ],
  },
  {
    title: 'Corporate Law',
    icon: '🏢',
    description: 'Legalities around companies, partnerships, and business compliance.',
    details: [
      'Companies Act provisions for incorporation.',
      'Partnership firms and LLP regulations.',
      'Compliance and reporting obligations.',
      'Intellectual property rights.',
      'Corporate governance principles.',
    ],
  },
  {
    title: 'Legal Education',
    icon: '🎓',
    description: 'Resources for learning about law and legal careers.',
    details: [
      'Law colleges and entrance exams.',
      'Legal research resources.',
      'Internship and clerkship opportunities.',
      'Bar Council of India guidelines.',
      'Continuing legal education programs.',
    ],
  },
];

const sampleRightsPreview = rightsData.slice(0, 6);

interface HomeProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const Home: NextPage<HomeProps> = ({ darkMode, setDarkMode }) => {
  const [rightsModalOpen, setRightsModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Head>
        <title>LegalHelp AI - India's AI Legal Assistant</title>
        <meta name="description" content="India's first AI-powered comprehensive legal assistant platform." />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <div className="gradient-mesh-bg" aria-hidden="true"></div>
      <Header onOpenSearch={() => setSearchOpen(true)} />
      <main className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero Section */}
        <section id="home" className="pt-16 text-center mt-8 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-800 via-pink-600 to-purple-900 bg-clip-text text-transparent select-none">
            India's AI Legal Assistant
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-800 dark:text-gray-200">
            Understand your legal rights and get instant AI-powered legal guidance.
          </p>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => setRightsModalOpen(true)}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3 rounded-md transition"
            >
              View All Rights
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="border border-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-md transition"
            >
              Search Laws
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">Fast Response Time</h3>
              <p className="text-gray-700 dark:text-gray-300">Get legal answers quickly and reliably.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">Complete Confidentiality</h3>
              <p className="text-gray-700 dark:text-gray-300">Your legal questions remain private and secure.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-2">AI-backed Expertise</h3>
              <p className="text-gray-700 dark:text-gray-300">Powered by AI trained on Indian legal statutes and case law.</p>
            </div>
          </div>
        </section>

        {/* Legal Guidance Section */}
        <section id="legal-guidance" aria-label="Legal Guidance Hub">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Legal Guidance Hub</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {guidanceCategories.map(({ title, icon, description, details }) => (
              <LegalGuidanceCard
                key={title}
                title={title}
                icon={icon}
                description={description}
                details={details}
              />
            ))}
          </div>
        </section>

        {/* How We Help Section */}
        <section id="how-we-help" className="max-w-4xl mx-auto mt-12 space-y-8 text-center">
          <h2 className="text-3xl font-bold text-primary">How We Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
              <p>Get assistance anytime, anywhere with our AI-powered platform.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Free Guidance</h3>
              <p>Access basic legal information and advice at no cost.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
              <p>Optimized for all devices including mobiles and tablets.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Easy to Understand</h3>
              <p>Legal info explained in simple, everyday language.</p>
            </div>
          </div>
        </section>

        {/* Rights Preview Section */}
        <section
          id="legal-rights"
          aria-label="Rights Preview"
          className="max-w-6xl mx-auto mt-6 space-y-6"
        >
          <h2 className="text-3xl font-bold text-primary text-center">Sample Legal Rights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleRightsPreview.map(({ id, title, category, description, rating }) => (
              <div
                key={id}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md cursor-pointer border border-gray-200 dark:border-gray-600"
                tabIndex={0}
                aria-label={`${title}: ${category} category, rating ${rating} stars`}
              >
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <span className="inline-block bg-primary text-white rounded-full px-3 py-1 mb-2 text-sm font-medium">
                  {category}
                </span>
                <p className="text-gray-800 dark:text-gray-300">{description}</p>
                <div className="mt-3 text-yellow-400" aria-label={`Rating: ${rating} stars`} role="img">
                  {'★'.repeat(rating) + '☆'.repeat(5 - rating)}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setRightsModalOpen(true)}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-10 py-3 rounded-md transition"
            >
              View All Rights
            </button>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact-us"
          className="max-w-3xl mx-auto mt-16 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg space-y-6"
          aria-label="Contact Information"
        >
          <h2 className="text-3xl font-bold text-primary text-center">Contact Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">
              <h3 className="font-semibold text-lg mb-2">Support Email</h3>
              <p>support@legalhelp.ai</p>
              <p>Mon-Fri, 9am - 6pm IST</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">
              <h3 className="font-semibold text-lg mb-2">Office Location</h3>
              <p>Bangalore, Karnataka, India</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">
              <h3 className="font-semibold text-lg mb-2">Emergency Contacts</h3>
              <p>Police: 100</p>
              <p>Legal Aid: 15100</p>
              <p>Women Helpline: 181</p>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about-us" className="max-w-3xl mx-auto mt-16 text-center space-y-4">
          <h2 className="text-3xl font-bold text-primary">About LegalHelp AI</h2>
          <p className="text-gray-700 dark:text-gray-300">
            LegalHelp AI is India's first AI-powered legal assistant platform aimed at empowering citizens with immediate and accurate legal knowledge and guidance.
          </p>
          <p className="text-gray-700 dark:text-gray-300">We provide educational resources as well as interactive legal consultations covering a wide range of fields backed by Indian legal statutes and case law references.</p>
        </section>

        {/* Search Modal */}
        {searchOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={() => setSearchOpen(false)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="mb-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                Close
              </button>
              <SearchBar
                onSearch={(query) => {
                  alert(`Search functionality coming soon for: ${query}`);
                }}
              />
            </div>
          </div>
        )}

        {/* Legal Rights Modal */}
        <LegalRightsModal
          isOpen={rightsModalOpen}
          onClose={() => setRightsModalOpen(false)}
          rights={rightsData}
        />
      </main>

      {/* AI Chatbot */}
      <AIChatbot />

      {/* Footer with user reviews placeholder */}
      <footer className="mt-20 py-12 bg-gray-100 dark:bg-gray-900 text-center text-gray-700 dark:text-gray-300">
        <p className="text-lg font-semibold mb-4">User Reviews</p>
        <p className="italic text-gray-500 dark:text-gray-600">Be the first to review LegalHelp AI.</p>
        {/* Future dynamic user reviews will appear here */}
      </footer>
    </>
  );
};

export default Home;
