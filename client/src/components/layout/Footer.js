import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

class Footer extends Component {
  render() {
    return (
      <div>
        {/* Footer Section Start */}
        <div id="footer" className="footer-area section-padding">
          <div className="container">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                  <h3 className="footer-titel">
                    <FormattedMessage id="footer.about" />
                    <span>
                      <FormattedMessage id="footer.about.us" />
                    </span>
                  </h3>
                  <ul className="footer-link">
                    <li>
                      <Link to="/">
                        <FormattedMessage id="footer.home" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/catalog">
                        <FormattedMessage id="footer.catalog" />
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <h3 className="footer-titel">
                    <FormattedMessage id="footer.contact" />
                    <span>
                      <FormattedMessage id="footer.contact.info" />
                    </span>
                  </h3>
                  <ul className="address">
                    <li>
                      <a href="">
                        <i className="lni-map-marker" />{' '}
                        <FormattedMessage id="footer.address" />
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <i className="lni-phone-handset" />{' '}
                        <FormattedMessage id="footer.phone" />
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <i className="lni-envelope" />{' '}
                        <FormattedMessage id="footer.email" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Section End */}
        <section id="copyright">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <p>
                  <FormattedMessage id="footer.copyright" />
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Footer;
