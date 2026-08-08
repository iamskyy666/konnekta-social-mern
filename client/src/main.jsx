import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/react";
import { Provider } from "react-redux"; // to use redux everywhere
import { store } from "./app/store.js";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("🔴 Missing Clerk Publishable-key!");
}

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <Provider store={store}>
        <StrictMode>
          <App />
        </StrictMode>
      </Provider>
    </BrowserRouter>
  </ClerkProvider>,
);
