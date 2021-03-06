import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Banner from '../common/Banner';
import {
  getCompaniesForReview,
  clearCompanyItem,
  publishCompany,
  deleteCompanyByID
} from '../../actions/companyActions';
import Spinner from '../common/Spinner';
import isEmpty from '../../validation/is-empty';
import SideNavbar from '../layout/SideNavbar';
import Navbar from '../layout/Navbar';
import { FormattedMessage } from 'react-intl';

class Review extends Component {
  componentDidMount() {
    this.props.getCompaniesForReview();
    this.props.clearCompanyItem();
  }
  render() {
    const { company, loading } = this.props.company;

    let dashboardContent;

    if (company === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has company data
      if (Object.keys(company).length > 0) {
        dashboardContent = company.map(companyItem => (
          <div key={companyItem._id}>
            <div className="mb-4">
              <h3 className="property-title mb-0">
                <Link to="/dashboard">{companyItem.name}</Link>
              </h3>
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
                    <li>
                      <div className="adderess">
                        <i className="lni-world" /> {companyItem.companyid}
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="col-md-5 col-sm-12">
                  <ul className="additional-details">
                    {isEmpty(companyItem.phone) ? null : (
                      <li>
                        <strong>
                          <FormattedMessage id="review.phone" />
                        </strong>
                        <span>{companyItem.phone}</span>
                      </li>
                    )}
                    {isEmpty(companyItem.email) ? null : (
                      <li>
                        <strong>
                          <FormattedMessage id="review.email" />
                        </strong>
                        <span>{companyItem.email}</span>
                      </li>
                    )}
                    {isEmpty(companyItem.website) ? null : (
                      <li>
                        <strong>
                          <FormattedMessage id="review.www" />
                        </strong>
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
                      to={`/company/${companyItem._id}`}
                      className="btn btn-common mt-2"
                    >
                      <FormattedMessage id="review.View" />
                    </Link>
                    <br />
                    <Link
                      to={`/edit-company/${companyItem._id}`}
                      className="btn btn-common mt-2"
                    >
                      <FormattedMessage id="review.Edit" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
                  onClick={() => this.props.publishCompany(companyItem._id)}
                  className="btn btn-success mt-2"
                >
                  <FormattedMessage id="review.Publish" />
                </button>
                <button
                  onClick={() =>
                    this.props.deleteCompanyByID(
                      companyItem._id,
                      this.props.history
                    )
                  }
                  className="btn btn-danger mt-2 ml-2"
                >
                  <FormattedMessage id="review.Delete" />
                </button>
              </div>
            </div>
          </div>
        ));
      } else {
        dashboardContent = (
          <div>
            <div className="text-center">
              <h5>
                <FormattedMessage id="review.NoCompany" />
              </h5>
            </div>
          </div>
        );
      }
    }
    return (
      <div>
        <Navbar />
        <FormattedMessage id="review.reviewcompanies">
          {reviewcompanies => <Banner pageName={reviewcompanies} />}
        </FormattedMessage>
        <section className="user-page section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-5 col-xs-12">
                <SideNavbar />
              </div>
              <div className="col-lg-8 col-md-7 col-xs-12">
                <div className="dashborad-box">
                  <h4 className="title">
                    <FormattedMessage id="review.CompaniesforReview" />
                  </h4>
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

Review.propTypes = {
  getCompaniesForReview: PropTypes.func.isRequired,
  publishCompany: PropTypes.func.isRequired,
  deleteCompanyByID: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  company: state.company
});

export default connect(
  mapStateToProps,
  { getCompaniesForReview, clearCompanyItem, publishCompany, deleteCompanyByID }
)(Review);
