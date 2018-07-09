import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Banner from '../common/Banner';
import { logoutUser } from '../../actions/authActions';
import { getCurrentCompany } from '../../actions/companyActions';
import Spinner from '../common/Spinner';

class Dashboard extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    //this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  componentDidMount() {
    this.props.getCurrentCompany();
  }

  render() {
    const { user } = this.props.auth;
    const { company, loading } = this.props.company;

    let dashboardContent;

    if (company === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has company data
      if (Object.keys(company).length > 0) {
        dashboardContent = <div>DASHBOARD DATA</div>;
      } else {
        // User is logged in but has no company
        dashboardContent = (
          <div>
            <div className="text-center">
              <h5>You have not yet setup company, please add some info.</h5>
              <Link to="/create-company" className="btn btn-common mt-2">
                Add new company
              </Link>
            </div>
          </div>
        );
      }
    }
    return (
      <div>
        <Banner pageName="Dashboard" />
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
                        <Link className="active" to="/dashboard">
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
                <div className="dashborad-box">
                  <h4 className="title">Your Companies</h4>
                  <div className="property-wrap">
                    <div className="property-item">
                      <div className="item-body">{dashboardContent}</div>
                    </div>
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

Dashboard.propTypes = {
  getCurrentCompany: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  company: state.company
});

export default connect(
  mapStateToProps,
  { getCurrentCompany, logoutUser }
)(Dashboard);
