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
      instagram: this.state.instagram
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
        <Banner pageName="Edit company" />
        <section className="user-page section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-5 col-xs-12">
                <SideNavbar />
              </div>
              <div className="col-lg-8 col-md-7 col-xs-12">
                <div className="my-address">
                  <h3 className="heading">Edit company</h3>
                  <div className="section-inforamation">
                    <form onSubmit={this.onSubmit}>
                      <div className="row">
                        <div className="col-sm-6">
                          <TextField
                            label="Company Name"
                            placeholder="Enter Your Company Name"
                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                          />
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            label="Company Field"
                            placeholder="Enter Your Company Field"
                            name="field"
                            type="text"
                            value={this.state.field}
                            onChange={this.onChange}
                            error={errors.field}
                          />
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            label="Company ID"
                            placeholder="Enter Your Company ID"
                            name="companyid"
                            type="text"
                            value={this.state.companyid}
                            onChange={this.onChange}
                            error={errors.companyid}
                          />
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            label="Phone Number"
                            placeholder="Ex: 0123456789"
                            name="phone"
                            type="text"
                            value={this.state.phone}
                            onChange={this.onChange}
                            error={errors.phone}
                          />
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            label="Email Address"
                            placeholder="Ex: example@domain.com"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                          />
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            label="Company Address"
                            placeholder="Enter Your Company Address"
                            name="address"
                            type="text"
                            value={this.state.address}
                            onChange={this.onChange}
                            error={errors.address}
                          />
                        </div>
                        <div className="col-sm-6">
                          <TextField
                            label="Company Website"
                            placeholder="Enter Your Company Website"
                            name="website"
                            type="text"
                            value={this.state.website}
                            onChange={this.onChange}
                            error={errors.website}
                          />
                        </div>
                        <div className="col-lg-12">
                          <TextAreaField
                            label="Company Description"
                            placeholder="Write about your company"
                            name="description"
                            type="text"
                            value={this.state.description}
                            onChange={this.onChange}
                            error={errors.description}
                          />
                        </div>
                        <div className="col-sm-6 page-login-form">
                          <div className="login-form">
                            <TextField
                              placeholder="URL to your Twitter"
                              name="twitter"
                              icon="lni-twitter"
                              type="text"
                              value={this.state.twitter}
                              onChange={this.onChange}
                              error={errors.twitter}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 page-login-form">
                          <div className="login-form">
                            <TextField
                              placeholder="URL to your Facebook"
                              name="facebook"
                              icon="lni-facebook"
                              type="text"
                              value={this.state.facebook}
                              onChange={this.onChange}
                              error={errors.facebook}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 page-login-form">
                          <div className="login-form">
                            <TextField
                              placeholder="URL to your Instagram"
                              name="instagram"
                              icon="lni-instagram"
                              type="text"
                              value={this.state.instagram}
                              onChange={this.onChange}
                              error={errors.instagram}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6 page-login-form">
                          <div className="login-form">
                            <TextField
                              placeholder="URL to your Youtube"
                              name="youtube"
                              icon="lni-display"
                              type="text"
                              value={this.state.youtube}
                              onChange={this.onChange}
                              error={errors.youtube}
                            />
                          </div>
                        </div>
                        <div className="mx-auto">
                          <input
                            type="submit"
                            value="Edit company"
                            className="btn btn-common mt-2"
                          />
                          <button
                            onClick={this.onDeleteClick.bind(this)}
                            className="btn btn-danger mt-2 ml-2"
                          >
                            Delete company
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
  errors: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  company: state.company,
  errors: state.errors
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
