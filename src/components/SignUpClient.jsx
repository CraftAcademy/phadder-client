import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import useForm from "react-hook-form";
import { connect } from "react-redux";
import { registerUser } from "../state/actions/reduxTokenAuthConfig";

const SignUpClient = props => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();

  const saveNewUserHandler = data => {
    const { registerUser } = props;
    const email = data.email;
    const firstName = data.firstName;
    const password = data.password;
    registerUser({ email, firstName, password }).catch(error => {
      setError(error.response.data.errors); // will be changed when we implement flash messages
    });
  };

  return (
    <div>
      <Modal
        trigger={
          <Button
            id="sign-up-button"
          >
            REGISTER AS A CLIENT
          </Button>
        }
        centered={false}
      >
        <Modal.Header>Join us!</Modal.Header>
        <Modal.Content>
          {error}
          <Form id="signup-form" onSubmit={handleSubmit(saveNewUserHandler)}>
            <Form.Field>
              <label>First Name</label>
              <input
                id="first-name"
                name="firstName"
                ref={register({ required: true })}
              />
            </Form.Field>

            <Form.Field>
              <label>Last Name</label>
              <input
                id="last-name"
                name="lastName"
                ref={register({ required: true })}
              />
            </Form.Field>

            <Form.Field>
              <label>Email Adress</label>
              <input
                id="email"
                name="email"
                ref={register({ required: true })}
              />
            </Form.Field>

            <Form.Field>
              <label>Password</label>
              <input
                id="password"
                name="password"
                type="password"
                ref={register({ required: true })}
              />
            </Form.Field>

            <Form.Field>
              <label>Password Confirmation</label>
              <input
                id="password-confirmation"
                name="passwordConfirmation"
                type="password"
                ref={register({ required: true })}
              />
            </Form.Field>

            <Button id="submit-account-button" type="submit">
              Sign Up
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default connect(
  null,
  { registerUser }
)(SignUpClient);
