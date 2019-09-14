import React from "react";
import { connect } from "react-redux";
import ProfileImageUpload from "./UploadProfilePic";
import DisplayServiceRequest from "./DisplayServiceRequest";
import "../css/style.css";

const UserProfile = props => {
  return (
    <div id="user-profile">
      <h1 id="profile-welcome">
        Welcome {props.currentUser.attributes.firstName}, to your profile page!
        <ProfileImageUpload/>
      </h1>
      <DisplayServiceRequest />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  };
};

export default connect(mapStateToProps)(UserProfile);
