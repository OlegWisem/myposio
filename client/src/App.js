import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Footer from './components/layout/Footer';

import Home from './components/home/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import ForgotPasswordSuccess from './components/forgot-password/SuccessMessage';
import ResetPassword from './components/reset-password/ResetPassword';
import Dashboard from './components/dashboard/Dashboard';
import CreateCompany from './components/create-company/CreateCompany';
import EditCompany from './components/edit-company/EditCompany';
import EditProfile from './components/edit-profile/EditProfile';
import ChangePassword from './components/change-password/ChangePassword';
import Catalog from './components/catalog/Catalog';
import Company from './components/company/Company';
import Review from './components/review/Review';
import { IntlProvider } from 'react-intl';
import messages from './lang/messages';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currectTime = Date.now() / 1000;
  if (decoded.exp < currectTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Clear currect profile
    //store.dispatch(clearCurrentProfile());

    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    const { lang } = this.props;
    return (
      <IntlProvider
        locale={lang}
        messages={messages[lang]}
        key={lang}
        textComponent={React.Fragment}
      >
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/catalog" component={Catalog} />
              <Route exact path="/company/:id" component={Company} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/reset" component={ResetPassword} />
              <Route
                exact
                path="/forgot-password/success"
                component={ForgotPasswordSuccess}
              />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-company"
                component={CreateCompany}
              />
              <PrivateRoute
                exact
                path="/edit-company/:company_id"
                component={EditCompany}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/change-password"
                component={ChangePassword}
              />
              <PrivateRoute exact path="/review" component={Review} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  lang: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    lang: state.locale.lang
  };
}

export default connect(
  mapStateToProps,
  {}
)(App);
