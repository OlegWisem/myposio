import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextField = ({
  name,
  placeholder,
  value,
  label,
  error,
  type,
  onChange,
  disabled,
  icon
}) => {
  return (
    <div className="form-group">
      <div className={classnames({ 'input-icon': icon })}>
        {icon && <i className={icon} />}
        {label && <label>{label}</label>}
        <input
          type={type}
          className={classnames('form-control', {
            'is-invalid': error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextField.defaultProps = {
  type: 'text'
};

export default TextField;
