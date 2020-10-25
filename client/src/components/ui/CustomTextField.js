import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

function CustomTextField({ className, name, label, onChange, type }) {
  return (
    <Fragment>
      <TextField
        className={className}
        inputProps={{ style: { fontSize: '1.6rem' } }}
        InputLabelProps={{
          style: {
            fontSize: '1.45rem',
            background: 'white',
            paddingRight: '5px',
          },
        }}
        type={type}
        name={name}
        variant='outlined'
        label={label}
        autoComplete='off'
        onChange={onChange}
      />
    </Fragment>
  );
}

CustomTextField.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

export default CustomTextField;
