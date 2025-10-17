import { useState, useEffect, useRef } from 'react';

type LanguageCode =
  | 'en'
  | 'hi'
  | 'ta'
  | 'te'
  | 'bn'
  | 'mr'
  | 'kn'
  | 'gu'
  | 'or'
  | 'ml'
  | 'pa';

const LANGUAGE_MAP: Record<LanguageCode, string> = {
  en: 'English',
  hi: 'हिंदी',
  ta: 'தமிழ்',
  te: 'తెలుగు',
  bn: 'বাংলা',
  mr: 'मराठी',
  kn: 'ಕನ್ನಡ',
  gu: 'ગુજરાતી',
  or: 'ଓଡ଼ିଆ',
  ml: 'മലയാളം',
  pa: 'ਪੰਜਾਬੀ',
};

interface ChatMessage {
  id: string;
  author: 'user' | 'bot';
  text: string;
  timestamp: number;
}

export default function AIChatbot() {
  const [visible, setVisible] = useState(false);
  const [languageSelect, setLanguageSelect] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, visible]);

  useEffect(() => {
    // Load history and language from localStorage
    const savedLang = localStorage.getItem('lh_chat_lang');
    const savedHistory = localStorage.getItem('lh_chat_history');
    if (savedLang && LANGUAGE_MAP[savedLang as LanguageCode]) {
      setSelectedLanguage(savedLang as LanguageCode);
      setLanguageSelect(false);
    }
    if (savedHistory) {
      setMessages(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lh_chat_lang', selectedLanguage);
    localStorage.setItem('lh_chat_history', JSON.stringify(messages));
  }, [selectedLanguage, messages]);

  // Voice to text setup
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = selectedLanguage;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = (event) => {
        if (event.results.length > 0) {
          const transcript = event.results[0][0].transcript;
          setInputText((prev) => (prev ? prev + ' ' + transcript : transcript));
        }
        setListening(false);
        recognitionRef.current?.stop();
      };
      recognitionRef.current.onerror = () => setListening(false);
    }
    // Clean-up on unmount
    return () => recognitionRef.current?.stop();
  }, [selectedLanguage]);

  const startListening = () => {
    if (recognitionRef.current && !listening) {
      recognitionRef.current.lang = selectedLanguage;
      recognitionRef.current.start();
      setListening(true);
    }
  };

  // Simulated AI response for demo (replace with OpenAI calls in backend)
  const sendMessage = async () => {
    if (!inputText.trim()) return;
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      author: 'user',
      text: inputText.trim(),
      timestamp: Date.now(),
    };
    setMessages((msgs) => [...msgs, userMsg]);
    setInputText('');

    // Simulate delay
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: crypto.randomUUID(),
        author: 'bot',
        text: `Response to \"${userMsg.text}\" in ${LANGUAGE_MAP[selectedLanguage]}`,
        timestamp: Date.now(),
      };
      setMessages((msgs) => [...msgs, botMsg]);
    }, 1500);
  };

  if (!visible) {
    return (
      <button
        aria-label="Open legal help chatbot"
        onClick={() => setVisible(true)}
        className="fixed bottom-6 right-6 bg-transparent p-2 rounded-full shadow-lg hover:scale-110 transition-transform focus:outline-none"
        style={{ width: 56, height: 56, zIndex: 10000 }}
      >
        {/* Transparent robot head icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="#6d28d9"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="w-10 h-10"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v4m0 4v2m-6-2v2m12-2v2m-9-4h6m-7 6h8a4 4 0 01-8 0z" />
        </svg>
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-xl flex flex-col"
      style={{ width: 540, maxHeight: 720, zIndex: 10000 }}
    >
      <header className="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-primary cursor-default select-none">LegalHelp AI Chat</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setVisible(false);
              setLanguageSelect(true);
              setMessages([]);
              localStorage.removeItem('lh_chat_history');
            }}
            aria-label="Clear chat and close"
            className="text-gray-600 dark:text-gray-300 hover:text-red-600 transition-opacity"
            title="Clear chat and close"
          >
            ✕
          </button>
        </div>
      </header>

      {languageSelect ? (
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Select Language</h3>
          <div className="grid grid-cols-2 gap-4 max-h-64 overflow-auto">
            {(Object.entries(LANGUAGE_MAP) as [LanguageCode, string][]).map(([code, name]) => (
              <button
                key={code}
                className="p-3 rounded-lg bg-primary text-white hover:bg-primary-dark focus:outline-none"
                onClick={() => {
                  setSelectedLanguage(code);
                  setLanguageSelect(false);
                }}
                aria-label={`Select language ${name}`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <main className="flex flex-col flex-grow overflow-hidden">
          <div
            id="chat-messages"
            className="flex-grow p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100 dark:scrollbar-track-gray-800"
          >
            {messages.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400 text-center mt-6 select-none">Start your legal query below.</p>
            )}
            {messages.map(({ id, author, text }) => (
              <div
                key={id}
                className={`max-w-[75%] break-words rounded-lg p-3 ${
                  author === 'user' ? 'bg-primary text-white self-end' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 self-start'
                }`}
                aria-label={author === 'user' ? 'User message' : 'Bot response'}
              >
                {text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center p-4 border-t border-gray-300 dark:border-gray-600"
          >
            <button
              type="button"
              onClick={startListening}
              className={`mr-3 p-2 rounded-full border border-primary text-primary focus:outline-none ${
                listening ? 'bg-primary text-white' : ''
              }`}
              aria-label="Start voice input"
              title="Start voice input"
            >
              🎤
            </button>
            <input
              type="text"
              placeholder="Type your question here..."
              aria-label="Type your question"
              className="flex-grow rounded-full border border-gray-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              autoFocus
            />
            <button
              type="submit"
              aria-label="Send message"
              className="ml-4 bg-primary hover:bg-primary-dark text-white rounded-full px-6 py-2 font-semibold focus:outline-none"
            >
              Send
            </button>
          </form>

          <footer className="p-2 text-center text-xs text-gray-500 dark:text-gray-400 select-none">
            Language: {LANGUAGE_MAP[selectedLanguage]} &nbsp;|&nbsp; Chat history saved until page refresh
          </footer>

          <div className="p-2 flex justify-between text-xs text-gray-400 dark:text-gray-500 select-none">
            <button onClick={() => setLanguageSelect(true)} className="underline">
              Change Language
            </button>
            <button
              onClick={() => {
                setMessages([]);
                localStorage.removeItem('lh_chat_history');
              }}
              className="underline"
            >
              Clear Chat
            </button>
          </div>
        </main>
      )}
    </div>
  );
}
