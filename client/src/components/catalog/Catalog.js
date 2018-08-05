import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CatalogItem from './CatalogItem';
import { getCompanies } from '../../actions/companyActions';
import Spinner from '../common/Spinner';
import Banner from '../common/Banner';
import Navbar from '../layout/Navbar';
import SelectList from '../common/SelectList';
import { FormattedMessage } from 'react-intl';
import options from '../common/Options';

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      category: ''
    };
  }
  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

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
        let updatedList = companies.filter(item => {
          return (
            item.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
            -1
          );
        });
        updatedList = updatedList.filter(item => {
          return item.category.indexOf(this.state.category) !== -1;
        });
        companyItems = updatedList.map(company => (
          <CatalogItem key={company._id} company={company} />
        ));
      } else {
        companyItems = (
          <h4>
            <FormattedMessage id="catalog.Nocompaniesfound" />
          </h4>
        );
      }
    }

    return (
      <div>
        <Navbar />
        <FormattedMessage id="catalog.catalog">
          {catalog => <Banner pageName={catalog} />}
        </FormattedMessage>
        <div className="main-container section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 col-md-12 col-xs-12">
                <div className="search-add">
                  <form>
                    <div className="form-group">
                      <FormattedMessage id="catalog.searchforacompany">
                        {searchfoacompany => (
                          <input
                            type="search"
                            className="form-control"
                            name="field-name"
                            placeholder={searchfoacompany}
                            onChange={this.updateSearch.bind(this)}
                            value={this.state.search}
                          />
                        )}
                      </FormattedMessage>
                      <button type="submit" className="search-btn">
                        <span className="lni-search" />
                      </button>
                    </div>
                  </form>
                </div>
                <div className="listing-container list-layout">
                  {companyItems}
                </div>
              </div>
              <div className="col-lg-3 col-md-12 col-xs-12">
                {/* Sidebar Start */}
                <div className="sidebar sticky right">
                  {/* Widget */}
                  <div className="widget">
                    <h3 className="sidebar-title">
                      <FormattedMessage id="catalog.filter" />
                    </h3>
                    <div className="row with-forms">
                      <div className="col-md-12">
                        <SelectList
                          name="category"
                          value={this.state.category}
                          onChange={this.onChange}
                          option={options}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Widget End */}
                </div>
                {/* Sidebar End */}
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
