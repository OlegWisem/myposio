import React, { Component } from 'react';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

class Home extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div id="main-slide" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src="img/slide1.jpg"
                alt="First slide"
              />
              <div className="carousel-caption d-md-block">
                <h1 className="wow fadeInDown heading" data-wow-delay=".4s">
                  <FormattedMessage id="home.firstline" />
                </h1>
                <p className="fadeInUp wow" data-wow-delay=".6s">
                  <FormattedMessage id="home.secondline" />
                </p>
                <Link
                  to="/catalog"
                  className="fadeInUp wow btn btn-common"
                  data-wow-delay=".6s"
                >
                  <FormattedMessage id="home.button" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
