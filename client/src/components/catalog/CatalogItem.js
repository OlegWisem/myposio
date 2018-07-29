import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class CatalogItem extends Component {
  render() {
    const { company } = this.props;
    return (
      <div className="property-main">
        <div className="property-wrap">
          <div className="property-item">
            <div className="item-body">
              <h3 className="property-title">{company.name}</h3>
              <div className="row">
                <div className="col-md-4 col-sm-12">
                  <ul className="additional-details">
                    <li>
                      <div className="adderess">
                        <i className="lni-apartment" /> {company.field}
                      </div>
                    </li>
                    <li>
                      <div className="adderess">
                        <i className="lni-map-marker" /> {company.address}
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
                <div className="col-md-5 col-sm-12">
                  <ul className="additional-details">
                    {isEmpty(company.phone) ? null : (
                      <li>
                        <strong>Tel.:</strong>
                        <span>{company.phone}</span>
                      </li>
                    )}
                    {isEmpty(company.email) ? null : (
                      <li>
                        <strong>E-mail:</strong>
                        <span>{company.email}</span>
                      </li>
                    )}
                    {isEmpty(company.website) ? null : (
                      <li>
                        <strong>www:</strong>
                        <span>
                          <a href={company.website}>{company.website}</a>
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="col-md-3 col-sm-12">
                  <div className="text-center">
                    <Link
                      to={`/company/${company._id}`}
                      className="btn btn-common mt-2"
                    >
                      Learn more
                    </Link>
                  </div>
                </div>
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
