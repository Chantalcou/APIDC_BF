// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom"; // Solo usamos uno
import { store } from "./redux/store";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

// Cambia ReactDOM.render a createRoot
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <Auth0Provider
        domain="dev-tqgfoevs4h6wlt5q.us.auth0.com"
        clientId="8KX5NG5JLM5pdOJYuYkFZTRGtOs53t2v"
        useRefreshTokens={true} // Activa Refresh Tokens
        // cacheLocation="localstorage"
        cacheLocation='https://apidc.ong'
        authorizationParams={{
          redirect_uri: `${window.location.origin}`,
        }}
      >
        <Router>
          <App />
        </Router>
      </Auth0Provider>
    </React.StrictMode>
  </Provider>
);
