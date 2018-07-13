import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class SideNavbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    //this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div className="user-profile-box">
          {/*header */}
          <div className="header clearfix">
            <h2>{user.name}</h2>
            <img
              src="../../img/avatar.jpg"
              alt="avatar"
              className="img-fluid profile-img"
            />
          </div>
          {/* Detail */}
          <div className="detail clearfix">
            <ul>
              <li>
                <NavLink exact activeClassName="active" to="/dashboard">
                  <i className="lni-files" /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink exact activeClassName="active" to="/catalog">
                  <i className="lni-files" /> Catalog
                </NavLink>
              </li>
              <li>
                <a href="" onClick={this.onLogoutClick.bind(this)}>
                  <i className="lni-exit" />Log Out
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
  { logoutUser }
)(SideNavbar);
