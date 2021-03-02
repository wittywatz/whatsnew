import React from 'react';
import classnames from 'classnames';

const FormInput = ({
  type,
  error,
  placeholder,
  name,
  value,
  onChange,
  info,
  disabled,
}) => {
  return (
    <div className="form-group mb-4">
      <input
        type={type}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && (
        <small style={{ color: '#42f55d' }} className="form-text">
          {info}
        </small>
      )}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

FormInput.defaultProps = {
  type: 'text',
};
export default FormInput;
