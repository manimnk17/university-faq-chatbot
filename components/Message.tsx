
import React from 'react';
import { ChatMessage, Sender } from '../types';
import { UserIcon } from './icons/UserIcon';
import { BotIcon } from './icons/BotIcon';
import { SearchIcon } from './icons/SearchIcon';

interface MessageProps {
    message: ChatMessage;
    isLoading: boolean;
}

const TypingIndicator = () => (
    <div className="flex items-center space-x-1 p-2">
        <span className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce"></span>
    </div>
);

export const Message: React.FC<MessageProps> = ({ message, isLoading }) => {
    const isUser = message.sender === Sender.User;

    const formattedText = message.text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .split('\n')
        .map((line, index) => <p key={index}>{line}</p>);

    return (
        <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <BotIcon className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                </div>
            )}
            <div className={`max-w-xl p-4 rounded-2xl ${
                isUser 
                    ? 'bg-indigo-600 text-white rounded-br-lg' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-lg'
            }`}>
                {isLoading ? (
                    <TypingIndicator />
                ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, '<br />') }} />
                )}
                {message.sources && message.sources.length > 0 && !isLoading && (
                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                        <h4 className="font-semibold text-xs mb-2 flex items-center gap-2">
                            <SearchIcon className="w-4 h-4 text-teal-500 dark:text-teal-400" />
                            <span>Sources from Web Search:</span>
                        </h4>
                        <ul className="space-y-1">
                            {message.sources.map((source, index) => (
                                <li key={index} className="text-xs truncate">
                                    <a 
                                        href={source.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-indigo-500 dark:text-indigo-400 hover:underline"
                                        title={source.title}
                                    >
                                        {source.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            {isUser && (
                 <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </div>
            )}
        </div>
    );
};
