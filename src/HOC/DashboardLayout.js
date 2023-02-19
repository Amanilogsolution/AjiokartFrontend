import React, { Component } from 'react';
import Menu from '../Components/Dashboard/Menu';
export default function (ComposedComponent) {
  class DashboardLayout extends Component {

    render() {
      return (
        <React.Fragment>
          { window.scrollTo(0, 0)}
          <div className="container-fluid dashboard">
            <div className="row justify-content-end">
              <Menu />


              <div className="col col-12 col-sm-12 col-md-12 col-lg-10 right-panel ">
                <main>
                <ComposedComponent {...this.props} />
                </main>
              </div>
            </div>
          </div>
        </React.Fragment>
      )

    }

  }
  return DashboardLayout;
}
