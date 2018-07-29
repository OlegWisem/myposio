import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCompanyByID } from '../../actions/companyActions';
import Spinner from '../common/Spinner';
import Banner from '../common/Banner';
import Navbar from '../layout/Navbar';
import isEmpty from '../../validation/is-empty';
import GoogleMapReact from 'google-map-react';
import { Link } from 'react-router-dom';
import Geocode from 'react-geocode';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      user: {},
      field: '',
      companyid: '',
      address: '',
      description: '',
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
      },
      error => {
        console.error(error);
      }
    );
  }

  componentDidMount() {
    this.props.getCompanyByID(this.props.match.params.id);
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
    const { user, social } = this.state;

    var $main_color = '#2d313f',
      $saturation = -20,
      $brightness = 5;

    var style = [
      {
        //set saturation for the labels on the map
        elementType: 'labels',
        stylers: [{ saturation: $saturation }]
      },
      {
        //poi stands for point of interest - don't show these lables on the map
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      },
      {
        //don't show highways lables on the map
        featureType: 'road.highway',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      },
      {
        //don't show local road lables on the map
        featureType: 'road.local',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
      },
      {
        //don't show arterial road lables on the map
        featureType: 'road.arterial',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
      },
      {
        //don't show road lables on the map
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ visibility: 'off' }]
      },
      //style different elements on the map
      {
        featureType: 'transit',
        elementType: 'geometry.fill',
        stylers: [
          { hue: $main_color },
          { visibility: 'on' },
          { lightness: $brightness },
          { saturation: $saturation }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'geometry.fill',
        stylers: [
          { hue: $main_color },
          { visibility: 'on' },
          { lightness: $brightness },
          { saturation: $saturation }
        ]
      },
      {
        featureType: 'poi.government',
        elementType: 'geometry.fill',
        stylers: [
          { hue: $main_color },
          { visibility: 'on' },
          { lightness: $brightness },
          { saturation: $saturation }
        ]
      },
      {
        featureType: 'poi.sport_complex',
        elementType: 'geometry.fill',
        stylers: [
          { hue: $main_color },
          { visibility: 'on' },
          { lightness: $brightness },
          { saturation: $saturation }
        ]
      },
      {
        featureType: 'poi.attraction',
        elementType: 'geometry.fill',
        stylers: [
          { hue: $main_color },
          { visibility: 'on' },
          { lightness: $brightness },
          { saturation: $saturation }
        ]
      },
      {
        featureType: 'poi.business',
        elementType: 'geometry.fill',
        stylers: [
          { hue: $main_color },
          { visibility: 'on' },
          { lightness: $brightness },
          { saturation: $saturation }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'geometry.fill',
        stylers: [
          { hue: $main_color },
          { visibility: 'on' },
          { lightness: $brightness },
          { saturation: $saturation }
        ]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry.fill',
        stylers: [
          { hue: $main_color },
          { visibility: 'on' },
          { lightness: $brightness },
          { saturation: $saturation }
        ]
      },
      {
        featureType: 'landscape',
        stylers: [
          { hue: $main_color },
          { visibility: 'on' },
          { lightness: $brightness },
          { saturation: $saturation }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [
          { hue: $main_color },
          { visibility: 'on' },
          { lightness: $brightness },
          { saturation: $saturation }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          { hue: $main_color },
          { visibility: 'on' },
          { lightness: $brightness },
          { saturation: $saturation }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          { hue: $main_color },
          { visibility: 'on' },
          { lightness: $brightness },
          { saturation: $saturation }
        ]
      }
    ];

    const mapOptions = {
      styles: style
    };

    let companyContent;

    if (company_item === null || loading) {
      companyContent = <Spinner />;
    } else {
      companyContent = (
        <div>
          <Banner pageName={this.state.name} />

          <div id="content" className="section-padding">
            <div className="container">
              <div className="property-details">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-xs-12">
                    <div className="info">
                      <h3>{this.state.name}</h3>
                      <p className="room-type">{this.state.field}</p>
                      <p className="address">
                        <i className="lni-map-marker" /> {this.state.address}
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
                    <p>{this.state.description}</p>
                  </div>
                  <div className="inner-box short-info">
                    <h2 className="desc-title">Summary</h2>
                    <ul className="additional-details">
                      {isEmpty(this.state.phone) ? null : (
                        <li>
                          <strong>Phone.:</strong>
                          <span>{this.state.phone}</span>
                        </li>
                      )}
                      {isEmpty(this.state.email) ? null : (
                        <li>
                          <strong>E-mail:</strong>
                          <span>{this.state.email}</span>
                        </li>
                      )}
                      {isEmpty(this.state.website) ? null : (
                        <li>
                          <strong>www:</strong>
                          <span>{this.state.website}</span>
                        </li>
                      )}
                      {isEmpty(this.state.companyid) ? null : (
                        <li>
                          <strong>Company ID:</strong>
                          <span>{this.state.companyid}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="inner-box location-map">
                    <h2 className="desc-title">Location On Map</h2>
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
                        <div
                          className="agent-details mt-2"
                          style={{ marginLeft: 20 }}
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
                    </ul>
                    <div className="text-center">
                      <Link
                        to={`/edit-company/${this.props.match.params.id}`}
                        className="btn btn-common mt-2"
                      >
                        Edit This Company
                      </Link>
                    </div>
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
