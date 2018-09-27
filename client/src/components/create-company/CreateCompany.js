import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import Banner from '../common/Banner';
import TextField from '../common/TextField';
import TextAreaField from '../common/TextAreaField';
import { createCompany } from '../../actions/companyActions';
import SideNavbar from '../layout/SideNavbar';
import Navbar from '../layout/Navbar';
import SelectList from '../common/SelectList';
import { FormattedMessage } from 'react-intl';
import options from '../common/Options';
import Cleave from 'cleave.js/react';
import classnames from 'classnames';

class CreateCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      field: '',
      companyid: '',
      address: '',
      description: '',
      phone: '',
      email: '',
      website: '',
      youtube: '',
      twitter: '',
      facebook: '',
      instagram: '',
      category: '',
      secondaryCategory: '',
      photo: null,
      uploadMessage: '',
      errors: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return { errors: props.errors };
    }
    return null;
  }

  onLogoutClick(e) {
    e.preventDefault();
    //this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  handleChange = category => {
    this.setState({ category });
  };

  onFileSelect = event => {
    this.setState({
      photo: event.target.files[0],
      uploadMessage: event.target.value.replace('C:\\fakepath\\', '')
    });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();

    const companyData = new FormData();
    companyData.append('photo', this.state.photo);
    companyData.append('name', this.state.name);
    companyData.append('field', this.state.field);
    companyData.append('companyid', this.state.companyid);
    companyData.append('address', this.state.address);
    companyData.append('description', this.state.description);
    companyData.append('phone', this.state.phone);
    companyData.append('email', this.state.email);
    companyData.append('website', this.state.website);
    companyData.append('youtube', this.state.youtube);
    companyData.append('twitter', this.state.twitter);
    companyData.append('facebook', this.state.facebook);
    companyData.append('instagram', this.state.instagram);
    companyData.append('category', this.state.category);
    companyData.append('secondaryCategory', this.state.secondaryCategory);
    companyData.append('locale', this.props.locale.lang);

    this.props.createCompany(companyData, this.props.history);
  };
  render() {
    const { errors, uploadMessage } = this.state;
    return (
      <div>
        <Navbar />
        <FormattedMessage id="createcompany.addnewcompany">
          {addnewcompany => <Banner pageName={addnewcompany} />}
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
                    <FormattedMessage id="createcompany.addnewcompany" />
                  </h3>
                  <div className="section-inforamation">
                    <form onSubmit={this.onSubmit}>
                      <div className="row">
                        <div className="col-sm-6">
                          <FormattedMessage id="createcompany.companyname">
                            {companyname => (
                              <FormattedMessage id="createcompany.EnterYourCompanyName">
                                {EnterYourCompanyName => (
                                  <TextField
                                    label={companyname}
                                    placeholder={EnterYourCompanyName}
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
                        </div>
                        <div className="col-sm-6">
                          <FormattedMessage id="createcompany.category">
                            {category => (
                              <SelectList
                                name="category"
                                value={this.state.category}
                                onChange={this.onChange}
                                option={options}
                                error={errors.category}
                                label={category}
                              />
                            )}
                          </FormattedMessage>
                        </div>
                        <div className="col-sm-6">
                          <FormattedMessage id="createcompany.secondaryCategory">
                            {secondaryCategory => (
                              <SelectList
                                name="secondaryCategory"
                                value={this.state.secondaryCategory}
                                onChange={this.onChange}
                                option={options}
                                error={errors.secondaryCategory}
                                label={secondaryCategory}
                              />
                            )}
                          </FormattedMessage>
                        </div>
                        <div className="col-sm-6">
                          <FormattedMessage id="createcompany.CompanyField">
                            {CompanyField => (
                              <FormattedMessage id="createcompany.EnterYourCompanyField">
                                {EnterYourCompanyField => (
                                  <TextField
                                    label={CompanyField}
                                    placeholder={EnterYourCompanyField}
                                    name="field"
                                    type="text"
                                    value={this.state.field}
                                    onChange={this.onChange}
                                    error={errors.field}
                                  />
                                )}
                              </FormattedMessage>
                            )}
                          </FormattedMessage>
                        </div>
                        <div className="col-sm-6">
                          <FormattedMessage id="createcompany.BusinessID">
                            {BusinessID => (
                              <FormattedMessage id="createcompany.EnterYourBusinessID">
                                {EnterYourBusinessID => (
                                  <div className="form-group">
                                    <label>{BusinessID}</label>
                                    <Cleave
                                      className={classnames('form-control', {
                                        'is-invalid': errors.companyid
                                      })}
                                      options={{
                                        delimiter: '-',
                                        blocks: [7, 1],
                                        numericOnly: true
                                      }}
                                      placeholder={EnterYourBusinessID}
                                      name="companyid"
                                      value={this.state.companyid}
                                      onChange={this.onChange}
                                    />
                                    {errors.companyid && (
                                      <div className="invalid-feedback">
                                        {errors.companyid}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </FormattedMessage>
                            )}
                          </FormattedMessage>
                        </div>
                        <div className="col-sm-6">
                          <FormattedMessage id="createcompany.PhoneNumber">
                            {PhoneNumber => (
                              <FormattedMessage id="createcompany.PhoneNumberExample">
                                {PhoneNumberExample => (
                                  <div className="form-group">
                                    <label>{PhoneNumber}</label>
                                    <Cleave
                                      className={classnames('form-control', {
                                        'is-invalid': errors.phone
                                      })}
                                      options={{
                                        delimiter: ' ',
                                        blocks: [3, 3, 4],
                                        numericOnly: true
                                      }}
                                      placeholder={PhoneNumberExample}
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
                                )}
                              </FormattedMessage>
                            )}
                          </FormattedMessage>
                        </div>
                        <div className="col-sm-6">
                          <FormattedMessage id="createcompany.EmailAddress">
                            {EmailAddress => (
                              <FormattedMessage id="createcompany.EmailAddressExample">
                                {EmailAddressExample => (
                                  <TextField
                                    label={EmailAddress}
                                    placeholder={EmailAddressExample}
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                  />
                                )}
                              </FormattedMessage>
                            )}
                          </FormattedMessage>
                        </div>
                        <div className="col-sm-6">
                          <FormattedMessage id="createcompany.CompanyAddress">
                            {CompanyAddress => (
                              <FormattedMessage id="createcompany.EnterYourCompanyAddress">
                                {EnterYourCompanyAddress => (
                                  <TextField
                                    label={CompanyAddress}
                                    placeholder={EnterYourCompanyAddress}
                                    name="address"
                                    type="text"
                                    value={this.state.address}
                                    onChange={this.onChange}
                                    error={errors.address}
                                  />
                                )}
                              </FormattedMessage>
                            )}
                          </FormattedMessage>
                        </div>
                        <div className="col-sm-6">
                          <FormattedMessage id="createcompany.CompanyWebsite">
                            {CompanyWebsite => (
                              <FormattedMessage id="createcompany.EnterYourCompanyWebsite">
                                {EnterYourCompanyWebsite => (
                                  <div className="form-group">
                                    <label>{CompanyWebsite}</label>
                                    <Cleave
                                      className={classnames('form-control', {
                                        'is-invalid': errors.website
                                      })}
                                      options={{
                                        prefix: 'http://',
                                        lowercase: true
                                      }}
                                      placeholder={EnterYourCompanyWebsite}
                                      name="website"
                                      value={this.state.website}
                                      onChange={this.onChange}
                                    />
                                    {errors.website && (
                                      <div className="invalid-feedback">
                                        {errors.website}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </FormattedMessage>
                            )}
                          </FormattedMessage>
                        </div>
                        <div className="col-lg-12">
                          <FormattedMessage id="createcompany.CompanyDescription">
                            {CompanyDescription => (
                              <FormattedMessage id="createcompany.Writeaboutyourcompany">
                                {Writeaboutyourcompany => (
                                  <TextAreaField
                                    label={CompanyDescription}
                                    placeholder={Writeaboutyourcompany}
                                    name="description"
                                    type="text"
                                    value={this.state.description}
                                    onChange={this.onChange}
                                    error={errors.description}
                                  />
                                )}
                              </FormattedMessage>
                            )}
                          </FormattedMessage>
                        </div>
                        <div className="col-lg-12 mb-4">
                          <label>
                            <FormattedMessage id="editprofile.Avatar" />
                          </label>
                          <div className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              id="customFile"
                              onChange={this.onFileSelect}
                              ref={ref => (this.fileUpload = ref)}
                            />
                            <label
                              className="custom-file-label"
                              htmlFor="customFile"
                            >
                              {uploadMessage ? (
                                uploadMessage
                              ) : (
                                <FormattedMessage id="editprofile.Uploadyouravatar" />
                              )}
                            </label>
                          </div>
                          {errors.avatar && (
                            <div className="invalid-feedback">
                              {errors.avatar}
                            </div>
                          )}
                        </div>
                        <div className="col-sm-6 page-login-form">
                          <div className="login-form">
                            <FormattedMessage id="createcompany.URLtoyourTwitter">
                              {URLtoyourTwitter => (
                                <div className="form-group">
                                  <div className="input-icon">
                                    <i className="lni-twitter" />
                                    <Cleave
                                      className={classnames('form-control', {
                                        'is-invalid': errors.twitter
                                      })}
                                      options={{
                                        prefix: 'http://',
                                        lowercase: true
                                      }}
                                      placeholder={URLtoyourTwitter}
                                      name="twitter"
                                      value={this.state.twitter}
                                      onChange={this.onChange}
                                    />
                                  </div>
                                </div>
                              )}
                            </FormattedMessage>
                          </div>
                        </div>
                        <div className="col-sm-6 page-login-form">
                          <div className="login-form">
                            <FormattedMessage id="createcompany.URLtoyourFacebook">
                              {URLtoyourFacebook => (
                                <div className="form-group">
                                  <div className="input-icon">
                                    <i className="lni-facebook" />
                                    <Cleave
                                      className={classnames('form-control', {
                                        'is-invalid': errors.facebook
                                      })}
                                      options={{
                                        prefix: 'http://',
                                        lowercase: true
                                      }}
                                      placeholder={URLtoyourFacebook}
                                      name="facebook"
                                      value={this.state.facebook}
                                      onChange={this.onChange}
                                    />
                                  </div>
                                </div>
                              )}
                            </FormattedMessage>
                          </div>
                        </div>
                        <div className="col-sm-6 page-login-form">
                          <div className="login-form">
                            <FormattedMessage id="createcompany.URLtoyourInstagram">
                              {URLtoyourInstagram => (
                                <div className="form-group">
                                  <div className="input-icon">
                                    <i className="lni-instagram" />
                                    <Cleave
                                      className={classnames('form-control', {
                                        'is-invalid': errors.instagram
                                      })}
                                      options={{
                                        prefix: 'http://',
                                        lowercase: true
                                      }}
                                      placeholder={URLtoyourInstagram}
                                      name="instagram"
                                      value={this.state.instagram}
                                      onChange={this.onChange}
                                    />
                                  </div>
                                </div>
                              )}
                            </FormattedMessage>
                          </div>
                        </div>
                        <div className="col-sm-6 page-login-form">
                          <div className="login-form">
                            <FormattedMessage id="createcompany.URLtoyourYoutube">
                              {URLtoyourYoutube => (
                                <div className="form-group">
                                  <div className="input-icon">
                                    <i className="lni-display" />
                                    <Cleave
                                      className={classnames('form-control', {
                                        'is-invalid': errors.youtube
                                      })}
                                      options={{
                                        prefix: 'http://',
                                        lowercase: true
                                      }}
                                      placeholder={URLtoyourYoutube}
                                      name="youtube"
                                      value={this.state.youtube}
                                      onChange={this.onChange}
                                    />
                                  </div>
                                </div>
                              )}
                            </FormattedMessage>
                          </div>
                        </div>
                        <div className="mx-auto">
                          <FormattedMessage id="createcompany.addnewcompany">
                            {Addnewcompany => (
                              <input
                                type="submit"
                                value={Addnewcompany}
                                className="btn btn-common mt-2"
                              />
                            )}
                          </FormattedMessage>
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

CreateCompany.propTypes = {
  auth: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  company: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  company: state.company,
  errors: state.errors,
  locale: state.locale
});

export default connect(
  mapStateToProps,
  { logoutUser, createCompany }
)(withRouter(CreateCompany));
