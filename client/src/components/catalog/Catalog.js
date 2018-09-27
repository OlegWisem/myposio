import React, { Component } from 'react';
import update from 'immutability-helper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CatalogItem from './CatalogItem';
import { getCompanies } from '../../actions/companyActions';
import Spinner from '../common/Spinner';
import Banner from '../common/Banner';
import Navbar from '../layout/Navbar';
import FilterList from '../common/FilterList';
import { FormattedMessage } from 'react-intl';
import options from '../common/Options';
import isEmpty from '../../validation/is-empty';
import { withRouter } from 'react-router-dom';
import windowSize from 'react-window-size';

class Catalog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      categoryDrawerOpen: false,
      category: []
    };
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  categoryToggleClickHandler = () => {
    this.setState(prevState => {
      return { categoryDrawerOpen: !prevState.categoryDrawerOpen };
    });
  };

  categoryBackdropClickHangler = () => {
    this.setState({ categoryDrawerOpen: false });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onCheckboxChange(e) {
    if (e.target.checked) {
      // Add to array if checked
      this.setState(update(this.state, { category: { $push: [e.target.id] } }));
    } else {
      // Remove from array if unchecked
      this.setState(
        update(this.state, {
          category: { $splice: [[this.state.category.indexOf(e.target.id), 1]] }
        })
      );
    }
  }

  componentDidMount() {
    <FormattedMessage id="catalog.title">
      {title => (document.title = title)}
    </FormattedMessage>;
    this.props.getCompanies();
    const parsed = new URLSearchParams(this.props.location.search);
    const search = !isEmpty(parsed.get('search')) ? parsed.get('search') : '';
    this.setState({ search });
  }

  render() {
    const { companies, loading } = this.props.company;

    let categoryDrawerClasses = 'side-drawer-catalog';
    if (this.state.categoryDrawerOpen) {
      categoryDrawerClasses = 'side-drawer-catalog open';
    }

    let companyItems;

    if (companies == null || loading) {
      companyItems = <Spinner />;
    } else {
      if (companies.length > 0) {
        let updatedList = companies;
        if (this.state.search !== '') {
          updatedList = updatedList.filter(item => {
            return (
              item.name
                .toLowerCase()
                .indexOf(this.state.search.toLowerCase()) !== -1
            );
          });
        }
        if (!isEmpty(this.state.category)) {
          updatedList = updatedList.filter(item => {
            return (
              (this.state.category.indexOf(item.category) !== -1 ||
                this.state.category.indexOf(item.secondaryCategory)) !== -1
            );
          });
        }
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
              <div className="col-xl-8 col-sm-12">
                <div className="row">
                  <div
                    className="col-xl-12 col-10"
                    style={{ paddingRight: '0px' }}
                  >
                    <div className="search-add">
                      <form>
                        <div className="form-group">
                          <FormattedMessage id="catalog.searchforacompany">
                            {searchfoacompany => (
                              <input
                                type="search"
                                className="form-control-search"
                                name="field-name"
                                placeholder={searchfoacompany}
                                onChange={this.updateSearch.bind(this)}
                                value={this.state.search}
                              />
                            )}
                          </FormattedMessage>
                          <div className="arrow-left-catalog" />
                          <button type="submit" className="search-btn">
                            <span className="lni-search" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-2 d-xl-none filter-icon">
                    <button
                      className="filter-btn"
                      onClick={this.categoryToggleClickHandler.bind(this)}
                    >
                      <span className="lni-funnel" />
                    </button>
                  </div>
                </div>
                <div className="listing-container list-layout">
                  {companyItems}
                </div>
              </div>
              {this.props.windowWidth > 1200 ? (
                <div className="col-lg-4 col-sm-12 d-none d-xl-block">
                  <div className="sidebar sticky right">
                    <div className="widget">
                      <h3 className="sidebar-title text-center">
                        <FormattedMessage id="catalog.filter" />
                      </h3>
                      <div className="row with-forms">
                        <div className="col-md-12">
                          <div className="property-main">
                            <div className="checkboxes one-in-row">
                              <FilterList
                                onChange={this.onCheckboxChange.bind(this)}
                                option={options}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <nav className={categoryDrawerClasses}>
                  <a
                    className="sidebar-close"
                    onClick={this.categoryToggleClickHandler.bind(this)}
                  >
                    <span className="lni-close" />
                  </a>
                  <ul className="sidebar-items">
                    <div className="checkboxes-mobile checkboxes one-in-row">
                      <FilterList
                        onChange={this.onCheckboxChange.bind(this)}
                        option={options}
                      />
                    </div>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>

        {this.state.categoryDrawerOpen && (
          <div
            className="backdrop"
            onClick={this.categoryBackdropClickHangler.bind(this)}
          />
        )}
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

export default windowSize(
  withRouter(
    connect(
      mapStateToProps,
      { getCompanies }
    )(Catalog)
  )
);
