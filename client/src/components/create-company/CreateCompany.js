import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import Banner from '../common/Banner';
import TextField from '../common/TextField';
import TextAreaField from '../common/TextAreaField';

class CreateCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      field: '',
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onLogoutClick(e) {
    e.preventDefault();
    //this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {};
  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;

    return (
      <div>
        <Banner pageName="Add new company" />
        <section className="user-page section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-5 col-xs-12">
                <div className="user-profile-box">
                  {/*header */}
                  <div className="header clearfix">
                    <h2>{user.name}</h2>
                    <img
                      src="../../img/avatar.jpg"
                      alt="avatar"
                      className="img-fluid profile-img"
                    />
                  </div>
                  {/* Detail */}
                  <div className="detail clearfix">
                    <ul>
                      <li>
                        <Link to="/dashboard">
                          <i className="lni-files" /> Dashboard
                        </Link>
                      </li>
                      <li>
                        <a href="" onClick={this.onLogoutClick.bind(this)}>
                          <i className="lni-exit" />Log Out
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-7 col-xs-12">
                <div className="my-address">
                  <h3 className="heading">Add new company</h3>
                  <div className="section-inforamation">
                    <form>
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  company: state.company,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(CreateCompany));
