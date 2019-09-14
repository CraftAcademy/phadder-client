import React, { useContext } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import useForm from "react-hook-form";
import { connect } from "react-redux";
import * as flashActions from "../state/actions/flashActions";
import { bindActionCreators } from "redux";
import { signInUser } from "../state/actions/reduxTokenAuthConfig";
import OauthButton from './OuthButton'
import { I18nContext } from "../i18n/index";
import "../css/style.css";


const LogIn = props => {
  const { register, handleSubmit } = useForm();
  const { translate } = useContext(I18nContext);

  const loginHandler = (data, e) => {
    e.preventDefault();
    const { email, password } = data;
    const role = "end_user"
    props
      .signInUser({ email, password, role })
      .then(() => {
        props.flashActions.dispatchMessage(`Welcome to Phadder!`, "success");
      })
      .catch(error => {
        props.flashActions.dispatchMessage(error.response.data.errors, "error");
      });
  };
  return (
    <>
      <Modal
        trigger={<Button id="login-button">{translate("login")}</Button>}
        centered={false}
      >
        <Modal.Header id="login-title">
          {translate("existing_user")}
        </Modal.Header>
        <Modal.Content>
          <Form id="login-form" onSubmit={handleSubmit(loginHandler)}>
            <Form.Field>
              <label id="login-label">Email</label>
              <input
                id="email"
                name="email"
                ref={register({ required: true })}
              />
            </Form.Field>
            <Form.Field>
              <label id="login-label">{translate("password")}</label>
              <input
                id="password"
                name="password"
                type="password"
                ref={register({ required: true })}
              />
            </Form.Field>
            <Button id="login-form-submit" type="submit">
              {translate("login")}
            </Button>
            <OauthButton provider="facebook">
              {translate("log_in_with_facebook")}
            </OauthButton>
          </Form>
        </Modal.Content>
      </Modal>
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
    signInUser: bindActionCreators(signInUser, dispatch),
    flashActions: bindActionCreators(flashActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
