import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import * as modalActions from "../state/actions/modalActions";
import * as flashActions from "../state/actions/flashActions";
import { bindActionCreators } from "redux";
import { Button, Form, Modal, Checkbox } from "semantic-ui-react";
import useForm from "react-hook-form";
import { saveRequest } from "../modules/saveRequest";
import axios from 'axios';
import { I18nContext } from "../i18n/index";

const CreateRequest = props => {
  const { translate } = useContext(I18nContext);
  props.showCreateServiceRequestModal();
  const { register, handleSubmit } = useForm();
  const [ liveLanguage, setLiveLanguage ] = useState();
  const [selectedPicture, setSelectedPicture] = useState();
  


  const saveServiceRequestHandler = async data => {
    const { title, category, details, budget, time_frame } = data;
    const location = props.location
    let response = await saveRequest(
      title,
      category,
      details,
      budget,
      time_frame,
      selectedPicture,
      location
    );
    if (response.status === 200) {
      props.dispatchMessage(response.data.message, "success");
      props.hideCreateServiceRequestModal();
    } else {
      props.dispatchMessage(response.data.errors, "error");
    }
  };

  const getLanguage = async val => {
    try {
      let response = await axios.post(
        "http://localhost:3000/api/language_queries",
        { content: val }
      );
      if (response.status === 200) {
        setLiveLanguage(response.data.message);
        document.getElementById(`${response.data.lang_code}`).checked = true;
      }
    } catch (error) {};
  };

  const onChangeHandler = e => {
    const val = e.target.value;
    if (val.length === 20) {
      getLanguage(val);
    }
  };

  const toBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  const fileUploadHandler = async event => {
    const file = event.target.files[0];
    let convertedFile = await toBase64(file);
    setSelectedPicture(convertedFile);
  };

  return (
    <>
      {props.showModal && (
        <Modal
          centered={false}
          trigger={
            <Button
              onClick={() => props.showCreateServiceRequestModal()}
              id="create-request-button"
            >
              {translate("continue-with-request")}
            </Button>
          }
        >
          <Modal.Header id="create-request-title">
            {translate("create_request_header")}
          </Modal.Header>
          <Modal.Content>
            <Form
              id="request-form"
              onSubmit={handleSubmit(saveServiceRequestHandler)}
            >
              <Form.Field>
                <label id="create-request-label">{translate("title")}</label>
                <input
                  id="title"
                  name="title"
                  ref={register({ required: true })}
                />
              </Form.Field>

              <Form.Field>
                <label id="create-request-label">{translate("category")}</label>
                <select
                  id="category"
                  name="category"
                  ref={register({ required: true })}
                >
                  <option className="options">
                    {translate("please_choose")}
                  </option>
                  <option className="options" name="accounting">
                    {translate("accounting")}
                  </option>
                  <option className="options" name="cleaning_service">
                    {translate("cleaning-service")}
                  </option>
                  <option
                    className="options"
                    name="construction_and_maintenance"
                  >
                    {translate("construction_and_maintenance")}
                  </option>
                  <option className="options" name="education">
                    {translate("education")}
                  </option>
                  <option className="options" name="financial_service">
                    {translate("financial_services")}
                  </option>
                  <option className="options" name="health_care">
                    {translate("health_care")}
                  </option>
                  <option className="options" name="insurance">
                    {translate("insurance")}
                  </option>
                  <option className="options" name="it_service">
                    {translate("it_services")}
                  </option>
                  <option className="options" name="legal_services">
                    {translate("legal_services")}
                  </option>
                  <option className="options" name="software_development">
                    {translate("software_development")}
                  </option>
                </select>
              </Form.Field>
              <Form.Field>
                <label>I can receive bids in the following languages</label>
                <Checkbox id="sv" label="Swedish" />
                <Checkbox id="en" label="English" />
              </Form.Field>
              <Form.Field>
                {liveLanguage}
                <textarea
                  placeholder={translate("details_service")}
                  id="details"
                  name="details"
                  ref={register({ required: true })}
                  style={{ minHeight: 100 }}
                  onChange={e => {
                    onChangeHandler(e);
                  }}
                />
              </Form.Field>

              <Form.Field>
                <label id="create-request-label">{translate("budget")}</label>
                <select
                  id="budget"
                  name="budget"
                  ref={register({ required: true })}
                >
                  <option className="options">
                    {translate("choose-budget")}
                  </option>
                  <option className="options" name="small">
                    {translate("small")}
                  </option>
                  <option className="options" name="medium">
                    {translate("medium")}
                  </option>
                  <option className="options" name="big">
                    {translate("big")}
                  </option>
                </select>
              </Form.Field>

              <Form.Field>
                <label id="create-request-label">
                  {translate("time-frame")}
                </label>
                <select
                  id="timeframe"
                  name="time_frame"
                  ref={register({ required: true })}
                >
                  <option className="options">
                    {translate("choose-timeframe")}
                  </option>
                  <option className="options" name="urgent">
                    {translate("urgent")}
                  </option>
                  <option className="options" name="moderate">
                    {translate("moderate")}
                  </option>
                  <option className="options" name="long_term">
                    {translate("long-term")}
                  </option>
                </select>
              </Form.Field>
              <Form.Field>
                <input
                  id="select-image"
                  accept="image/png, image/jpeg"
                  type="file"
                  name="image"
                  onChange={fileUploadHandler}
                />
              </Form.Field>
              <Button id="submit-request-button" type="submit">
                {translate("submit")}
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = state => {
  return {
    showModal: state.modalState.displayCreateServiceRequestModal,
    location: state.location
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...modalActions, ...flashActions }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRequest);
