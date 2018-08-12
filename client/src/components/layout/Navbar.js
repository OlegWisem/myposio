import React, { Component } from 'react';
import Logo from '../../img/logo-eng.svg';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
//import { clearCurrentProfile } from '../../actions/authActions';
import { setLocale } from '../../actions/localeActions';
import { FormattedMessage } from 'react-intl';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    //this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const guestLinks = (
      <div>
        <Link to="/login" className="header-top-button">
          <FormattedMessage id="nav.login" />
        </Link>
        <Link to="/register" className="header-top-button">
          <FormattedMessage id="nav.signup" />
        </Link>
      </div>
    );

    const authLinks = (
      <div>
        <Link to="/dashboard" className="header-top-button">
          <FormattedMessage id="nav.dashboard" />
        </Link>
        <a
          href=""
          onClick={this.onLogoutClick.bind(this)}
          className="header-top-button"
        >
          <FormattedMessage id="nav.logout" />
        </a>
      </div>
    );

    return (
      <div id="header-wrap">
        {/* Navbar Start */}
        <nav
          className="navbar navbar-expand-lg navbar-light"
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
            </div>
            <div className="collapse navbar-collapse" id="main-navbar">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item" style={{ width: 190 }}>
                  <div className="logo">
                    <Link to="/">
                      <img src={Logo} alt="" />
                    </Link>
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    activeClassName="active"
                    className="nav-link"
                    to="/"
                  >
                    <FormattedMessage id="nav.home" />
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    activeClassName="active"
                    className="nav-link"
                    to="/catalog"
                  >
                    <FormattedMessage id="nav.catalog" />
                  </NavLink>
                </li>
                {isAuthenticated === true && (
                  <li className="nav-item">
                    <NavLink
                      exact
                      activeClassName="active"
                      className="nav-link"
                      to="/dashboard"
                    >
                      <FormattedMessage id="nav.dashboard" />
                    </NavLink>
                  </li>
                )}
                <li className="nav-item">
                  {this.props.locale.lang === 'fi' ? (
                    <a
                      className="nav-link"
                      role="button"
                      onClick={() => this.props.setLocale('en')}
                    >
                      <img src="img/en.png" alt="en" />
                    </a>
                  ) : (
                    <a
                      className="nav-link"
                      role="button"
                      onClick={() => this.props.setLocale('fi')}
                    >
                      <img src="img/fi.png" alt="fi" />
                    </a>
                  )}
                </li>
              </ul>
              <div className="header-top-right float-right">
                {isAuthenticated ? authLinks : guestLinks}
              </div>
            </div>
          </div>
          {/* Mobile Menu Start */}
          <ul className="mobile-menu">
            <li>
              <NavLink exact activeClassName="active" to="/">
                <FormattedMessage id="nav.home" />
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="active" to="/catalog">
                <FormattedMessage id="nav.catalog" />
              </NavLink>
            </li>
            <li>
              {isAuthenticated === true && (
                <NavLink exact activeClassName="active" to="/dashboard">
                  <FormattedMessage id="nav.dashboard" />
                </NavLink>
              )}
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
  auth: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  setLocale: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  locale: state.locale
});

export default connect(
  mapStateToProps,
  { logoutUser, setLocale }
)(Navbar);
