import React from "react";
import ReactDOM from "react-dom/client";
// The full variable build, so the SOFT and WONK axes are available - they
// are what give Fraunces its retro, slightly wonky serif character.
import "@fontsource-variable/fraunces/full.css";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);