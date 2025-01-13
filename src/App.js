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

  // 添加当前选中月份的状态
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

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

  // 获取指定月份的工时记录
  const getMonthlyRecords = (yearMonth) => {
    return Object.entries(workRecords).reduce((acc, [date, record]) => {
      if (date.startsWith(yearMonth)) {
        acc[date] = record;
      }
      return acc;
    }, {});
  };

  // 计算指定月份的总工时
  const calculateMonthlyHours = (yearMonth) => {
    const monthlyRecords = getMonthlyRecords(yearMonth);
    return Object.values(monthlyRecords).reduce((total, record) => {
      return total + (record.hours || 0);
    }, 0).toFixed(2);
  };

  // 计算指定月份的总收入
  const calculateMonthlyIncome = (yearMonth) => {
    const monthlyRecords = getMonthlyRecords(yearMonth);
    const isAdjusted = calculateYearsOfService() >= 1;
    return salaryCalculator.calculateTotalSalary(monthlyRecords, isAdjusted);
  };

  // 处理月份变化
  const handleMonthChange = (year, month) => {
    const monthStr = `${year}-${String(month).padStart(2, '0')}`;
    setCurrentMonth(monthStr);
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
          <div className="label">当月工时(h)</div>
          <div className="value">{calculateMonthlyHours(currentMonth)}</div>
        </div>
        <div className="summary-item">
          <div className="label">当月收入(¥)</div>
          <div className="value">{calculateMonthlyIncome(currentMonth)}</div>
        </div>
      </div>

      <Calendar 
        workRecords={workRecords}
        onSaveHours={handleSaveHours}
        onMonthChange={handleMonthChange}
      />
    </div>
  );
}

export default App;