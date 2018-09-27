import React from 'react';
import PropTypes from 'prop-types';

const FilterList = ({ onChange, option }) => {
  option = option.filter(item => {
    return item.value !== 0;
  });
  const selectOptions = option.map(option => (
    <div key={option.value}>
      <input onChange={onChange} id={option.value} type="checkbox" />
      <label htmlFor={option.value}>{option.label}</label>
    </div>
  ));
  return <div>{selectOptions}</div>;
};

FilterList.propTypes = {
  onChange: PropTypes.func.isRequired,
  option: PropTypes.array.isRequired
};

export default FilterList;
