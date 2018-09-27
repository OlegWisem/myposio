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
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false
    };
  }

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHangler = () => {
    this.setState({ sideDrawerOpen: false });
  };

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

    let drawerClasses = 'side-drawer';
    if (this.state.sideDrawerOpen) {
      drawerClasses = 'side-drawer open';
    }

    return (
      <div id="header-wrap">
        {/* Navbar Start */}
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          data-toggle="sticky-onscroll"
        >
          <div className="container">
            {/* Brand and toggle get grouped for better mobile display */}
            <div className="navbar-header">
              <button
                className="navbar-toggler"
                onClick={this.drawerToggleClickHandler.bind(this)}
              >
                <span className="navbar-toggler-icon" />
                <span className="lin-menu" />
              </button>
            </div>
            <div className="collapse navbar-collapse">
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
        </nav>
        {/* Navbar End */}

        {/* Mobile Navbar*/}
        <nav className={drawerClasses}>
          <a
            className="sidebar-close"
            onClick={this.drawerToggleClickHandler.bind(this)}
          >
            <span className="lni-close" />
          </a>
          <ul className="sidebar-items">
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

            {isAuthenticated ? (
              <div>
                <li className="nav-item">
                  <a
                    href=""
                    onClick={this.onLogoutClick.bind(this)}
                    className="header-top-button nav-link"
                  >
                    <FormattedMessage id="nav.logout" />
                  </a>
                </li>
              </div>
            ) : (
              <div>
                <li className="nav-item">
                  <Link to="/login" className="header-top-button nav-link">
                    <FormattedMessage id="nav.login" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="header-top-button nav-link">
                    <FormattedMessage id="nav.signup" />
                  </Link>
                </li>
              </div>
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
        </nav>
        {this.state.sideDrawerOpen && (
          <div
            className="backdrop"
            onClick={this.drawerToggleClickHandler.bind(this)}
          />
        )}
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
