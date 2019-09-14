import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import axios from "axios";
import RequestTemplate from "./ServiceRequestTemplate";
import { connect } from "react-redux";
import "../css/style.css";



const DisplayServiceRequest = props => {
  const [showRequest, setShowRequest] = useState(false);
  const [serviceRequests, setServiceRequest] = useState();
  const [errorMessage, setErrorMessage] = useState();
  let usersRequests;

  const getServiceRequest = async e => {
    try {
      const response = await axios.get(`http://localhost:3000/api/service_request`
      );
      if (response.data.length > 0) {
        setServiceRequest(response.data);
        setShowRequest(!showRequest);
      }
    } catch (error) {
      setErrorMessage("You don't have any service request at the moment.")
    }
  };

  if (showRequest === true) {
    usersRequests = (
      <div id="service-request">
        <div id="service-requests-bar"></div>
          <h1 id="service-request-title">Service Requests</h1>
          <div id="handle-requests-buttons">
              <Button id="request-activity">ACTIVITY</Button>
              <Button id="request-pening">PENDING REQUESTS</Button>
              <Button id="request-deals">DEALS</Button>
          </div>
        {serviceRequests.map(serviceRequest => {
          return (
            <RequestTemplate
              key={serviceRequest.id}
              serviceRequest={serviceRequest}
            />
          );
        })}
      </div>
    );
  }

  return (
    <>
      <Button id="my-requests-button" onClick={e => getServiceRequest(e)}>
        My requests
      </Button>
      {usersRequests}
      {errorMessage}
    </>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  };
};

export default connect(mapStateToProps)(DisplayServiceRequest);
