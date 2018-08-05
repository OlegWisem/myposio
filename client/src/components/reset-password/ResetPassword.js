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
import { FormattedMessage } from 'react-intl';

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
    const parsed = new URLSearchParams(this.props.location.search);
    const userData = {
      email: !isEmpty(parsed.get('email')) ? parsed.get('email') : '',
      token: !isEmpty(parsed.get('token')) ? parsed.get('token') : '',
      lang: !isEmpty(parsed.get('lang')) ? parsed.get('lang') : ''
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
      password2: this.state.password2,
      locale: this.props.locale.lang
    };
    const parsed = new URLSearchParams(this.props.location.search);
    const paramsData = {
      email: !isEmpty(parsed.get('email')) ? parsed.get('email') : '',
      token: !isEmpty(parsed.get('token')) ? parsed.get('token') : ''
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
          <FormattedMessage id="resetpassword.NewPassword">
            {NewPassword => (
              <FormattedMessage id="resetpassword.EnterNewPassword">
                {EnterNewPassword => (
                  <TextField
                    label={NewPassword}
                    placeholder={EnterNewPassword}
                    name="password"
                    type="password"
                    onChange={this.onChange}
                    error={errors.password}
                  />
                )}
              </FormattedMessage>
            )}
          </FormattedMessage>
          <FormattedMessage id="resetpassword.RetypePassword">
            {RetypePassword => (
              <FormattedMessage id="resetpassword.EnterRetypePassword">
                {EnterRetypePassword => (
                  <TextField
                    label={RetypePassword}
                    placeholder={EnterRetypePassword}
                    name="password2"
                    type="password"
                    onChange={this.onChange}
                    error={errors.password2}
                  />
                )}
              </FormattedMessage>
            )}
          </FormattedMessage>
          <FormattedMessage id="resetpassword.SetNewPassword">
            {SetNewPassword => (
              <input
                type="submit"
                value={SetNewPassword}
                className="btn btn-common log-btn mt-3"
              />
            )}
          </FormattedMessage>
        </form>
      );
    }
    return (
      <div>
        <Navbar />
        <FormattedMessage id="resetpassword.resetpassword">
          {resetpassword => <Banner pageName={resetpassword} />}
        </FormattedMessage>
        <div id="content" className="section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 col-xs-12">
                <div className="page-login-form box">
                  <h3>
                    <FormattedMessage id="resetpassword.resetpassword" />
                  </h3>
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
  { clearErrors, validateToken, setNewPassword }
)(withRouter(ResetPassword));
