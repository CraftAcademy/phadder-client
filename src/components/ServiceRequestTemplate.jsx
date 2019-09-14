import React from "react";
import { Container, Divider, Header, Placeholder } from "semantic-ui-react";
import "../css/style.css";

const RequestTemplate = props => {
  const serviceRequest = props.serviceRequest;
  return (
    <div id="user-service-request">
      <Container>
        <div id={`serviceRequest_${serviceRequest.id}`}>
          <Header size="medium" textAlign="left" id="title">
            {serviceRequest.title}
          </Header>
          <Header as="h5" textAlign="left" id="category">
            <p>Category: {serviceRequest.category}</p>
          </Header>
          <Placeholder.Paragraph id="details">
            {serviceRequest.details}
          </Placeholder.Paragraph>
          <Header as="h5" textAlign="left" id="budget">
            <p>Budget: {serviceRequest.budget}</p>
          </Header>
          <Header as="h5" textAlign="left" id="timeframe">
           <p>Timeframe: {serviceRequest.timeframe}</p>
          </Header>
          <Divider />
        </div>
      </Container>
    </div>
  );
};

export default RequestTemplate;
