import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Banner from '../common/Banner';
import TextField from '../common/TextField';
import SideNavbar from '../layout/SideNavbar';
import Navbar from '../layout/Navbar';
import { withRouter } from 'react-router-dom';
import { changePassword } from '../../actions/authActions';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldpassword: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return { errors: props.errors };
    }
    return null;
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.props.auth.user.email,
      oldpassword: this.state.oldpassword,
      password: this.state.password,
      password2: this.state.password2
    };

    if (window.confirm('Are you sure?')) {
      this.props.changePassword(userData);
    }
  };
  render() {
    const { errors } = this.state;

    return (
      <div>
        <Navbar />
        <Banner pageName="Change Password" />
        <section className="user-page section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-5 col-xs-12">
                <SideNavbar />
              </div>
              <div className="col-lg-8 col-md-7 col-xs-12">
                <div className="my-address">
                  <h3 className="heading">Change Password</h3>
                  <div className="section-inforamation">
                    <form className="login-form" onSubmit={this.onSubmit}>
                      <div className="row justify-content-center">
                        <div className="col-lg-7 col-md-8 col-xs-12">
                          <TextField
                            label="Old Password"
                            placeholder="Enter Old Password"
                            name="oldpassword"
                            type="password"
                            onChange={this.onChange}
                            error={errors.oldpassword}
                          />
                          <TextField
                            label="New Password"
                            placeholder="Enter New Password"
                            name="password"
                            type="password"
                            onChange={this.onChange}
                            error={errors.password}
                          />
                          <TextField
                            label="Retype Password"
                            placeholder="Retype Password"
                            name="password2"
                            type="password"
                            onChange={this.onChange}
                            error={errors.password2}
                          />
                          <div className="text-center">
                            <input
                              type="submit"
                              value="Change Password"
                              className="btn btn-common mt-2"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { changePassword }
)(withRouter(ChangePassword));
