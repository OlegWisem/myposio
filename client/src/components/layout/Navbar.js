import React, { Component } from 'react';
import Logo from '../../img/logo-eng.svg';

class Navbar extends Component {
  render() {
    return (
      <div id="header-wrap">
        {/* Start Top Bar */}
        <div className="top-bar">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-9 col-xs-12">
                {/* Start Contact Info */}
                <ul className="links clearfix">
                  <li>
                    <i className="lni-phone-handset" />+358 44 767 4218
                  </li>
                  <li>
                    <i className="lni-envelope" /> matkailu.neuvonta@posio.fi
                  </li>
                  <li>
                    <a href="#">
                      <i className="lni-map-marker" /> Maaninkavaarantie 5 POSIO{' '}
                    </a>
                  </li>
                </ul>
                {/* End Contact Info */}
              </div>
              <div className="col-lg-5 col-md-3 col-xs-12">
                <div className="header-top-right float-right">
                  <a href="login.html" className="header-top-button">
                    Log In
                  </a>
                  <a href="signup.html" className="header-top-button white-bg">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Top Bar */}
        {/* Navbar Start */}
        <nav
          className="navbar navbar-expand-lg navbar-light bg-white"
          data-toggle="sticky-onscroll"
        >
          <div className="container">
            {/* Brand and toggle get grouped for better mobile display */}
            <div className="navbar-header">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#main-navbar"
                aria-controls="main-navbar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
                <span className="lin-menu" />
              </button>
              <a className="navbar-brand" href="index.html">
                <img src={Logo} style={{ width: 90, marginRight: 5 }} alt />
              </a>
            </div>
            <div className="collapse navbar-collapse" id="main-navbar">
              <ul className="navbar-nav mr-auto w-100">
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    Catalog
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* Mobile Menu Start */}
          <ul className="mobile-menu">
            <li className="active">
              <a href="#">Catalog</a>
            </li>
          </ul>
          {/* Mobile Menu End */}
        </nav>
        {/* Navbar End */}
      </div>
    );
  }
}

export default Navbar;
