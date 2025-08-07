import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const WIDGET_ROOT_ID = 'root'; // Standard React root ID

// This function can be called to embed the widget.
const initializeChatWidget = () => {
    let container = document.getElementById(WIDGET_ROOT_ID);

    // If a container isn't found, create one and append it to the body.
    // This makes the widget easily embeddable on any website.
    if (!container) {
        container = document.createElement('div');
        container.id = WIDGET_ROOT_ID;
        document.body.appendChild(container);
    }
    
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
};

// Automatically initialize the widget when the script loads.
initializeChatWidget();
