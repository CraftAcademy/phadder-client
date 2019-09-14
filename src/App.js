import React, { Suspense } from "react";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";
import { Switch, Route } from "react-router-dom";
import Footer from './components/Footer'

const App = props => {
  if (props.flashMessage.display) {
    toast(props.flashMessage.message, { type: props.flashMessage.type });
  }

  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Navbar />
        <ToastContainer />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/profile" component={UserProfile}></Route>
        </Switch>
        <Footer/>
      </Suspense>
    </>
  );
};

const mapStateToProps = state => {
  return {
    flashMessage: state.flashes.message
  };
};

export default connect(
  mapStateToProps
)(App);
