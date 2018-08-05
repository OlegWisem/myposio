import React from 'react';
import { FormattedMessage } from 'react-intl';

const options = [
  { value: 0, label: <FormattedMessage id="category.SelectCategory" /> },
  {
    value: 'Car repair, service stations, vehicle inspection',
    label: <FormattedMessage id="category.Servicestations" />
  },
  {
    value: 'Excavation',
    label: <FormattedMessage id="category.Excavation" />
  },
  {
    value: 'Property maintenance, laundry, safety',
    label: <FormattedMessage id="category.Propertymaintenance" />
  },
  {
    value: 'Real estate, plots',
    label: <FormattedMessage id="category.Realestate" />
  },
  {
    value: 'Accountancy, advocacy, notary',
    label: <FormattedMessage id="category.Accountancy" />
  },
  {
    value: 'Flower shop, undertaker',
    label: <FormattedMessage id="category.Flowershop" />
  },
  {
    value: 'Transport and towing, taxi',
    label: <FormattedMessage id="category.Transportandtowing" />
  },
  {
    value: 'Sports and recreation, associations',
    label: <FormattedMessage id="category.Sportsandrecreation" />
  },
  {
    value: 'Plumber, construction, and electricity',
    label: <FormattedMessage id="category.Plumberconstruction" />
  },
  {
    value: 'Advertising, internet, and coding',
    label: <FormattedMessage id="category.Advertising" />
  },
  {
    value: 'Accommodation, travelling, and equipment rental',
    label: <FormattedMessage id="category.Accommodation" />
  },
  {
    value: 'Metalworks, industry maintenance',
    label: <FormattedMessage id="category.Metalworks" />
  },
  {
    value: 'Banks, insurances, real estate management',
    label: <FormattedMessage id="category.Banks" />
  },
  {
    value: 'Hairdresser, beauty treatment',
    label: <FormattedMessage id="category.Hairdresser" />
  },
  {
    value: 'Grocery, specialised shops',
    label: <FormattedMessage id="category.Grocery" />
  },
  {
    value: 'Restaurants, cafes, catering',
    label: <FormattedMessage id="category.Restaurants" />
  },
  {
    value: 'Health, wellness, massage',
    label: <FormattedMessage id="category.Health" />
  },
  {
    value: 'Roadworks, maintenance, forest services',
    label: <FormattedMessage id="category.Roadworks" />
  },
  {
    value: 'Other',
    label: <FormattedMessage id="category.Other" />
  }
];

export default options;
