import React from 'react';
import PropTypes from 'prop-types';

const TextInputField = ({
  type, label, name, value, onChange, errors, icon
}) => (
  <div>
    <div className="input-field">
      <input
        type={type}
        id={name}
        className="form-control"
        value={value}
        name={name}
        onChange={onChange}
      />
      {label && (
      <label htmlFor={name}>
        {icon && <i className="material-icons">{icon}</i>}
        {label}
      </label>
      )}
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
