import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import TextField from '../common/TextField';
import Banner from '../common/Banner';
import Navbar from '../layout/Navbar';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
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
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Navbar />
        <Banner pageName="Register" />
        <div id="content" className="section-padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-5 col-md-6 col-xs-12">
                <div className="page-login-form box">
                  <h3>Create Your account</h3>
                  <form
                    className="login-form"
                    onSubmit={this.onSubmit}
                    noValidate
                  >
                    <TextField
                      placeholder="Your Name"
                      name="name"
                      type="text"
                      icon="lni-bubble"
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name}
                    />
                    <TextField
                      placeholder="Email"
                      name="email"
                      type="email"
                      icon="lni-envelope"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                    <TextField
                      placeholder="Password"
                      name="password"
                      type="password"
                      icon="lni-lock"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />
                    <TextField
                      placeholder="Retype Password"
                      name="password2"
                      type="password"
                      icon="lni-unlock"
                      value={this.state.password2}
                      onChange={this.onChange}
                      error={errors.password2}
                    />

                    <input
                      type="submit"
                      value="Register"
                      className="btn btn-common log-btn mt-3"
                    />
                    <p className="text-center">
                      Already have an account?
                      <Link to="/login"> Sign In</Link>
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
