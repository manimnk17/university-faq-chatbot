
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, Sender } from '../types';
import { getChatbotResponseStream, getGroundedResponse } from '../services/geminiService';
import { getCustomerConfig } from '../data/customerData';
import { UserIcon } from './icons/UserIcon';
import { BotIcon } from './icons/BotIcon';
import { SendIcon } from './icons/SendIcon';
import { Message } from './Message';
import { SearchIcon } from './icons/SearchIcon';
import { XIcon } from './icons/XIcon';

type SearchMode = 'faq' | 'web';

interface ChatInterfaceProps {
    customerId: string | null;
}

export default function ChatInterface({ customerId }: ChatInterfaceProps) {
    const config = getCustomerConfig(customerId);
    const LogoComponent = config.logo;

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
        // This effect runs when the config changes (i.e., customerId changes)
        // It resets the chat with a customer-specific welcome message.
        setMessages([
            {
                id: 'initial-bot-message',
                sender: Sender.Bot,
                text: `Hello! I'm the ${config.name}. How can I help you today? You can ask me about our FAQ or switch to a web search for recent news.`
            }
        ]);
    }, [config]);

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
                
                // Pass the customerId to the service
                const stream = await getChatbotResponseStream(trimmedInput, chatHistory, customerId);
                
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
    }, [input, isLoading, messages, searchMode, customerId]);

    const handleToggleSearchMode = () => {
        const newMode = searchMode === 'faq' ? 'web' : 'faq';
        setSearchMode(newMode);
        const modeText = newMode === 'web' ? 'Web Search Activated: I will now search the web for recent information.' : 'FAQ Mode Activated: I will answer based on our knowledge base.';
        
        setMessages(prev => [...prev, {
            id: `mode-switch-${Date.now()}`,
            sender: Sender.Bot,
            text: modeText,
        }]);
    };
    
    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-800 overflow-hidden">
            <header className="flex-shrink-0 bg-white dark:bg-gray-800/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${config.theme.iconBg} ${config.theme.dark.iconBg}`}>
                        <LogoComponent className={`w-6 h-6 ${config.theme.iconFill} ${config.theme.dark.iconFill}`} />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">{config.name}</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{config.tagline}</p>
                    </div>
                </div>
            </header>

            <div id="chat-window" className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                    {messages.map((msg) => (
                        <Message key={msg.id} message={msg} isLoading={isLoading && msg.sender === Sender.Bot && msg.text === ''} theme={config.theme} />
                    ))}
                    <div ref={chatEndRef} />
                </div>
                {messages.length <= 1 && (
                     <div className="text-center py-8">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Or try an example question:</h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {config.exampleQuestions.map((q, i) => (
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
                            <BotIcon className={`w-5 h-5 ${config.theme.iconFill} ${config.theme.dark.iconFill}`} /> : 
                            <SearchIcon className="w-5 h-5 text-teal-500 dark:text-teal-400" />
                        }
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={searchMode === 'faq' ? config.placeholder : "Search the web for recent news..."}
                        className={`w-full pl-14 pr-24 py-3 text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 ${config.theme.ring}`}
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
                        className={`absolute right-2 top-1/2 -translate-y-1/2 text-white rounded-full p-3 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${config.theme.primary} ${config.theme.primaryHover} ${config.theme.primaryDisabled} ${config.theme.dark.primaryDisabled} ${config.theme.ring}`}
                    >
                        <SendIcon className="w-5 h-5"/>
                    </button>
                </div>
            </div>
        </div>
    );
}
