import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { clearCurrentCompany } from '../../actions/companyActions';
import { updateProfile, getCurrentProfile } from '../../actions/authActions';
import Banner from '../common/Banner';
import TextField from '../common/TextField';
import SideNavbar from '../layout/SideNavbar';
import Navbar from '../layout/Navbar';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      phone: '',
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
  onSubmit = e => {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone
    };

    if (
      this.props.auth.profile.name !== this.state.name ||
      this.props.auth.profile.email !== this.state.email
    ) {
      if (window.confirm('Are you sure? You will be logged out.')) {
        this.props.updateProfile(userData, this.props.history, true);
      }
    }
    this.props.updateProfile(userData, this.props.history, false);
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
                  <h3 className="heading">Edit profile</h3>
                  <div className="section-inforamation">
                    <form className="login-form" onSubmit={this.onSubmit}>
                      <div className="row justify-content-center">
                        <div className="col-lg-7 col-md-8 col-xs-12">
                          <TextField
                            label="Your name"
                            placeholder="Enter Your Name"
                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                          />

                          <TextField
                            label="Your E-mail"
                            placeholder="Enter Your E-mail"
                            name="email"
                            type="text"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                          />

                          <TextField
                            label="Phone number"
                            placeholder="Enter Your phone"
                            name="phone"
                            type="text"
                            value={this.state.phone}
                            onChange={this.onChange}
                            error={errors.phone}
                          />
                          <div className="mx-auto">
                            <input
                              type="submit"
                              value="Edit company"
                              onClick={() => this.setState({ open: true })}
                              className="btn btn-common mt-2"
                            />
                            <button className="btn btn-common mt-2 ml-2">
                              Change password
                            </button>
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateProfile, clearCurrentCompany, getCurrentProfile }
)(withRouter(EditProfile));
