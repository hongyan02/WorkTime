import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import Settings from './components/Settings';
import { storageService } from './services/storage';
import { salaryCalculator } from './services/salaryCalculator';
import './App.css';

function App() {
  const [workRecords, setWorkRecords] = useState(() => 
    storageService.getWorkRecords()
  );
  const [hireDate, setHireDate] = useState(() => 
    localStorage.getItem('hireDate') || ''
  );

  // 保存入职日期
  useEffect(() => {
    localStorage.setItem('hireDate', hireDate);
  }, [hireDate]);

  // 计算工龄（年）
  const calculateYearsOfService = () => {
    if (!hireDate) return 0;
    const hire = new Date(hireDate);
    const now = new Date();
    return (now - hire) / (1000 * 60 * 60 * 24 * 365);
  };

  // 计算总工时
  const calculateTotalHours = () => {
    return Object.values(workRecords).reduce((total, record) => {
      return total + (record.hours || 0);
    }, 0).toFixed(2);
  };

  // 计算总收入
  const calculateTotalIncome = () => {
    const isAdjusted = calculateYearsOfService() >= 1;
    return salaryCalculator.calculateTotalSalary(workRecords, isAdjusted);
  };

  const handleSaveHours = (date, hours) => {
    const updatedRecords = storageService.updateWorkRecord(date, hours);
    if (updatedRecords) {
      setWorkRecords(updatedRecords);
    }
  };

  return (
    <div className="App">
      <Settings 
        hireDate={hireDate}
        onHireDateChange={setHireDate}
      />
      
      <div className="summary">
        <div className="summary-item">
          <div className="label">工时(h)</div>
          <div className="value">{calculateTotalHours()}</div>
        </div>
        <div className="summary-item">
          <div className="label">总收入(¥)</div>
          <div className="value">{calculateTotalIncome()}</div>
        </div>
      </div>

      <Calendar 
        workRecords={workRecords}
        onSaveHours={handleSaveHours}
      />
    </div>
  );
}

export default App;