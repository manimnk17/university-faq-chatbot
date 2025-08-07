import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, Sender } from '../types';
import { getChatbotResponseStream, getGroundedResponse } from '../services/geminiService';
import { UserIcon } from './icons/UserIcon';
import { BotIcon } from './icons/BotIcon';
import { SendIcon } from './icons/SendIcon';
import { Message } from './Message';
import { SearchIcon } from './icons/SearchIcon';
import { XIcon } from './icons/XIcon';

type SearchMode = 'faq' | 'web';

export default function ChatInterface() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [searchMode, setSearchMode] = useState<SearchMode>('faq');
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    
    useEffect(() => {
        setMessages([
            {
                id: 'initial-bot-message',
                sender: Sender.Bot,
                text: `Hello! I'm the University AI Assistant. How can I help you today? You can ask me about our FAQ or switch to a web search for recent news.`
            }
        ]);
    }, []);

    const handleSendMessage = useCallback(async () => {
        const trimmedInput = input.trim();
        if (!trimmedInput || isLoading) return;

        const newUserMessage: ChatMessage = { id: Date.now().toString(), sender: Sender.User, text: trimmedInput };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);

        const newBotMessageId = (Date.now() + 1).toString();
        
        setMessages(prev => [...prev, { id: newBotMessageId, sender: Sender.Bot, text: '', sources: [] }]);

        try {
            if (searchMode === 'faq') {
                const chatHistory = messages
                    .filter(m => m.sender === Sender.User || (m.sender === Sender.Bot && m.id !== 'initial-bot-message'))
                    .map(m => ({
                        role: m.sender === Sender.User ? 'user' : 'model',
                        parts: [{ text: m.text }]
                    }));
                
                const stream = await getChatbotResponseStream(trimmedInput, chatHistory);
                
                let accumulatedText = '';
                for await (const chunk of stream) {
                    accumulatedText += chunk.text;
                    setMessages(prev => prev.map(msg => 
                        msg.id === newBotMessageId ? { ...msg, text: accumulatedText } : msg
                    ));
                }
            } else { // web search mode
                const { text, sources } = await getGroundedResponse(trimmedInput);
                setMessages(prev => prev.map(msg => 
                    msg.id === newBotMessageId ? { ...msg, text, sources } : msg
                ));
            }
        } catch (error) {
            console.error(error);
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            setMessages(prev => prev.map(msg => 
                msg.id === newBotMessageId ? { ...msg, text: `Sorry, something went wrong. ${errorMessage}` } : msg
            ));
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, messages, searchMode]);

    const handleToggleSearchMode = () => {
        const newMode = searchMode === 'faq' ? 'web' : 'faq';
        setSearchMode(newMode);
        const modeText = newMode === 'web' ? 'Web Search Activated: I will now search the web for recent information.' : 'FAQ Mode Activated: I will answer based on the university knowledge base.';
        
        setMessages(prev => [...prev, {
            id: `mode-switch-${Date.now()}`,
            sender: Sender.Bot,
            text: modeText,
        }]);
    };
    
    const exampleQuestions = [
        "How do I apply for financial aid?",
        "What is the student-to-faculty ratio?",
        "Tell me about on-campus housing.",
    ];
    
    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 overflow-hidden">
            <header className="flex-shrink-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-full">
                        <BotIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">University Assistant</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Your AI-powered guide</p>
                    </div>
                </div>
            </header>

            <div id="chat-window" className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                    {messages.map((msg) => (
                        <Message key={msg.id} message={msg} isLoading={isLoading && msg.sender === Sender.Bot && msg.text === ''} />
                    ))}
                    <div ref={chatEndRef} />
                </div>
                {messages.length <= 1 && (
                     <div className="text-center py-8">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Or try an example question:</h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {exampleQuestions.map((q, i) => (
                                <button key={i} onClick={() => setInput(q)} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-full text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            <div className="flex-shrink-0 p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                <div className="relative">
                    <button 
                        onClick={handleToggleSearchMode}
                        title={`Switch to ${searchMode === 'faq' ? 'Web Search' : 'FAQ Mode'}`}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        {searchMode === 'faq' ? 
                            <BotIcon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" /> : 
                            <SearchIcon className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                        }
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={searchMode === 'faq' ? "Ask about admissions, tuition, etc." : "Search the web for university news..."}
                        className="w-full pl-14 pr-24 py-3 text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                        disabled={isLoading}
                    />
                    {input && (
                        <button 
                            onClick={() => setInput('')} 
                            className="absolute right-16 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                    )}
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading || !input.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white rounded-full p-3 disabled:bg-indigo-300 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        <SendIcon className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </div>
    );
}