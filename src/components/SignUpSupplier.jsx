import React, { useState } from "react";
import { Button, Form, Modal, Icon, Dropdown } from "semantic-ui-react";
import useForm from "react-hook-form";
import { connect } from "react-redux";
import { registerUser } from "../state/actions/reduxTokenAuthConfig";



const CompanyModal = props => {
  const [openModal, setOpenModal] = useState(false);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();

  const saveNewCompanyHandler = data => {
    debugger;
    const { registerUser } = props;
    const email = data.email;
    const password = data.password;
    registerUser({ email, password }).catch(error => {
      setError(error.response.data.errors); // will be changed when we implement flash messages
    });
  };

  return (
    <div>
      <Modal
        openModal={openModal}
        onOpen={setOpenModal}
        size="small"
        trigger={
          <Button primary icon>
            Proceed <Icon name="right chevron" />
          </Button>
        }
      >

        <Modal.Header>Fill in Company details</Modal.Header>
        <Modal.Content>
          {error}
          <Form id="company-form" onSubmit={handleSubmit(saveNewCompanyHandler)}>
            <Form.Field>
              <label>Company Name</label>
              <input
                id="company-name"
                name="companyName"
                ref={register({ required: true })}
              />
            </Form.Field>
            <Dropdown
              text="Provides service in"
              icon="filter"
              floating
              labeled
              button
              className="icon"
            >
              <Dropdown.Menu>
                <Dropdown.Header icon="tags" content="Filter by tag" />
                <Dropdown.Item>Accounting</Dropdown.Item>
                <Dropdown.Item>Cleaning Service</Dropdown.Item>
                <Dropdown.Item>Construction & Maintence</Dropdown.Item>
                <Dropdown.Item>Education</Dropdown.Item>
                <Dropdown.Item>Final Service</Dropdown.Item>
                <Dropdown.Item>Healthcare</Dropdown.Item>
                <Dropdown.Item>Insurance</Dropdown.Item>
                <Dropdown.Item>It Services</Dropdown.Item>
                <Dropdown.Item>Legal services</Dropdown.Item>
                <Dropdown.Item>Software Development</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Form.Field>
              <label>Street</label>
              <input
                id="street-name"
                name="streetName"
                ref={register({ required: true })}
              />
            </Form.Field>

            <Form.Field>
              <label>Postode</label>
              <input
                id="postcode"
                name="postcode"
                ref={register({ required: true })}
              />
            </Form.Field>

            <Form.Field>
              <label>City</label>
              <input
                id="city"
                name="cityName"
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

const SignUpSupplier = props => {
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <Modal trigger={<Button>Register as Supplier</Button>}>
        <Modal.Header>Join us!</Modal.Header>
        <Modal.Content>
          <Form id="signup-form"onSubmit={handleSubmit()}>
            <Form.Field>
              <label>Email</label>
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
            
            {/* <Button id="submit-account-button" type="submit">
              Sign Up
            </Button> */}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <CompanyModal />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default connect(
  null,
  { registerUser }
)(SignUpSupplier);
