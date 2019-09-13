import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import * as modalActions from "../state/actions/modalActions";
import * as flashActions from "../state/actions/flashActions";
import { bindActionCreators } from "redux";
import { Button, Form, Modal, Checkbox } from "semantic-ui-react";
import useForm from "react-hook-form";
import { saveRequest } from "../modules/saveRequest";
import axios from "axios";
import { I18nContext } from "../i18n/index";
import MockAdapter from "axios-mock-adapter";
import categoriesApi from "../i18n/api_categories.js";

const CreateRequest = props => {
  const { translate } = useContext(I18nContext);
  props.showCreateServiceRequestModal();
  const { register, handleSubmit } = useForm();
  const [liveLanguage, setLiveLanguage] = useState();
  const [categories, setCategories] = useState();

  const saveServiceRequestHandler = async data => {
    const { title, category, details, budget, timeframe } = data;
    let response = await saveRequest(
      title,
      category,
      details,
      budget,
      timeframe
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
        { val }
      );
      if (response.status === 200) {
        setLiveLanguage(response.data.message);
        document.getElementById(`${response.data.lang_code}`).checked = true;
      }
    } catch (error) {}
  };

  const onChangeHandler = e => {
    const val = e.target.value;
    if (val.length === 20) {
      getLanguage(val);
    }
  };

  let mockResponse = new MockAdapter(axios);

  mockResponse
    .onGet("http://localhost:3000/api/categories")
    .reply(200, categoriesApi);

  useEffect(
    axios
      .get("http://localhost:3000/api/categories")
      .then(response => {
        console.log(response.data);
        debugger;
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
        debugger;
      })
  );

  let categoriesList;

  if (categories.length > 0) {
    categoriesList = categories.map(category => {
      return (
        <option key={category.id} className="options" name={category.name}>
          {category.name}
        </option>
      );
    });
  }

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
              {translate("create_request")}
            </Button>
          }
        >
          <Modal.Header>{translate("create_request_header")}</Modal.Header>
          <Modal.Content>
            <Form
              id="request-form"
              onSubmit={handleSubmit(saveServiceRequestHandler)}
            >
              <Form.Field>
                <label>{translate("title")}</label>
                <input
                  id="title"
                  name="title"
                  ref={register({ required: true })}
                />
              </Form.Field>

              <Form.Field>
                <label>{translate("category")}</label>
                <select
                  id="category"
                  name="category"
                  ref={register({ required: true })}
                >
                  <option className="options">
                    {translate("please_choose")}
                  </option>
                  {categoriesList}
                </select>
              </Form.Field>
              <Form.Field>
                <label>I can receive bids in the following languages</label>
                <Checkbox id="se" label="Swedish" />
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
                <label>{translate("budget")}</label>
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
                <label>{translate("time-frame")}</label>
                <select
                  id="timeframe"
                  name="timeframe"
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
    showModal: state.modalState.displayCreateServiceRequestModal
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ ...modalActions, ...flashActions }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRequest);
