import React, { Component } from 'react';
import Navbar from '../layout/Navbar';
import Banner from '../common/Banner';
import { FormattedMessage } from 'react-intl';

class SuccessMessage extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <FormattedMessage id="forgotpassword.forgotpassword">
          {forgotpassword => <Banner pageName={forgotpassword} />}
        </FormattedMessage>
        <div id="content" className="section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 col-xs-12">
                <div className="page-login-form box">
                  <h3>
                    <FormattedMessage id="forgotpassword.Checkyourinbox" />
                  </h3>
                  <p>
                    <FormattedMessage id="forgotpassword.firstLine" />
                  </p>
                  <p>
                    <FormattedMessage id="forgotpassword.secondLine" />
                  </p>
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
