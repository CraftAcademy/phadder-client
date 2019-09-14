import React, { useState, useContext } from "react";
import axios from "axios";
import { Image, Button, Modal } from "semantic-ui-react";
import { I18nContext } from "../i18n/index";
import "../css/style.css";

const ProfileImageUpload = () => {
  const [selectedPicture, setSelectedPicture] = useState();
  const [uploadStatus, setUploadStatus] = useState();
  const [newProfilePic, setNewProfilePic] = useState();
  const { translate } = useContext(I18nContext);

  const fileSelectedHandler = event => {
    setSelectedPicture(event.target.files[0]);
  };

  const fileUploadHandler = () => {
    const image = new FormData();
    image.append("image", selectedPicture, selectedPicture.name);
    axios
      .put("http://localhost:3000/api/profile_update", image)
      .then(response => {
        setUploadStatus(response.data.message);
        setNewProfilePic(response.data.message);
      })
      .catch(error => {
        setUploadStatus(error.response.data.message);
      });
  };

  return (
    <div id="profile-pic">
      <div id="profile-avatar">
        <Image
          src={
            newProfilePic ||
            "https://villageinsurancedirect.com/wp-content/uploads/2016/06/default_avatar_community.png"
          }
          size='small' circular
        />
      </div>
      <Modal
        trigger={<Button id="edit-profile-picture">{translate("Edit-profile-button")}</Button>}
        centered={false}
      >
        <Modal.Header>{translate("header-profile-picture")}</Modal.Header>
        <Modal.Content image>
          <Image
            wrapped
            size="medium"
            src={
              selectedPicture ||
              "https://react.semantic-ui.com/images/avatar/large/rachel.png"
            }
          />
          <Modal.Description>
            <p>
            {translate("profile-pic-description")}
            </p>
          </Modal.Description>
          <input
            id="select-image"
            accept="image/png, image/jpeg"
            type="file"
            onChange={fileSelectedHandler}
          />
          <Button id="upload-button" onClick={fileUploadHandler} >
            {translate("profile-update-picture")}
          </Button>
          {uploadStatus}
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default ProfileImageUpload;
