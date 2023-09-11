import React from "react";
import { Box } from "@mui/material";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./main.css";
import { AuthenticationRoutes, GlobalFeedRoutes } from "routes";
import NavBar from "components/Header/NavBar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContext } from "contexts/UserContext";
import { RecoilRoot } from "recoil";

function App() {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <UserContext>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Box className="App">
              <header className="App-header">
                <NavBar />
              </header>
              <GlobalFeedRoutes />
              <AuthenticationRoutes />
            </Box>
          </BrowserRouter>
        </QueryClientProvider>
      </UserContext>
    </RecoilRoot>
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
