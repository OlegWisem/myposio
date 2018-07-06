import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextField from '../common/TextField';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return { errors: props.errors };
    }
    return null;
  }

  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div id="page-banner-area" className="page-banner">
          <div className="page-banner-title">
            <div className="text-center">
              <h2>Login</h2>
              <a href="#">
                <i className="lni-home" /> Home
              </a>
              <span className="crumbs-spacer">
                <i className="lni-chevron-right" />
              </span>
              <span className="current">Login</span>
            </div>
          </div>
        </div>

        <div id="content" className="section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 col-xs-12">
                <div className="page-login-form box">
                  <h3>Login</h3>
                  <form className="login-form" onSubmit={this.onSubmit}>
                    <TextField
                      placeholder="Email"
                      name="email"
                      type="email"
                      icon="lni-user"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                    <TextField
                      placeholder="Password"
                      name="password"
                      type="password"
                      icon="lni-lock"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />
                    <input
                      type="submit"
                      value="Login"
                      className="btn btn-common log-btn mt-3"
                    />
                    <p className="text-center">
                      <Link to="/register">Don't have an account?</Link>
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

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);