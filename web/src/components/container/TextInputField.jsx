import React from 'react';
import PropTypes from 'prop-types';

const TextInputField = ({
  type, label, placeholder, name, value, onChange, errors, size
}) => (
  <div>
    <div className={`form-group col-md-${size}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        className="form-control"
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
      <div className="error">
        {errors.map((error, index) => (
          <span key={index}>{error}</span>
        ))}
      </div>
    </div>
  </div>
);

TextInputField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string.isRequired)
};

TextInputField.defaultProps = {
  errors: [],
  label: null
};
export default TextInputField;
