import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';
import { FormattedMessage } from 'react-intl';

class CatalogItem extends Component {
  render() {
    const { company } = this.props;
    return (
      <div className="property-main">
        <div className="property-wrap">
          <div className="property-item">
            <div className="row">
              <div className="col-lg-11 col-md-11 col-sm-12">
                <div className="item-body">
                  <h3 className="property-title">{company.name}</h3>
                  <div className="row">
                    <div className="col-md-5 col-sm-12">
                      <ul className="additional-details">
                        <li>
                          <div className="adderess">
                            <i className="lni-apartment" /> {company.field}
                          </div>
                        </li>
                        <li>
                          <div className="adderess">
                            <i className="lni-map-marker" />
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                company.address
                              )}`}
                              target="_blank"
                            >
                              {company.address}
                            </a>
                          </div>
                        </li>
                        {isEmpty(company.companyid) ? null : (
                          <li>
                            <div className="adderess">
                              <i className="lni-world" /> {company.companyid}
                            </div>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="col-md-7 col-sm-12">
                      <ul className="additional-details">
                        {isEmpty(company.phone) ? null : (
                          <div className="adderess">
                            <li>
                              <strong>
                                <FormattedMessage id="catalog.phone" />
                              </strong>
                              {company.phone}
                            </li>
                          </div>
                        )}
                        {isEmpty(company.email) ? null : (
                          <li>
                            <strong>
                              <FormattedMessage id="catalog.email" />
                            </strong>
                            <span>
                              <a href={`mailto:${company.email}`}>
                                {company.email}
                              </a>
                            </span>
                          </li>
                        )}
                        {isEmpty(company.website) ? null : (
                          <li>
                            <strong>
                              <FormattedMessage id="catalog.www" />
                            </strong>
                            <span>
                              <a href={company.website}>
                                {company.website.replace(/(^\w+:|^)\/\//, '')}
                              </a>
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="col-md-3 col-sm-12" />
                  </div>
                </div>
              </div>
              <div className="col-lg-1 col-md-1 col-sm-12 learn-more">
                <Link
                  to={`/company/${company._id}`}
                  className="btn btn-catalog mt-2"
                >
                  <FormattedMessage id="catalog.learnmore" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CatalogItem.propTypes = {
  company: PropTypes.object.isRequired
};

export default CatalogItem;
