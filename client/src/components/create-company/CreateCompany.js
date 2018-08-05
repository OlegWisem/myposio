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

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();

    const companyData = {
      name: this.state.name,
      field: this.state.field,
      companyid: this.state.companyid,
      address: this.state.address,
      description: this.state.description,
      phone: this.state.phone,
      email: this.state.email,
      website: this.state.website,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      category: this.state.category
    };

    this.props.createCompany(companyData, this.props.history);
  };
  render() {
    const { errors } = this.state;
    const options = [
      { value: 0, label: <FormattedMessage id="category.SelectCategory" /> },
      {
        value: 'Car repair, service stations, vehicle inspection',
        label: <FormattedMessage id="category.Servicestations" />
      },
      {
        value: 'Excavation',
        label: <FormattedMessage id="category.Excavation" />
      },
      {
        value: 'Property maintenance, laundry, safety',
        label: <FormattedMessage id="category.Propertymaintenance" />
      },
      {
        value: 'Real estate, plots',
        label: <FormattedMessage id="category.Realestate" />
      },
      {
        value: 'Accountancy, advocacy, notary',
        label: <FormattedMessage id="category.Accountancy" />
      },
      {
        value: 'Flower shop, undertaker',
        label: <FormattedMessage id="category.Flowershop" />
      },
      {
        value: 'Transport and towing, taxi',
        label: <FormattedMessage id="category.Transportandtowing" />
      },
      {
        value: 'Sports and recreation, associations',
        label: <FormattedMessage id="category.Sportsandrecreation" />
      },
      {
        value: 'Plumber, construction, and electricity',
        label: <FormattedMessage id="category.Plumberconstruction" />
      },
      {
        value: 'Advertising, internet, and coding',
        label: <FormattedMessage id="category.Advertising" />
      },
      {
        value: 'Accommodation, travelling, and equipment rental',
        label: <FormattedMessage id="category.Accommodation" />
      },
      {
        value: 'Metalworks, industry maintenance',
        label: <FormattedMessage id="category.Metalworks" />
      },
      {
        value: 'Banks, insurances, real estate management',
        label: <FormattedMessage id="category.Banks" />
      },
      {
        value: 'Hairdresser, beauty treatment',
        label: <FormattedMessage id="category.Hairdresser" />
      },
      {
        value: 'Grocery, specialised shops',
        label: <FormattedMessage id="category.Grocery" />
      },
      {
        value: 'Restaurants, cafes, catering',
        label: <FormattedMessage id="category.Restaurants" />
      },
      {
        value: 'Health, wellness, massage',
        label: <FormattedMessage id="category.Health" />
      },
      {
        value: 'Roadworks, maintenance, forest services',
        label: <FormattedMessage id="category.Roadworks" />
      },
      {
        value: 'Other',
        label: <FormattedMessage id="category.Other" />
      }
    ];
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
                                  <TextField
                                    label={BusinessID}
                                    placeholder={EnterYourBusinessID}
                                    name="companyid"
                                    type="text"
                                    value={this.state.companyid}
                                    onChange={this.onChange}
                                    error={errors.companyid}
                                  />
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
                                  <TextField
                                    label={PhoneNumber}
                                    placeholder={PhoneNumberExample}
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
                                  <TextField
                                    label={CompanyWebsite}
                                    placeholder={EnterYourCompanyWebsite}
                                    name="website"
                                    type="text"
                                    value={this.state.website}
                                    onChange={this.onChange}
                                    error={errors.website}
                                  />
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
                        <div className="col-sm-6 page-login-form">
                          <div className="login-form">
                            <FormattedMessage id="createcompany.URLtoyourTwitter">
                              {URLtoyourTwitter => (
                                <TextField
                                  placeholder={URLtoyourTwitter}
                                  name="twitter"
                                  icon="lni-twitter"
                                  type="text"
                                  value={this.state.twitter}
                                  onChange={this.onChange}
                                  error={errors.twitter}
                                />
                              )}
                            </FormattedMessage>
                          </div>
                        </div>
                        <div className="col-sm-6 page-login-form">
                          <div className="login-form">
                            <FormattedMessage id="createcompany.URLtoyourFacebook">
                              {URLtoyourFacebook => (
                                <TextField
                                  placeholder={URLtoyourFacebook}
                                  name="facebook"
                                  icon="lni-facebook"
                                  type="text"
                                  value={this.state.facebook}
                                  onChange={this.onChange}
                                  error={errors.facebook}
                                />
                              )}
                            </FormattedMessage>
                          </div>
                        </div>
                        <div className="col-sm-6 page-login-form">
                          <div className="login-form">
                            <FormattedMessage id="createcompany.URLtoyourInstagram">
                              {URLtoyourInstagram => (
                                <TextField
                                  placeholder={URLtoyourInstagram}
                                  name="instagram"
                                  icon="lni-instagram"
                                  type="text"
                                  value={this.state.instagram}
                                  onChange={this.onChange}
                                  error={errors.instagram}
                                />
                              )}
                            </FormattedMessage>
                          </div>
                        </div>
                        <div className="col-sm-6 page-login-form">
                          <div className="login-form">
                            <FormattedMessage id="createcompany.URLtoyourYoutube">
                              {URLtoyourYoutube => (
                                <TextField
                                  placeholder={URLtoyourYoutube}
                                  name="youtube"
                                  icon="lni-display"
                                  type="text"
                                  value={this.state.youtube}
                                  onChange={this.onChange}
                                  error={errors.youtube}
                                />
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
  errors: PropTypes.object.isRequired,
  company: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  company: state.company,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, createCompany }
)(withRouter(CreateCompany));
