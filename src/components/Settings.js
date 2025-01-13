import React from 'react';
import '../css/Settings.css';

const Settings = ({ hireDate, onHireDateChange }) => {
  // 计算工龄
  const calculateYearsOfService = () => {
    if (!hireDate) return 0;
    const hire = new Date(hireDate);
    const now = new Date();
    const years = (now - hire) / (1000 * 60 * 60 * 24 * 365);
    return years.toFixed(1); // 保留一位小数
  };

  return (
    <div className="settings">
      <label className="hire-date-input">
        入职日期：
        <input 
          type="date"
          value={hireDate}
          onChange={(e) => onHireDateChange(e.target.value)}
        />
        <span className="years-of-service">
          工龄：{calculateYearsOfService()}年
        </span>
      </label>
    </div>
  );
};

export default Settings; 