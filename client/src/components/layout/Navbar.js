import React, { Component } from 'react';
import Logo from '../../img/logo-eng.svg';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
//import { clearCurrentProfile } from '../../actions/authActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    //this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <div>
        <Link to="/login" className="header-top-button">
          Log In
        </Link>
        <Link to="/register" className="header-top-button white-bg">
          Sign Up
        </Link>
      </div>
    );

    const authLinks = (
      <div>
        <Link to="/dashboard" className="header-top-button white-bg">
          Dashboard
        </Link>
        <a
          href=""
          onClick={this.onLogoutClick.bind(this)}
          className="header-top-button"
        >
          Logout
        </a>
      </div>
    );

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
                  {isAuthenticated ? authLinks : guestLinks}
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
                <img src={Logo} style={{ width: 90, marginRight: 5 }} alt="" />
              </a>
            </div>
            <div className="collapse navbar-collapse" id="main-navbar">
              <ul className="navbar-nav mr-auto w-100">
                <li className="nav-item">
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

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
