import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const Banner = ({ pageName }) => {
  return (
    <div>
      <div id="page-banner-area" className="page-banner">
        <div className="page-banner-title">
          <div className="text-center">
            <h2>{pageName}</h2>
            <Link to="/">
              <i className="lni-home" /> <FormattedMessage id="banner.home" />
            </Link>
            <span className="crumbs-spacer">
              <i className="lni-chevron-right" />
            </span>
            <span className="current">{pageName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

Banner.propTypes = {
  pageName: PropTypes.string.isRequired
};

export default Banner;
