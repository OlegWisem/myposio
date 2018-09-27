import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCompanyByID } from '../../actions/companyActions';
import Spinner from '../common/Spinner';
import Navbar from '../layout/Navbar';
import isEmpty from '../../validation/is-empty';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import Geocode from 'react-geocode';
import style from './CompanyMapStyles';
import { FormattedMessage } from 'react-intl';
import options from '../common/Options';
import Banner from '../common/Banner';
import { withRouter } from 'react-router-dom';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      user: {},
      field: '',
      avatar: '',
      companyid: '',
      address: '',
      description: '',
      category: '',
      secondaryCategory: '',
      phone: '',
      email: '',
      website: '',
      social: {},
      errors: {},
      center: {
        lat: 66.1106316,
        lng: 28.1586498
      },
      zoom: 12
    };
  }

  renderMarkers(map, maps, address) {
    Geocode.setApiKey('AIzaSyCVZj6nRwT8LCAfOQK3Z6U9H3CoTs78QQE');
    Geocode.enableDebug();
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({ center: { lat, lng } });
        let marker = new maps.Marker({
          position: {
            lat,
            lng
          },
          map,
          icon: 'img/location.png'
        });
        console.log(marker);
      },
      error => {
        console.error(error);
      }
    );
  }

  componentDidMount() {
    document.title = `MyPosio - loading...`;
    this.props.getCompanyByID(this.props.match.params.id);
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.company !== prevProps.company) {
      const { ...company } = this.props.company.company_item;
      this.setState(prevState => ({
        ...prevState,
        ...company
      }));
    }
    if (this.state.name !== '') {
      document.title = `MyPosio - ${this.state.name}`;
    }
  }

  render() {
    const { company_item, loading } = this.props.company;
    const { user, social } = this.state;
    const admin = this.props.auth.user;

    const mapOptions = {
      styles: style
    };

    let companyContent;

    if (company_item === null || loading) {
      companyContent = (
        <div style={{ marginTop: '20vh', marginBottom: '20vh' }}>
          <Spinner />
        </div>
      );
    } else {
      companyContent = (
        <div>
          {isEmpty(this.state.photo) ? (
            <Banner pageName={this.state.name} />
          ) : (
            <div
              id="page-banner-area-company"
              className="page-banner"
              style={{
                background: `url(${this.state.photo}) no-repeat center`,
                minHeight: '10vh'
              }}
            >
              <div
                className="page-banner-overlay"
                style={{ minHeight: '60vh' }}
              >
                <div
                  className="page-banner-title"
                  style={{ paddingTop: '25vh', paddingBottom: '25vh' }}
                >
                  <div className="text-center">
                    <h2 style={{ fontSize: '42px' }}>{this.state.name}</h2>
                    <Link to="/catalog" style={{ fontSize: '20px' }}>
                      <i className="lni-home" />{' '}
                      <FormattedMessage id="catalog.catalog" />
                    </Link>
                    <span
                      className="crumbs-spacer"
                      style={{ fontSize: '20px' }}
                    >
                      <i className="lni-chevron-right" />
                    </span>
                    <span className="current" style={{ fontSize: '20px' }}>
                      {this.state.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div id="content" className="section-padding">
            <div className="container">
              <div className="row">
                {/* Product Info Start */}
                <div className="col-lg-8 col-md-12 col-xs-12">
                  <div className="inner-box property-dsc">
                    <h1 className="company-title">{this.state.name}</h1>
                    <p className="company-subtitle">{this.state.field}</p>
                    <p className="address">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          this.state.address
                        )}`}
                        target="_blank"
                      >
                        {this.state.address}
                      </a>{' '}
                      <i className="lni-map-marker" />
                    </p>
                  </div>
                  <div className="inner-box short-info">
                    <h2 className="desc-title">
                      <FormattedMessage id="company.Summary" />
                    </h2>
                    <ul className="additional-details">
                      {isEmpty(this.state.category) ? null : (
                        <li>
                          <strong>
                            <FormattedMessage id="company.Category" />
                          </strong>
                          <span>
                            {
                              options.find(
                                element => element.value === this.state.category
                              ).label
                            }
                          </span>
                        </li>
                      )}
                      {isEmpty(this.state.secondaryCategory) ? null : (
                        <li>
                          <strong>
                            <FormattedMessage id="company.secondaryCategory" />
                          </strong>
                          <span>
                            {
                              options.find(
                                element =>
                                  element.value === this.state.secondaryCategory
                              ).label
                            }
                          </span>
                        </li>
                      )}
                      {isEmpty(this.state.phone) ? null : (
                        <li>
                          <strong>
                            <FormattedMessage id="company.Phone" />
                          </strong>
                          <span>{this.state.phone}</span>
                        </li>
                      )}
                      {isEmpty(this.state.email) ? null : (
                        <li>
                          <strong>
                            <FormattedMessage id="company.Email" />
                          </strong>
                          <span>
                            <a href={`mailto:${this.state.email}`}>
                              {this.state.email}
                            </a>
                          </span>
                        </li>
                      )}
                      {isEmpty(this.state.website) ? null : (
                        <li>
                          <strong>
                            <FormattedMessage id="company.www" />
                          </strong>
                          <span>
                            <a href={this.state.website}>
                              {this.state.website.replace(/(^\w+:|^)\/\//, '')}
                            </a>
                          </span>
                        </li>
                      )}
                      {isEmpty(this.state.companyid) ? null : (
                        <li>
                          <strong>
                            <FormattedMessage id="company.BusinessID" />
                          </strong>
                          <span>{this.state.companyid}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="inner-box property-dsc">
                    <h2 className="desc-title">
                      <FormattedMessage id="company.CompanyDescription" />
                    </h2>
                    <p>{this.state.description}</p>
                  </div>

                  <div className="inner-box location-map">
                    <h2 className="desc-title">
                      <FormattedMessage id="company.LocationOnMap" />
                    </h2>
                    <div style={{ height: '50vh', width: '100%' }}>
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: 'AIzaSyCVZj6nRwT8LCAfOQK3Z6U9H3CoTs78QQE'
                        }}
                        center={this.state.center}
                        zoom={this.state.zoom}
                        options={mapOptions}
                        onGoogleApiLoaded={({ map, maps }) => {
                          this.renderMarkers(map, maps, this.state.address);
                        }}
                      />
                    </div>
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
                        {isEmpty(user.avatar) ? null : (
                          <div className="wrapper">
                            <img
                              src={user.avatar}
                              alt=""
                              className="agent-photo img-fluid"
                            />
                          </div>
                        )}
                        <div
                          className="agent-details mt-2"
                          style={user.avatar ? null : { marginLeft: 20 }}
                        >
                          <h3>{user.name}</h3>
                          {isEmpty(user.phone) ? null : (
                            <span>
                              <i className="lni-phone-handset" />
                              {user.phone}
                            </span>
                          )}
                        </div>
                      </div>
                      <FormattedMessage id="company.YourEmail">
                        {YourEmail => (
                          <input
                            type="text"
                            className="form-control"
                            placeholder={YourEmail}
                          />
                        )}
                      </FormattedMessage>
                      <FormattedMessage id="company.YourPhone">
                        {YourPhone => (
                          <input
                            type="text"
                            className="form-control"
                            placeholder={YourPhone}
                          />
                        )}
                      </FormattedMessage>
                      <FormattedMessage id="company.YourMessage">
                        {YourMessage => (
                          <textarea
                            className="form-control"
                            placeholder={YourMessage}
                            defaultValue={''}
                          />
                        )}
                      </FormattedMessage>
                      <button className="btn btn-common fullwidth mt-4">
                        <FormattedMessage id="company.SendMessage" />
                      </button>
                    </div>
                  </div>
                  {/* Social Media */}
                  <div className="widget widget-social">
                    <h3 className="sidebar-title">
                      <FormattedMessage id="company.SocialMedia" />
                    </h3>
                    <ul className="social-icons">
                      {isEmpty(social.twitter) ? null : (
                        <li>
                          <a className="twitter" href={social.twitter}>
                            <i className="lni-twitter-filled" />
                          </a>
                        </li>
                      )}
                      {isEmpty(social.facebook) ? null : (
                        <li>
                          <a className="facebook" href={social.facebook}>
                            <i className="lni-facebook-filled" />
                          </a>
                        </li>
                      )}
                      {isEmpty(social.instagram) ? null : (
                        <li>
                          <a className="instagram" href={social.instagram}>
                            <i className="lni-instagram-filled" />
                          </a>
                        </li>
                      )}
                    </ul>
                    {!admin.isAdmin ? null : (
                      <div>
                        <div className="text-center">
                          <Link
                            to={`/edit-company/${this.props.match.params.id}`}
                            className="btn btn-common mt-2"
                          >
                            <FormattedMessage id="company.EditThisCompany" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </aside>
                {/*End sidebar*/}
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
  auth: PropTypes.object.isRequired,
  getCompanyByID: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  company: state.company
});

export default withRouter(
  connect(
    mapStateToProps,
    { getCompanyByID }
  )(Company)
);
