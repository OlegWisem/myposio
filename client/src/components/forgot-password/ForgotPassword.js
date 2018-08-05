import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { clearErrors, requestNewPassword } from '../../actions/authActions';
import TextField from '../common/TextField';
import Banner from '../common/Banner';
import Navbar from '../layout/Navbar';
import { FormattedMessage } from 'react-intl';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {}
    };
  }

  componentDidMount() {
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
      locale: this.props.locale.lang
    };

    this.props.requestNewPassword(userData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Navbar />
        <FormattedMessage id="forgotpassword.forgotpassword">
          {forgotpassword => <Banner pageName={forgotpassword} />}
        </FormattedMessage>
        <div id="content" className="section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 col-xs-12">
                <div className="page-login-form box">
                  <h3>
                    <FormattedMessage id="forgotpassword.forgotpassword" />
                  </h3>
                  <form className="login-form" onSubmit={this.onSubmit}>
                    <FormattedMessage id="forgotpassword.Email">
                      {Email => (
                        <TextField
                          placeholder={Email}
                          name="email"
                          type="email"
                          icon="lni-user"
                          value={this.state.email}
                          onChange={this.onChange}
                          error={errors.email}
                        />
                      )}
                    </FormattedMessage>
                    <FormattedMessage id="forgotpassword.RequestNewPassword">
                      {RequestNewPassword => (
                        <input
                          type="submit"
                          value={RequestNewPassword}
                          className="btn btn-common log-btn mt-3"
                        />
                      )}
                    </FormattedMessage>
                    <p className="text-center">
                      <Link to="/register">
                        <FormattedMessage id="forgotpassword.Donthaveanaccount" />
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

ForgotPassword.propTypes = {
  requestNewPassword: PropTypes.func.isRequired,
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
  { clearErrors, requestNewPassword }
)(withRouter(ForgotPassword));
