import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                    About
                    <span>Us</span>
                  </h3>
                  <ul className="footer-link">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/catalog">Catalog</Link>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                  <h3 className="footer-titel">
                    Contact
                    <span>Info</span>
                  </h3>
                  <ul className="address">
                    <li>
                      <i className="lni-map-marker" /> Maaninkavaarantie 5
                      <br /> 97900 POSIO
                    </li>
                    <li>
                      <i className="lni-phone-handset" /> +358 44 767 4218
                    </li>
                    <li>
                      <i className="lni-envelope" /> matkailu.neuvonta@posio.fi
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
                <p>Copyright © 2018</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Footer;
