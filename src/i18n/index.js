import React, { useReducer } from "react";

import EN from "./en/translation.json";
import SV from "./sv/translation.json";

const translations = {
  EN: EN,
  SV: SV,
};

const getTranslate = langCode => key => translations[langCode][key] || key;

const initialState = {
  langCode: "EN",
  translate: getTranslate("EN")
};

export const I18nContext = React.createContext(initialState);

export const I18nContextProvider = ({ children }) => {
  
  const reducer = (state, action) => {
    switch (action.type) {
      case "setLanguage":
        return {
          langCode: action.payload,
          translate: getTranslate(action.payload)
        };
      default:
        return { ...initialState };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <I18nContext.Provider value={{ ...state, dispatch }}>
      {children}
    </I18nContext.Provider>
  );
};
