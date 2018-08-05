import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import Banner from '../common/Banner';
import TextField from '../common/TextField';
import TextAreaField from '../common/TextAreaField';
import {
  editCompany,
  getCompanyByID,
  clearCurrentCompany,
  deleteCompanyByID
} from '../../actions/companyActions';
import SideNavbar from '../layout/SideNavbar';
import Navbar from '../layout/Navbar';
import SelectList from '../common/SelectList';
import { FormattedMessage } from 'react-intl';
import options from '../common/Options';

class EditCompany extends Component {
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
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCompanyByID(this.props.match.params.company_id);
    this.props.clearCurrentCompany();
  }

  componentDidUpdate(prevProps) {
    if (this.props.company !== prevProps.company) {
      const { ...company } = this.props.company.company_item;
      this.setState(prevState => ({
        ...prevState,
        ...company
      }));
    }
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

  onDeleteClick(e) {
    this.props.deleteCompanyByID(
      this.props.match.params.company_id,
      this.props.history
    );
  }

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
      category: this.state.category,
      locale: this.props.locale.lang
    };

    this.props.editCompany(
      companyData,
      this.props.match.params.company_id,
      this.props.history
    );
  };
  render() {
    const { errors } = this.state;

    return (
      <div>
        <Navbar />
        <FormattedMessage id="editcompany.editcompany">
          {editcompany => <Banner pageName={editcompany} />}
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
                    <FormattedMessage id="editcompany.editcompany" />
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
                          <FormattedMessage id="editcompany.editcompany">
                            {editcompany => (
                              <input
                                type="submit"
                                value={editcompany}
                                className="btn btn-common mt-2"
                              />
                            )}
                          </FormattedMessage>
                          <button
                            onClick={this.onDeleteClick.bind(this)}
                            className="btn btn-danger mt-2 ml-2"
                          >
                            <FormattedMessage id="editcompany.deletecompany" />
                          </button>
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

EditCompany.propTypes = {
  auth: PropTypes.object.isRequired,
  locale: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  company: state.company,
  errors: state.errors,
  locale: state.locale
});

export default connect(
  mapStateToProps,
  {
    logoutUser,
    editCompany,
    getCompanyByID,
    clearCurrentCompany,
    deleteCompanyByID
  }
)(withRouter(EditCompany));
