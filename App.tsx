import React from 'react';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
  return (
    // This now simulates a host website where you would embed the chatbot.
    <div className="p-8 font-sans text-gray-800 dark:text-gray-100">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
            <h1 className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400">Exemplar University</h1>
            <p className="mt-2 text-xl text-gray-600 dark:text-gray-300">A Tradition of Excellence & Innovation</p>
        </header>

        <main>
            <section className="mb-10">
                <h2 className="text-3xl font-bold mb-4">Welcome to Our Campus</h2>
                <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    Welcome to our campus. Here you can find all the information you need about our world-class programs, streamlined admissions process, and vibrant campus life. We are dedicated to fostering the next generation of leaders and thinkers.
                </p>
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    If you have any questions, feel free to use our new AI Assistant! Just click the chat bubble in the bottom-right corner to get instant answers.
                </p>
            </section>
        </main>
      </div>

      {/* The ChatWidget is placed here and will position itself automatically. */}
      <ChatWidget />
    </div>
  );
};

export default App;