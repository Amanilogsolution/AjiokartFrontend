import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actionCreator from "./Store/actions/index"
import { ToastContainer } from 'react-toastify';
import ReactGA from 'react-ga';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  constructor(props) {
    super(props)

    if (process.env.REACT_APP_DOMAIN === "AJIOKART.com") {
      ReactGA.initialize('G-KDQDYHCM29');
      ReactGA.pageview(window.location.pathname + window.location.search);
    }

    const localData = localStorage.getItem('userData');
    if (!localData) {
      return
    }
    const { token, email, mobile, tokenExpirationDate, name, companyName, sellerId, isSellerActive } = JSON.parse(localData);
    if (!token || (new Date(tokenExpirationDate) < new Date())) {
      return;
    }


    let user = {
      name: name,
      token: token,
      email: email,
      mobile: mobile,
      tokenExpirationDate: tokenExpirationDate,
      companyName: companyName,
      sellerId: sellerId,
      isSellerActive: isSellerActive
    }
    localStorage.setItem("userData", JSON.stringify(user));
    props.dispatch(actionCreator.loginSuccess(user))

  }

  render() {
    return (
      <div className="App">
        {this.props.children}

        <ToastContainer />
      </div>
    );
  }
}



export default connect(null, null)(App);