import React, { Component } from 'react';
import Navbar from '../layout/Navbar';
import { Link, withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  componentDidMount() {
    document.title = 'MyPosio - Home';
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    this.props.history.push(
      `/catalog?search=${encodeURIComponent(this.state.search)}`
    );
  };

  render() {
    return (
      <div>
        <Navbar />
        <section id="intro" className="section-intro">
          <div className="search-container">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h4 className="intro-sub-heading">
                    <FormattedMessage id="home.secondline" />
                  </h4>
                  <h2>
                    <FormattedMessage id="home.firstline" />
                  </h2>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-xs-6 offset-lg-3">
                      <div className="content">
                        <form onSubmit={this.onSubmit}>
                          <div className="search-add">
                            <div className="form-group">
                              <FormattedMessage id="home.searchInCatalog">
                                {searchInCatalog => (
                                  <input
                                    className="form-control-search"
                                    type="text"
                                    placeholder={searchInCatalog}
                                    onChange={this.onChange}
                                    value={this.state.search}
                                    name="search"
                                  />
                                )}
                              </FormattedMessage>
                              <div className="arrow-left" />
                              <button type="submit" className="search-btn">
                                <span className="lni-search" />
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title-header text-center">
                  <p>
                    <FormattedMessage id="home.posio" />
                  </p>
                  <h2 className="section-title">
                    <FormattedMessage id="home.servicesAndCompanies" />
                  </h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12 mb-4">
                <div className="text-center">
                  <h2 className="mb-2">
                    <FormattedMessage id="home.catalog" />
                  </h2>
                  <p>
                    <FormattedMessage id="home.catalogParagraph" />
                  </p>
                  <Link to="/catalog" className="btn btn-common mt-2">
                    <FormattedMessage id="home.catalogButton" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12 mb-4">
                <div className="text-center">
                  <h2 className="mb-2">
                    <FormattedMessage id="home.product" />
                  </h2>
                  <p>
                    <FormattedMessage id="home.productParagraph" />
                  </p>
                  <Link to="/product" className="btn btn-common mt-2">
                    <FormattedMessage id="home.productButton" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(Home);
