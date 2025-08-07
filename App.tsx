import React from 'react';
import ChatWidget from './components/ChatWidget';

/**
 * The main App component now solely renders the ChatWidget.
 * This refactoring turns the project into a focused, embeddable chat widget
 * application, removing the previous example host-page content. The ChatWidget
 * is completely self-contained and handles its own UI and state.
 */
const App: React.FC = () => {
  return (
    <ChatWidget />
  );
};

export default App;
