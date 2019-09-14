import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import "../css/style.css";
import { I18nContext } from "../i18n/index";

const LanguageSelect = props => {
  const { langCode, dispatch, translate } = useContext(I18nContext);

  const onLanguageSelect = e =>
    dispatch({ type: "setLanguage", payload: e.target.value });

  const renderOption = (code, display) => (
    <button
      id="language-button"
      className={code}
      onClick={onLanguageSelect}
      value={code}
      selected={code === langCode}
    >
      {display}
    </button>
  );

  let english = translate("english");
  let swedish = translate("swedish");

  return (
    <div id="language-select">
      <Button id="drop-button">{translate("language")}</Button>
      <div id="language-options">
        {renderOption("EN", english)}
        {renderOption("SV", swedish)}
      </div>
    </div>
  );
};

export default LanguageSelect;
