import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import configuredStore from "./state/store/store";
import { verifyCredentials } from "./state/actions/reduxTokenAuthConfig";
import { initialize } from "redux-oauth";
import "./modules/capitalize";
import { I18nContextProvider } from "./i18n/index";

const reduxOauthConfig = {
  backend: {
    apiUrl: "https://www.phadder.com/api",
    signOutPath: null,
    authProviderPaths: {
      facebook: "/auth/facebook/"
    }
  },
  cookies: document.cookie,
  currentLocation: document.URL
};

const store = configuredStore;
verifyCredentials(store);
window.store = store;

store.dispatch(initialize(reduxOauthConfig)).then(() => {
  ReactDOM.render(
    <Router>
      <Provider store={store}>
        <I18nContextProvider>
          <App />
        </I18nContextProvider>
      </Provider>
    </Router>,

    document.getElementById("root")
  );
});
serviceWorker.unregister();
