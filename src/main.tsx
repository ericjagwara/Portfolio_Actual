import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Handle GitHub Pages SPA redirect
// This handles the redirect from 404.html
(function() {
  const l = window.location;
  if (l.search[1] === '/') {
    const decoded = l.search.slice(1).split('&').map(s => s.replace(/~and~/g, '&')).join('?');
    window.history.replaceState(null, '', l.pathname.slice(0, -1) + decoded + l.hash);
  }
})();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
