import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectList = ({ name, value, label, error, onChange, option }) => {
  const selectOptions = option.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <select
        className={classnames('form-control', {
          'is-invalid': error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectList.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  option: PropTypes.array.isRequired
};

export default SelectList;
