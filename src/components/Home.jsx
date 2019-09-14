import React, { useState, useContext } from "react";
import { Container, Button } from "semantic-ui-react";
import BuyersExplain from "./BuyersExplain";
import SuppliersExplain from "./SuppliersExplain";
import SignUp from "./SignUp";
import CreateRequest from "./CreateRequest";
import { connect } from "react-redux";
import * as flashActions from "../state/actions/flashActions";
import { bindActionCreators } from "redux";
import "../css/style.css";
import { I18nContext } from "../i18n/index";
import CityFetcher from "./CityFetcher";

const Home = props => {
  const [explain, setExplain] = useState(<BuyersExplain />);
  const { translate } = useContext(I18nContext);

  let signUpActions;
  !props.currentUser.isSignedIn && (signUpActions = <SignUp />);

  return (
    <Container>
      <div id="cover">
        <div id="cover-info">
          <div id="main-actions-title">{translate("cover_title")}</div>
          <div id="main-actions-info">{translate("cover_info")}</div>

          <div id="main-actions">
            {signUpActions}

            <CityFetcher />
          </div>
        </div>
      </div>
      <div id="explain-selector">
        <div id="buyer-button-div">
          <Button
            id="buyers-button"
            onClick={() => setExplain(<BuyersExplain />)}
          >
            {translate("buyers-button")}
          </Button>
        </div>
        <div id="supplier-button-div">
          <Button
            id="suppliers-button"
            onClick={() => setExplain(<SuppliersExplain />)}
          >
            {translate("suppliers-button")}
          </Button>
        </div>
      </div>
      {explain}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(flashActions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
