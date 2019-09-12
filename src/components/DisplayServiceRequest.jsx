import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import axios from 'axios'
import RequestTemplate from "./ServiceRequestTemplate"
 

const DisplayServiceRequest = () => {
 const [showRequest, setShowRequest] = useState(false)
 const [serviceRequests, setServiceRequest] = useState()
 const [errorMessage, setErrorMessage] = useState()
 let usersRequests
  
 const getServiceRequest = async e => {
  try {
    const response = await axios.get("http://localhost:3000/api/service_request")
    if (response.data.length > 0) {
      setServiceRequest(response.data)
      setShowRequest(true)
    }
    } catch (error) { 
      setErrorMessage(error.response.date)
  }
}

if (showRequest === true) {
 usersRequests = (
    <div id="service-request">
    <h1>Service Requests</h1>
    {serviceRequests.map(serviceReguest => {
      return <RequestTemplate key={serviceReguest.id} serviceReguest={serviceReguest} />
    })}
  </div>  
)}

  return (
    <>
    <Button id="my-requests-button" onClick={(e) => getServiceRequest(e)}>My requests</Button>
    {usersRequests}
    {errorMessage}
    </>
  )
}

export default DisplayServiceRequest;