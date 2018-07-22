import React, { Component } from 'react';
import Navbar from '../layout/Navbar';
import Banner from '../common/Banner';

class SuccessMessage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Banner pageName="Forgot Password" />
        <div id="content" className="section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 col-xs-12">
                <div className="page-login-form box">
                  <h3>Check your inbox.</h3>
                  <p>
                    An email has been sent to your email address. It can take a
                    few minutes before you have it in your inbox.
                  </p>
                  <p>Follow the link in the email to reset your password.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SuccessMessage;
