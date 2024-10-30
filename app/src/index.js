import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import App from "./components/App/App";
import * as serviceWorker from "./serviceWorker";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the provider
import config from "./config"; // Import your config

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={config.googleClientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
