import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaField = ({
  name,
  placeholder,
  value,
  error,
  label,
  onChange
}) => {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <textarea
        className={classnames('form-control', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaField;
