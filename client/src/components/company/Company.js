import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCompanyByID } from '../../actions/companyActions';
import Spinner from '../common/Spinner';
import Banner from '../common/Banner';
import Navbar from '../layout/Navbar';

class Company extends Component {
  componentDidMount() {
    this.props.getCompanyByID(this.props.match.params.id);
    this.props.clearCurrentCompany();
  }

  componentDidUpdate(prevProps) {
    if (this.props.company !== prevProps.company) {
      const { ...company } = this.props.company.company_item;
      this.setState(prevState => ({
        ...prevState,
        ...company
      }));
    }
  }

  render() {
    const { company_item, loading } = this.props.company;
    let companyContent;

    if (loading) {
      companyContent = <Spinner />;
    } else {
      companyContent = (
        <div>
          <Banner pageName={this.state.name} />
          <div id="content" className="section-padding">
            <div className="container">
              <div className="property-details">
                <div className="row">
                  <div className="col-lg-4 col-md-12 col-xs-12">
                    <div className="info">
                      <h3>Lapin Satu Ky</h3>
                      <p className="room-type">Hotelli ja ravintola</p>
                      <p className="address">
                        <i className="lni-map-marker" /> Kattavaniementie 1,
                        Posio
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* Product Info Start */}
                <div className="col-lg-8 col-md-12 col-xs-12">
                  <div className="inner-box property-dsc">
                    <h2 className="desc-title">Company Description</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Cras et dui vestibulum, bibendum purus sit amet, vulputate
                      mauris. Ut adipiscing gravida tincidunt. Duis euismod
                      placerat rhoncus. Phasellus mollis imperdiet placerat. Sed
                      ac turpis nisl. Mauris at ante mauris. Aliquam posuere
                      fermentum lorem, a aliquam mauris rutrum a. Curabitur sit
                      amet pretium lectus, nec consequat orci.{' '}
                    </p>
                    <p>
                      Duis non tincidunt dui. Sed vehicula, libero at eleifend
                      accumsan, lectus massa mollis metus, a malesuada velit
                      orci nec elit Suspendisse nisl mauris, rhoncus quis
                      faucibus vitae, commodo vitae neque. Nullam vulputate
                      feugiat diam, id tempor neque hendreit quis. Curabitur ut
                      felis ultrices, pellentesque augue ac, bibendum lorem.
                      Curabitur non volutpat augue. Aliquam malesuada
                      scelerisque tortor eget mollis.{' '}
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Facere nisi sequi quo laborum eveniet illum ex doloremque
                      porro repellat. Saepe sed atque eos inventore facilis
                      officiis dolorum, incidunt optio iure! Itaque libero et
                      vel labore voluptatem natus nulla, sunt quaerat velit
                      officia! Ipsum fuga magni, sapiente reprehenderit dolores
                      eaque excepturi facilis, praesentium.
                    </p>
                  </div>
                  <div className="inner-box short-info">
                    <h2 className="desc-title">Summary</h2>
                    <ul className="additional-details">
                      <li>
                        <strong>Puh.:</strong>
                        <span>0458864588</span>
                      </li>
                      <li>
                        <strong>E-mail:</strong>
                        <span>info@lapinsatu.com</span>
                      </li>
                      <li>
                        <strong>www:</strong>
                        <span>lapinsatu.com</span>
                      </li>
                    </ul>
                  </div>
                  <div className="inner-box location-map">
                    <h2 className="desc-title">Location On Map</h2>
                    <div id="conatiner-map" />
                  </div>
                </div>
                {/*Sidebar*/}
                <aside
                  id="sidebar"
                  className="col-lg-4 col-md-12 col-xs-12 right-sidebar"
                >
                  {/* Property Agent Widget */}
                  <div className="widget mt3">
                    <div className="agent-inner">
                      <div className="agent-title">
                        <div
                          className="agent-details mt-2"
                          style={{ marginLeft: 20 }}
                        >
                          <h3>
                            <a href="#">Irina Karppinen</a>
                          </h3>
                          <span>
                            <i className="lni-phone-handset" />045 886 4588
                          </span>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Email"
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Phone"
                      />
                      <textarea
                        className="form-control"
                        placeholder="Your Message"
                        defaultValue={''}
                      />
                      <button className="btn btn-common fullwidth mt-4">
                        Send Message
                      </button>
                    </div>
                  </div>
                  {/* Social Media */}
                  <div className="widget widget-social">
                    <h3 className="sidebar-title">Social Media</h3>
                    <ul className="social-icons">
                      <li>
                        <a className="twitter" href="#">
                          <i className="lni-twitter-filled" />
                        </a>
                      </li>
                      <li>
                        <a className="facebook" href="#">
                          <i className="lni-facebook-filled" />
                        </a>
                      </li>
                      <li>
                        <a className="google" href="#">
                          <i className="lni-google-plus" />
                        </a>
                      </li>
                      <li>
                        <a className="linkedin" href="#">
                          <i className="lni-linkedin-filled" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </aside>
                {/*End sidebar*/}
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h2 className="desc-title">Similar Companies</h2>
                </div>
                <div className="col-lg-4 col-md-6 col-xs-12">
                  <div className="property-main">
                    <div className="property-wrap">
                      <div className="property-item">
                        <div className="item-body">
                          <h3 className="property-title">
                            <a href="property.html">Kota-Husky</a>
                          </h3>
                          <div className="adderess">
                            <i className="lni-apartment" /> Safari
                          </div>
                          <div className="adderess">
                            <i className="lni-map-marker" /> Jaksamontie 58,
                            Karjalaisenniemi
                          </div>
                          <div className="pricin-list">
                            <ul className="additional-details">
                              <li>
                                <strong>Puh.:</strong>
                                <span>040 718 7287</span>
                              </li>
                              <li>
                                <strong>E-mail:</strong>
                                <span>info@kota-husky.fi</span>
                              </li>
                              <li>
                                <strong>www:</strong>
                                <span>kota-husky.fi</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-xs-12">
                  <div className="property-main">
                    <div className="property-wrap">
                      <div className="property-item">
                        <div className="item-body">
                          <h3 className="property-title">
                            <a href="property.html">
                              Valkean Peuran Valtakunta
                            </a>
                          </h3>
                          <div className="adderess">
                            <i className="lni-apartment" /> Porosafari
                          </div>
                          <div className="adderess">
                            <i className="lni-map-marker" /> Suottaniementie 31,
                            Posio
                          </div>
                          <div className="pricin-list">
                            <ul className="additional-details">
                              <li>
                                <strong>Puh.:</strong>
                                <span>040 5853 663</span>
                              </li>
                              <li>
                                <strong>E-mail:</strong>
                                <span>info@valkeapeura.fi</span>
                              </li>
                              <li>
                                <strong>www:</strong>
                                <span>valkeapeura.fi</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-xs-12">
                  <div className="property-main">
                    <div className="property-wrap">
                      <div className="property-item">
                        <div className="item-body">
                          <h3 className="property-title">
                            <a href="property.html">Samero Oy</a>
                          </h3>
                          <div className="adderess">
                            <i className="lni-apartment" /> Mökit
                          </div>
                          <div className="adderess">
                            <i className="lni-map-marker" /> Maaninkavaarantie
                            150, Karjalaisenniemi
                          </div>
                          <div className="pricin-list">
                            <ul className="additional-details">
                              <li>
                                <strong>Puh.:</strong>
                                <span>0400 261 285</span>
                              </li>
                              <li>
                                <strong>E-mail:</strong>
                                <span>matti.keranen@villipohjola.fi</span>
                              </li>
                              <li>
                                <strong>www:</strong>
                                <span>samero.fi</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        {companyContent}
      </div>
    );
  }
}

Company.propTypes = {
  getCompanyByID: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  company: state.company
});

export default connect(
  mapStateToProps,
  { getCompanyByID }
)(Company);
