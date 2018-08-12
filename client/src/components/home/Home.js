import React, { Component } from 'react';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

class Home extends Component {
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
                    <div className="col-lg-6 col-md-6 col-xs-6 offset-3">
                      <div className="content">
                        <form>
                          <div className="search-add">
                            <div className="form-group">
                              <input
                                className="form-control-search"
                                type="text"
                                placeholder="Search in catalog"
                              />
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
                  <p>Posio</p>
                  <h2 className="section-title">Services and Companies</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-sm-12">
                <div className="text-center">
                  <h1>Catalog</h1>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Libero recusandae temporibus reprehenderit. Voluptatem id
                    consectetur quaerat, tenetur nam doloribus quos.
                  </p>
                  <Link to="/catalog" className="btn btn-common mt-2">
                    Catalog
                  </Link>
                </div>
              </div>
              <div className="col-lg-6 col-sm-12">
                <div className="text-center">
                  <h2>Product</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officia tempore aliquid inventore nesciunt at sequi
                    quibusdam officiis delectus eaque quaerat?
                  </p>
                  <a href="/product" className="btn btn-common mt-2">
                    Product
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
