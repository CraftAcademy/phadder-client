import React from "react";
import { connect } from "react-redux";
import ProfileImageUpload from "./UploadProfilePic";

const UserProfile = props => {
  return (
    <>
      <h1>
        Welcome {props.currentUser.attributes.firstName}, to your profile page!
        <ProfileImageUpload/>
      </h1>
    </>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  };
};

export default connect(mapStateToProps)(UserProfile);
