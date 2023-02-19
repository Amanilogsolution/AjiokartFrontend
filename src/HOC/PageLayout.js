import React, { Component } from 'react';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
export default function (ComposedComponent) {
  class PageLayout extends Component {

    render() {
      return (
        <React.Fragment>
          { window.scrollTo(0, 0)}
          <Header />
          <main className="main-conainer">
          <ComposedComponent {...this.props} />
          </main>
          <Footer/>
        </React.Fragment>
      )

    }

  }
  return PageLayout;
}
