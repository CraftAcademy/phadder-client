import React, { useState } from "react";
import { Container, Button } from "semantic-ui-react";
import BuyersExplain from "./BuyersExplain";
import SuppliersExplain from "./SuppliersExplain";
import SignUpClient from "./SignUpClient";
import SignUpSupplier from "./SignUpSupplier";
import { connect } from "react-redux";

const Home = props => {
  const [explain, setExplain] = useState(<BuyersExplain />);

  let signUp;
  let welcomeMessage; // to be removed when we install flash messages
  if (props.currentUser.isSignedIn === false) {
    signUp = <SignUpClient />;
  } else {
    signUp = "";
    welcomeMessage = `Welcome ${props.currentUser.attributes.firstName}!`; // to be removed when we install flash messages
  }

  return (
    <Container>
      <div>
        {welcomeMessage}
        {signUp}
        {<SignUpSupplier />}
      </div>
      <div>
        <Button
          id="buyers-button"
          onClick={() => setExplain(<BuyersExplain />)}
        >
          Buyers
        </Button>
        <Button
          id="suppliers-button"
          onClick={() => setExplain(<SuppliersExplain />)}
        >
          Suppliers
        </Button>
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

export default connect(mapStateToProps)(Home);
