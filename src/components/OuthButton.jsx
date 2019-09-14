import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from "semantic-ui-react";
import { oAuthSignIn } from 'redux-oauth';
import { dispatchMessage } from "../state/actions/flashActions";
import { verifyCredentials } from "../state/actions/reduxTokenAuthConfig";
import { bindActionCreators } from "redux";
import configuredStore from '../state/store/store';
import "../css/style.css";


class OauthButton extends Component {
  handleClick = () => {
    const { provider, oAuthSignIn } = this.props;
    oAuthSignIn({ provider })
      .then(() => {
        this.props.auth
          .getIn(['headers'])
          .forEach((value, key) => { localStorage.setItem(key, value) })
        verifyCredentials(configuredStore)
      })
  };

  render() {
    const { disabled, loading, provider } = this.props;
    return (
      <Button
        id="facebook-login"
        loading={loading}
        icon={`${provider}`}
        className={`${provider}`}
        disabled={disabled}
        onClick={this.handleClick}
        content={`Log in with ${this.props.provider.capitalize()}`}
      />
    );
  }
}

const mapStateToProps = ({ auth }, ownProps) => {

  const disabled = auth.getIn(['user', 'isSignedIn']);
  const loading = auth.getIn(['oAuthSignIn', ownProps.provider, 'loading']);
  return {
    auth,
    disabled,
    loading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchMessage: bindActionCreators(dispatchMessage, dispatch),
    oAuthSignIn: bindActionCreators(oAuthSignIn, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps)(OauthButton)