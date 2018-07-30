import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CatalogItem from './CatalogItem';
import { getCompanies } from '../../actions/companyActions';
import Spinner from '../common/Spinner';
import Banner from '../common/Banner';
import Navbar from '../layout/Navbar';
import SelectList from '../common/SelectList';

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

    const options = [
      { value: 0, label: 'Select Catelogy' },
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
                <div className="search-add">
                  <form>
                    <div className="form-group">
                      <input
                        type="search"
                        className="form-control"
                        name="field-name"
                        placeholder="Search for a company"
                        onChange={this.updateSearch.bind(this)}
                        value={this.state.search}
                      />
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
                    <h3 className="sidebar-title">Filter</h3>
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
                    <button className="fullwidth btn btn-common">Search</button>
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
