import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CatalogItem from './CatalogItem';
import { getCompanies } from '../../actions/companyActions';
import Spinner from '../common/Spinner';
import Banner from '../common/Banner';
import Navbar from '../layout/Navbar';

class Catalog extends Component {
  componentDidMount() {
    this.props.getCompanies();
  }

  render() {
    const { companies, loading } = this.props.company;
    let companyItems;

    if (companies == null || loading) {
      companyItems = <Spinner />;
    } else {
      if (companies.length > 0) {
        companyItems = companies.map(company => (
          <CatalogItem key={company._id} company={company} />
        ));
      } else {
        companyItems = <h4>No companies found...</h4>;
      }
    }

    return (
      <div>
        <Navbar />
        <Banner pageName="Catalog" />
        <div className="main-container section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-md-12 col-xs-12">
                <div className="listing-container list-layout">
                  {companyItems}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Catalog.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  company: state.company
});

export default connect(
  mapStateToProps,
  { getCompanies }
)(Catalog);
