import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <section className="user-page section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-5 col-xs-12">
                <div className="user-profile-box">
                  {/*header */}
                  <div className="header clearfix">
                    <h2>Name Surname</h2>
                    <img
                      src="assets/img/avatar/avatar-2.jpg"
                      alt="avatar"
                      className="img-fluid profile-img"
                    />
                  </div>
                  {/* Detail */}
                  <div className="detail clearfix">
                    <ul>
                      <li>
                        <a className="active" href="dashboard.html">
                          <i className="lni-files" /> Dashboard
                        </a>
                      </li>
                      <li>
                        <a href="user-profile.html">
                          <i className="lni-user" />Profile
                        </a>
                      </li>
                      <li>
                        <a href="my-properties.html">
                          <i className="lni-home" />My Properties
                        </a>
                      </li>
                      <li>
                        <a href="favorited-properties.html">
                          <i className="lni-heart" />Favorited Properties
                        </a>
                      </li>
                      <li>
                        <a href="submit-property.html">
                          <i className="lni-plus" />Submit New Property
                        </a>
                      </li>
                      <li>
                        <a href="change-password.html">
                          <i className="lni-lock" />Change Password
                        </a>
                      </li>
                      <li>
                        <a href="index.html">
                          <i className="lni-logout" />Log Out
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
                      <div className="item-body">
                        <h3 className="property-title">
                          <a href="#">Lapin Satu Ky</a>
                        </h3>
                        <div className="row">
                          <div className="col-md-4 col-sm-12">
                            <ul className="additional-details">
                              <li>
                                <div
                                  className="adderess"
                                  style={{ lineHeight: 25 }}
                                >
                                  <i className="lni-apartment" /> Hotelli ja
                                  ravintola
                                </div>
                              </li>
                              <li>
                                <div
                                  className="adderess"
                                  style={{ lineHeight: 25 }}
                                >
                                  <i className="lni-map-marker" />{' '}
                                  Kattavaniementie 1, Posio
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-5 col-sm-12">
                            <ul className="additional-details">
                              <li>
                                <strong>Puh.:</strong>
                                <span>045 886 4588</span>
                              </li>
                              <li>
                                <strong>E-mail:</strong>
                                <span>info@lapinsatu.com</span>
                              </li>
                              <li>
                                <strong>www:</strong>
                                <span>
                                  <a href="https://lapinsatu.com">
                                    lapinsatu.com
                                  </a>
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-3 col-sm-12">
                            <div className="text-center">
                              <a href="#" className="btn btn-common mt-2">
                                Edit
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <a href="#" className="btn btn-common mt-2">
                      Add new company
                    </a>
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

export default Dashboard;
