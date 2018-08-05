import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clearCurrentCompany } from '../../actions/companyActions';
import { updateProfile, getCurrentProfile } from '../../actions/authActions';
import Banner from '../common/Banner';
import TextField from '../common/TextField';
import SideNavbar from '../layout/SideNavbar';
import Navbar from '../layout/Navbar';
import { FormattedMessage } from 'react-intl';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
      avatar: null,
      errors: {}
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.clearCurrentCompany();
  }
  componentDidUpdate(prevProps) {
    if (this.props.auth !== prevProps.auth) {
      const { ...profile } = this.props.auth.profile;
      this.setState(prevState => ({
        ...prevState,
        ...profile
      }));
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return { errors: props.errors };
    }
    return null;
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onFileSelect = event => {
    this.setState({
      avatar: event.target.files[0]
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const data = new FormData();
    let message = '';
    data.append('avatar', this.state.avatar);
    data.append('name', this.state.name);
    data.append('email', this.state.email);
    data.append('phone', this.state.phone);
    data.append('locale', this.props.locale.lang);

    if (
      this.props.auth.profile.name !== this.state.name ||
      this.props.auth.profile.email !== this.state.email
    ) {
      if (this.props.locale.lang === 'en')
        message = 'Are you sure? You will be logged out.';
      else message = 'Oletko varma? Sinut kirjaudut ulos.';
      if (window.confirm(message)) {
        this.props.updateProfile(data, this.props.history, true);
      } else {
        return;
      }
    }
    this.props.updateProfile(data, this.props.history, false);
  };
  render() {
    const { errors } = this.state;

    return (
      <div>
        <Navbar />
        <FormattedMessage id="editprofile.editprofile">
          {editprofile => <Banner pageName={editprofile} />}
        </FormattedMessage>
        <section className="user-page section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-5 col-xs-12">
                <SideNavbar />
              </div>
              <div className="col-lg-8 col-md-7 col-xs-12">
                <div className="my-address">
                  <h3 className="heading">
                    <FormattedMessage id="editprofile.editprofile" />
                  </h3>
                  <div className="section-inforamation">
                    <form
                      className="login-form"
                      onSubmit={this.onSubmit}
                      encType="multipart/form-data"
                    >
                      <div className="row justify-content-center">
                        <div className="col-lg-7 col-md-8 col-xs-12">
                          <FormattedMessage id="editprofile.Yourname">
                            {Yourname => (
                              <FormattedMessage id="editprofile.EnterYourName">
                                {EnterYourName => (
                                  <TextField
                                    label={Yourname}
                                    placeholder={EnterYourName}
                                    name="name"
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                  />
                                )}
                              </FormattedMessage>
                            )}
                          </FormattedMessage>
                          <FormattedMessage id="editprofile.YourEmail">
                            {YourEmail => (
                              <FormattedMessage id="editprofile.EnterYourEmail">
                                {EnterYourEmail => (
                                  <TextField
                                    label={YourEmail}
                                    placeholder={EnterYourEmail}
                                    name="email"
                                    type="text"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                  />
                                )}
                              </FormattedMessage>
                            )}
                          </FormattedMessage>
                          <FormattedMessage id="editprofile.Phonenumber">
                            {Phonenumber => (
                              <FormattedMessage id="editprofile.EnterYourphone">
                                {EnterYourphone => (
                                  <TextField
                                    label={Phonenumber}
                                    placeholder={EnterYourphone}
                                    name="phone"
                                    type="text"
                                    value={this.state.phone}
                                    onChange={this.onChange}
                                    error={errors.phone}
                                  />
                                )}
                              </FormattedMessage>
                            )}
                          </FormattedMessage>
                          <label>
                            <FormattedMessage id="editprofile.Avatar" />
                          </label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="customFile"
                              onChange={this.onFileSelect}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              <FormattedMessage id="editprofile.Uploadyouravatar" />
                            </label>
                          </div>
                          {errors.avatar && (
                            <div className="invalid-feedback">
                              {errors.avatar}
                            </div>
                          )}

                          <div className="mx-auto mt-4">
                            <FormattedMessage id="editprofile.editprofile">
                              {editprofile => (
                                <input
                                  type="submit"
                                  value={editprofile}
                                  className="btn btn-common mt-2"
                                />
                              )}
                            </FormattedMessage>
                            <Link
                              to="/change-password"
                              className="btn btn-common mt-2 ml-2"
                            >
                              <FormattedMessage id="editprofile.Changepassword" />
                            </Link>
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

EditProfile.propTypes = {
  auth: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  locale: state.locale,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateProfile, clearCurrentCompany, getCurrentProfile }
)(withRouter(EditProfile));
