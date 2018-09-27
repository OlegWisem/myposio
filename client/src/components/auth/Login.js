import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, clearErrors } from '../../actions/authActions';
import TextField from '../common/TextField';
import Banner from '../common/Banner';
import Navbar from '../layout/Navbar';
import { FormattedMessage } from 'react-intl';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  componentDidMount() {
    document.title = 'MyPosio - Login';
    this.props.clearErrors();
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
      password: this.state.password,
      locale: this.props.locale.lang
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Navbar />
        <FormattedMessage id="login.login">
          {login => <Banner pageName={login} />}
        </FormattedMessage>
        <div id="content" className="section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 col-xs-12">
                <div className="page-login-form box">
                  <h3>
                    <FormattedMessage id="login.login" />
                  </h3>
                  <form className="login-form" onSubmit={this.onSubmit}>
                    <FormattedMessage id="login.email">
                      {email => (
                        <TextField
                          placeholder={email}
                          name="email"
                          type="email"
                          icon="lni-user"
                          value={this.state.email}
                          onChange={this.onChange}
                          error={errors.email}
                        />
                      )}
                    </FormattedMessage>
                    <FormattedMessage id="login.password">
                      {password => (
                        <TextField
                          placeholder={password}
                          name="password"
                          type="password"
                          icon="lni-lock"
                          value={this.state.password}
                          onChange={this.onChange}
                          error={errors.password}
                        />
                      )}
                    </FormattedMessage>
                    <FormattedMessage id="login.login">
                      {login => (
                        <input
                          type="submit"
                          value={login}
                          className="btn btn-common log-btn mt-3"
                        />
                      )}
                    </FormattedMessage>
                    <p className="text-center">
                      <Link to="/forgot-password">
                        <FormattedMessage id="login.ForgotPassword" />
                      </Link>
                    </p>
                    <p className="text-center">
                      <Link to="/register">
                        <FormattedMessage id="login.Donthaveanaccount" />
                      </Link>
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
  locale: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  locale: state.locale
});

export default connect(
  mapStateToProps,
  { loginUser, clearErrors }
)(Login);
