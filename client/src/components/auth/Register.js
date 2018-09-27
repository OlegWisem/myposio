import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser, clearErrors } from '../../actions/authActions';
import TextField from '../common/TextField';
import Banner from '../common/Banner';
import Navbar from '../layout/Navbar';
import { FormattedMessage } from 'react-intl';
import Cleave from 'cleave.js/react';
import classnames from 'classnames';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      password: '',
      password2: '',
      errors: {}
    };
  }

  componentDidMount() {
    document.title = 'MyPosio - Resiter';
    this.props.clearErrors();
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      password2: this.state.password2,
      locale: this.props.locale.lang
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Navbar />
        <FormattedMessage id="signup.register">
          {register => <Banner pageName={register} />}
        </FormattedMessage>
        <div id="content" className="section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 col-xs-12">
                <div className="page-login-form box">
                  <h3>
                    <FormattedMessage id="signup.CreateYouraccount" />
                  </h3>
                  <form
                    className="login-form"
                    onSubmit={this.onSubmit}
                    noValidate
                  >
                    <FormattedMessage id="signup.YourName">
                      {YourName => (
                        <TextField
                          placeholder={YourName}
                          name="name"
                          type="text"
                          icon="lni-bubble"
                          value={this.state.name}
                          onChange={this.onChange}
                          error={errors.name}
                        />
                      )}
                    </FormattedMessage>
                    <FormattedMessage id="signup.Email">
                      {Email => (
                        <TextField
                          placeholder={Email}
                          name="email"
                          type="email"
                          icon="lni-envelope"
                          value={this.state.email}
                          onChange={this.onChange}
                          error={errors.email}
                        />
                      )}
                    </FormattedMessage>

                    <FormattedMessage id="signup.YourPhone">
                      {YourPhone => (
                        <div className="form-group">
                          <div className="input-icon">
                            <i className="lni-phone-handset" />
                            <Cleave
                              className={classnames('form-control', {
                                'is-invalid': errors.phone
                              })}
                              options={{
                                delimiter: ' ',
                                blocks: [3, 3, 4],
                                numericOnly: true
                              }}
                              placeholder={YourPhone}
                              name="phone"
                              value={this.state.phone}
                              onChange={this.onChange}
                            />
                            {errors.phone && (
                              <div className="invalid-feedback">
                                {errors.phone}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </FormattedMessage>

                    <FormattedMessage id="signup.Password">
                      {Password => (
                        <TextField
                          placeholder={Password}
                          name="password"
                          type="password"
                          icon="lni-lock"
                          value={this.state.password}
                          onChange={this.onChange}
                          error={errors.password}
                        />
                      )}
                    </FormattedMessage>
                    <FormattedMessage id="signup.RetypePassword">
                      {RetypePassword => (
                        <TextField
                          placeholder={RetypePassword}
                          name="password2"
                          type="password"
                          icon="lni-unlock"
                          value={this.state.password2}
                          onChange={this.onChange}
                          error={errors.password2}
                        />
                      )}
                    </FormattedMessage>
                    <FormattedMessage id="signup.register">
                      {register => (
                        <input
                          type="submit"
                          value={register}
                          className="btn btn-common log-btn mt-3"
                        />
                      )}
                    </FormattedMessage>
                    <p className="text-center">
                      <Link to="/forgot-password">
                        <FormattedMessage id="signup.ForgotPassword" />
                      </Link>
                    </p>
                    <p className="text-center">
                      <FormattedMessage id="signup.Alreadyhaveanaccount" />
                      <Link to="/login">
                        {' '}
                        <FormattedMessage id="signup.SignIn" />
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
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
  { registerUser, clearErrors }
)(withRouter(Register));
