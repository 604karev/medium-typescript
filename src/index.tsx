import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./main.css";
import { AuthenticationRoutes, GlobalFeedRoutes } from "routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <GlobalFeedRoutes />
          <AuthenticationRoutes />
        </header>
      </div>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
