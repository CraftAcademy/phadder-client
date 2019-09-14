import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import * as flashActions from "../state/actions/flashActions";
import { bindActionCreators } from "redux";
import { signOutUser } from "../state/actions/reduxTokenAuthConfig";

const LogOut = props => {
  const signOutHandler = e => {
    e.preventDefault();
    const { signOutUser } = props;
    signOutUser()
      .then(() => {
        props.flashActions.dispatchMessage(`You have successfully logged out.`, "success");
      })
  }

  return (
    <>
      <Menu.Item id="logout-button" as={Link} to="/" onClick={signOutHandler}>
        Log Out
      </Menu.Item>
    </>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOutUser: bindActionCreators(signOutUser, dispatch),
    flashActions: bindActionCreators(flashActions, dispatch)
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LogOut)
);
