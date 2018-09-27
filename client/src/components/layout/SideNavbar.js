import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { logoutUser, getCurrentProfile } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEmpty from '../../validation/is-empty';
import { FormattedMessage } from 'react-intl';

class SideNavbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    //this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div className="user-profile-box">
          {/*header */}
          <div className="header clearfix">
            <h2>{user.name}</h2>
            <div className="wrapper">
              <img
                src={
                  isEmpty(this.props.auth.profile.avatar)
                    ? 'img/avatar.jpg'
                    : this.props.auth.profile.avatar
                }
                alt="avatar"
                className="img-fluid profile-img"
              />
            </div>
          </div>
          {/* Detail */}
          <div className="detail clearfix">
            <ul>
              <li>
                <NavLink exact activeClassName="active" to="/dashboard">
                  <i className="lni-files" />{' '}
                  <FormattedMessage id="sidenav.dashboard" />
                </NavLink>
              </li>
              <li>
                <NavLink exact activeClassName="active" to="/create-company">
                  <i className="lni-plus" />{' '}
                  <FormattedMessage id="sidenav.AddNewCompany" />
                </NavLink>
              </li>
              <li>
                <NavLink exact activeClassName="active" to="/edit-profile">
                  <i className="lni-pencil-alt" />{' '}
                  <FormattedMessage id="sidenav.EditProfile" />
                </NavLink>
              </li>
              {!user.isAdmin ? null : (
                <li>
                  <NavLink exact activeClassName="active" to="/review">
                    <i className="lni-check-mark-circle" />{' '}
                    <FormattedMessage id="sidenav.Reviewcompanies" />
                  </NavLink>
                </li>
              )}

              <li>
                <a href="" onClick={this.onLogoutClick.bind(this)}>
                  <i className="lni-exit" />
                  <FormattedMessage id="sidenav.LogOut" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

SideNavbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, getCurrentProfile }
)(SideNavbar);
