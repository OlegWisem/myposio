import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  clearErrors,
  validateToken,
  setNewPassword
} from '../../actions/authActions';
import TextField from '../common/TextField';
import Banner from '../common/Banner';
import Navbar from '../layout/Navbar';
import isEmpty from '../../validation/is-empty';
import queryString from 'query-string';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password2: '',
      valid: false,
      errors: {}
    };
  }

  componentDidMount() {
    this.props.clearErrors();
    const parsed = queryString.parse(this.props.location.search);
    const userData = {
      email: !isEmpty(parsed.email) ? parsed.email : '',
      token: !isEmpty(parsed.token) ? parsed.token : ''
    };
    this.props.validateToken(userData);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return { errors: props.errors };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (this.props.auth !== prevProps.auth) {
      const { ...user } = this.props.auth.user;
      this.setState(prevState => ({
        ...prevState,
        ...user
      }));
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      password: this.state.password,
      password2: this.state.password2
    };

    const parsed = queryString.parse(this.props.location.search);
    const paramsData = {
      email: !isEmpty(parsed.email) ? parsed.email : '',
      token: !isEmpty(parsed.token) ? parsed.token : ''
    };

    this.props.setNewPassword(paramsData, userData, this.props.history);
  };

  render() {
    const { errors, valid } = this.state;

    let resetContent;
    if (valid === false) {
      resetContent = (
        <div>
          <div className="text-center">{errors.email}</div>
        </div>
      );
    } else {
      resetContent = (
        <form className="login-form" onSubmit={this.onSubmit}>
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
          <input
            type="submit"
            value="Set New Password"
            className="btn btn-common log-btn mt-3"
          />
        </form>
      );
    }
    return (
      <div>
        <Navbar />
        <Banner pageName="Reset Password" />
        <div id="content" className="section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 col-xs-12">
                <div className="page-login-form box">
                  <h3>Reset Password</h3>
                  {resetContent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  validateToken: PropTypes.func.isRequired,
  setNewPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { clearErrors, validateToken, setNewPassword }
)(withRouter(ResetPassword));
