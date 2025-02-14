import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "leaflet/dist/leaflet.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// we use the url for state management
// mostly for managing the ui (to store the ui state)
// open/ close panel, currently applied sort order ro list filter

// ADVANTAGES

// easy way to store state in the global place, accessible to all components in the app
// usually we store the state in the parent component, to be accessible by all components
// the we will do a large amount of prop drilling to get the state
// but by storing the state in the url, we will just get the state right from the url, GLOBALLY
// REDUCES PROP DRILLING

// good way to "pass" data from one page to the another page

// makes it possible that we can bookmark and share the page with the exact ui state it had at that instance of time
// for example, we can share a link with the current state of the app on the url
