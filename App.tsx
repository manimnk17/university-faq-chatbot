import React from 'react';
import ChatWidget from './components/ChatWidget';

interface AppProps {
  customerId: string | null;
}

/**
 * The main App component now solely renders the ChatWidget.
 * It passes the customerId down to the widget to allow for dynamic configuration.
 */
const App: React.FC<AppProps> = ({ customerId }) => {
  return (
    <ChatWidget customerId={customerId} />
  );
};

export default App;
