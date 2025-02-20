import React from 'react';
import PropTypes from 'prop-types';
import './Alert.css'; // Ensure this path is correct

const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'info', 'warning']).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Alert; // Ensure you have 'export default Alert;' at the end
