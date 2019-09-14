import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import * as locationActions from "../state/actions/locationActions";
import { bindActionCreators } from "redux";
import "../css/style.css";
import axios from "axios";
import CreateRequest from "./CreateRequest";
import { I18nContext } from "../i18n/index";

const CityFetcher = props => {
  const [location, setLocation] = useState();
  const [nextModal, setNextModal] = useState();
  const { translate } = useContext(I18nContext);

  const getLocation = async val => {
    try {
      let response = await axios.post(
        "http://localhost:3000/api/post_code_queries",
        { post_code: val }
      );
      if (response.status === 200) {
        props.locationActions.updateUserLocation(`${response.data.message}`);
        setLocation(response.data.message);
        setNextModal(<CreateRequest />);
      }
    } catch (error) {
      setLocation(error.response.data.message);
    }
  };
  const onChangeHandler = e => {
    const val = e.target.value;
    let regex = /[0-9]|\s/;
    if (val.length >= 5 && regex.test(val)) {
      getLocation(val);
    }
  };

  return (
    <Modal
      size="mini"
      trigger={<Button id="get-location-button">{translate("create-a-req-button")}</Button>}
    >
      <Modal.Header id="location-title">
        Step 1: Enter your post code
      </Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Field>
              <input
                id="post-code-input"
                placeholder="Enter your post code"
                type="number"
                onChange={e => {
                  onChangeHandler(e);
                }}
              />
            </Form.Field>
          </Form>
        </Modal.Description>
        <div>{location}</div>
        {nextModal}
        <Button id="cancel-cityfetch-modal">Cancel</Button>
      </Modal.Content>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    locationActions: bindActionCreators(locationActions, dispatch)
  };
};

const mapStateToProps = state => {
  return {
    location: state.location
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityFetcher);
