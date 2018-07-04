import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextField';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  render() {
    return (
      <div>
        <div id="page-banner-area" className="page-banner">
          <div className="page-banner-title">
            <div className="text-center">
              <h2>Register</h2>
              <a href="#">
                <i className="lni-home" /> Home
              </a>
              <span className="crumbs-spacer">
                <i className="lni-chevron-right" />
              </span>
              <span className="current">Register</span>
            </div>
          </div>
        </div>

        <div id="content" className="section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 col-xs-12">
                <div className="page-login-form box">
                  <h3>Create Your account</h3>
                  <form className="login-form">
                    <div className="form-group">
                      <div className="input-icon">
                        <i className="lni-envelope" />
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-icon">
                        <i className="lni-lock" />
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-icon">
                        <i className="lni-unlock" />
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Retype Password"
                        />
                      </div>
                    </div>
                    <button className="btn btn-common log-btn mt-3">
                      Register
                    </button>
                    <p className="text-center">
                      Already have an account?
                      <a href="login.html"> Sign In</a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
