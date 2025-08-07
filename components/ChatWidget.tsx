
import React, { useState, useEffect } from 'react';
import ChatInterface from './ChatInterface';
import { BotIcon } from './icons/BotIcon';
import { XIcon } from './icons/XIcon';
import { getCustomerConfig } from '../data/customerData';

interface ChatWidgetProps {
    customerId: string | null;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ customerId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const config = getCustomerConfig(customerId);

    const toggleChat = () => setIsOpen(!isOpen);
    
    // Close chat on 'Escape' key press
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
              setIsOpen(false);
           }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <div 
            className="fixed bottom-5 right-5 z-50 flex flex-col items-end"
            aria-live="polite"
        >
            {/* Chat Panel */}
            <div 
                className={`w-[calc(100vw-40px)] sm:w-[400px] h-[70vh] max-h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out transform origin-bottom-right ${config.theme.font} ${isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0 pointer-events-none'}`}
            >
               <ChatInterface customerId={customerId} />
            </div>

            {/* Chat Bubble / Toggle Button */}
            <button
                onClick={toggleChat}
                className={`w-16 h-16 rounded-full text-white flex items-center justify-center shadow-lg transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900 mt-4 ${config.theme.primary} ${config.theme.primaryHover} ${config.theme.ring}`}
                aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
                aria-expanded={isOpen}
            >
                {isOpen ? <XIcon className="w-8 h-8" /> : <BotIcon className="w-8 h-8" />}
            </button>
        </div>
    );
};

export default ChatWidget;
