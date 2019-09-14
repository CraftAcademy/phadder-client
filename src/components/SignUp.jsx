import React, { useContext } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import useForm from "react-hook-form";
import { connect } from "react-redux";
import * as flashActions from "../state/actions/flashActions";
import { bindActionCreators } from "redux";
import { registerUser } from "../state/actions/reduxTokenAuthConfig";
import "../css/style.css";
import { I18nContext } from "../i18n/index";

const SignUp = props => {
  const { register, handleSubmit } = useForm();
  const { translate } = useContext(I18nContext);

  const saveNewUserHandler = (data, e) => {
    e.preventDefault();
    const { registerUser } = props;
    const { email, first_name, last_name, password } = data;
    registerUser({ email, first_name, last_name, password })
      .then(() => {
        props.flashActions.dispatchMessage(`Welcome to Phadder!`, "success");
      })
      .catch(error => {
        props.flashActions.dispatchMessage(error.response.data.errors, "error");
      });
  };

  return (
    <div>
      <Modal
        trigger={<Button id="sign-up-button">{translate("signup")}</Button>}
        centered={false}
      >
        <Modal.Header id="signup-title">
          {translate("signup-header")}
        </Modal.Header>
        <Modal.Content>
          <Form id="signup-form" onSubmit={handleSubmit(saveNewUserHandler)}>
            <Form.Field>
              <label id="signup-label">{translate("first_name")}</label>
              <input
                id="first-name"
                name="firstName"
                ref={register({ required: true })}
              />
            </Form.Field>

            <Form.Field>
              <label id="signup-label">{translate("last_name")}</label>
              <input
                id="last-name"
                name="lastName"
                ref={register({ required: true })}
              />
            </Form.Field>

            <Form.Field>
              <label id="signup-label">Email</label>
              <input
                id="email"
                name="email"
                ref={register({ required: true })}
              />
            </Form.Field>

            <Form.Field>
              <label id="signup-label">{translate("password")}</label>
              <input
                id="password"
                name="password"
                type="password"
                ref={register({ required: true })}
              />
            </Form.Field>

            <Form.Field>
              <label id="signup-label">
                {translate("password_confirmation")}
              </label>
              <input
                id="password-confirmation"
                name="passwordConfirmation"
                type="password"
                ref={register({ required: true })}
              />
            </Form.Field>

            <Button id="submit-account-button" type="submit">
              {translate("signup-button")}
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: bindActionCreators(registerUser, dispatch),
    flashActions: bindActionCreators(flashActions, dispatch)
  };
};

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
