import React, { PropTypes } from 'react';

const PasswordInput = ({ inputType, inputID, labelText, initialValue, handleChangeFn }) => {
  return (
    <div>
      <label htmlFor={inputID}>{labelText}</label>
      <div className='inputArea'>
        <input type={inputType} id={inputID} value={initialValue} onChange={handleChangeFn} />
      </div>
    </div>
  );
};

PasswordInput.propTypes = {
  inputType: PropTypes.string.isRequired,
  inputID: PropTypes.string.isRequired,
  handleChangeFn: PropTypes.func.isRequired,
  labelText: PropTypes.string,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

PasswordInput.defaultProps = {
  initialValue: '',
};

export default PasswordInput;
