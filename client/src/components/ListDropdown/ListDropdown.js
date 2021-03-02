import React from 'react';
import classnames from 'classnames';

const ListDropdown = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames('form-control form-control-lg', {
          'is-invalid': error,
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && (
        <small style={{ color: '#42f55d' }} className="form-text">
          {info}
        </small>
      )}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default ListDropdown;
