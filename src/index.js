import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./store/Store";
import { MaterialUIControllerProvider } from "./context/index.js";
import { ThemeProvider } from "styled-components";
import theme from "./assets/theme/index.js";
import { registerLicense } from '@syncfusion/ej2-base';
import { ContextProvider } from "./context/ContextProvider.js";
registerLicense('License Key');

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <MaterialUIControllerProvider>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ContextProvider>
    </MaterialUIControllerProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
