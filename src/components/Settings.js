import React from 'react';
import '../css/Settings.css';

const Settings = ({ hireDate, onHireDateChange }) => {
  return (
    <div className="settings">
      <label className="hire-date-input">
        入职日期：
        <input 
          type="date"
          value={hireDate}
          onChange={(e) => onHireDateChange(e.target.value)}
        />
      </label>
    </div>
  );
};

export default Settings; 