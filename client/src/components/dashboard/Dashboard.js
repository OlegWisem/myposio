import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Banner from '../common/Banner';
import {
  getCurrentCompany,
  clearCompanyItem
} from '../../actions/companyActions';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';
import SideNavbar from '../layout/SideNavbar';
import Navbar from '../layout/Navbar';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentCompany();
    this.props.clearCompanyItem();
  }

  render() {
    //const { user } = this.props.auth;
    const { company, loading } = this.props.company;

    let dashboardContent;

    if (company === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has company data
      if (Object.keys(company).length > 0) {
        dashboardContent = company.map(companyItem => (
          <div key={companyItem._id}>
            <div className="mb-2">
              <h3 className="property-title mb-0">
                <Link to="/dashboard">{companyItem.name}</Link>
              </h3>
              {companyItem.isreviewed === true ? (
                <span className="text-success">Published</span>
              ) : (
                <span className="text-danger" style={{ fontSize: 14 }}>
                  Under Review
                </span>
              )}
              <div className="row">
                <div className="col-md-4 col-sm-12">
                  <ul className="additional-details">
                    <li>
                      <div className="adderess">
                        <i className="lni-apartment" /> {companyItem.field}
                      </div>
                    </li>
                    <li>
                      <div className="adderess">
                        <i className="lni-map-marker" /> {companyItem.address}
                      </div>
                    </li>
                    {isEmpty(companyItem.companyid) ? null : (
                      <li>
                        <div className="adderess">
                          <i className="lni-world" /> {companyItem.companyid}
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="col-md-5 col-sm-12">
                  <ul className="additional-details">
                    {isEmpty(companyItem.phone) ? null : (
                      <li>
                        <strong>Puh.:</strong>
                        <span>{companyItem.phone}</span>
                      </li>
                    )}
                    {isEmpty(companyItem.email) ? null : (
                      <li>
                        <strong>E-mail:</strong>
                        <span>{companyItem.email}</span>
                      </li>
                    )}
                    {isEmpty(companyItem.website) ? null : (
                      <li>
                        <strong>www:</strong>
                        <span>
                          <a href={companyItem.website}>
                            {companyItem.website}
                          </a>
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="col-md-3 col-sm-12">
                  <div className="text-center">
                    <Link
                      to={`/edit-company/${companyItem._id}`}
                      className="btn btn-common mt-2"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ));
      } else {
        // User is logged in but has no company
        dashboardContent = (
          <div>
            <div className="text-center">
              <h5>You have not yet setup company, please add some info.</h5>
            </div>
          </div>
        );
      }
    }
    return (
      <div>
        <Navbar />
        <Banner pageName="Dashboard" />
        <section className="user-page section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-5 col-xs-12">
                <SideNavbar />
              </div>
              <div className="col-lg-8 col-md-7 col-xs-12">
                <div className="dashborad-box">
                  <h4 className="title">Your Companies</h4>
                  <div className="property-wrap">
                    <div className="property-item">
                      <div className="item-body">
                        {dashboardContent}
                        <div className="text-center">
                          <Link
                            to="/create-company"
                            className="btn btn-common mt-2"
                          >
                            Add new company
                          </Link>
                        </div>
                      </div>
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
  { getCurrentCompany, clearCompanyItem }
)(Dashboard);
