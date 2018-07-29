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
      category: null,
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
      { value: 'Service stations', label: 'Service stations' },
      {
        value: 'Maintenance and Construction',
        label: 'Maintenance and Construction'
      },
      { value: 'Furniture and Home Sales', label: 'Furniture and Home Sales' },
      {
        value: 'Waste Management and Recycling',
        label: 'Waste Management and Recycling'
      },
      { value: 'Real Estate', label: 'Real Estate' },
      { value: 'Transport Services', label: 'Transport Services' },
      { value: 'Sports and Recreation', label: 'Sports and Recreation' },
      { value: 'Accommodation', label: 'Accommodation' },
      { value: 'Tourist destinations', label: 'Tourist destinations' },
      { value: 'Forest Services', label: 'Forest Services' },
      { value: 'Restaurants', label: 'Restaurants' },
      { value: 'Grocery', label: 'Grocery' },
      { value: 'Health and wellness', label: 'Health and wellness' },
      { value: 'Equipment rental', label: 'Equipment rental' },
      { value: 'Other Services', label: 'Other Services' }
    ];
    return (
      <div>
        <Navbar />
        <Banner pageName="Add new company" />
        <section className="user-page section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-5 col-xs-12">
                <SideNavbar />
              </div>
              <div className="col-lg-8 col-md-7 col-xs-12">
                <div className="my-address">
                  <h3 className="heading">Add new company</h3>
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
                          <SelectList
                            name="category"
                            value={this.state.category}
                            onChange={this.onChange}
                            option={options}
                            error={errors.category}
                            label="Category"
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
                            value="Add new company"
                            className="btn btn-common mt-2"
                          />
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
