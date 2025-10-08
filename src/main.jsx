import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Global styles
const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'IBM Plex Mono', 'Monaco', 'Courier New', monospace;
    line-height: 1.6;
    font-size: 14px;
    min-height: 100vh;
  }
`;

// Inject global styles
const styleSheet = document.createElement("style");
styleSheet.textContent = globalStyles;
document.head.appendChild(styleSheet);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
