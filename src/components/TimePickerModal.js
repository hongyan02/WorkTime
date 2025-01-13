import React, { useState, useEffect } from 'react';
import '../css/TimePickerModal.css';

const TimePickerModal = ({ isOpen, onClose, onConfirm, initialHours = 0 }) => {
  const [hours, setHours] = useState(initialHours);

  useEffect(() => {
    if (isOpen) {
      setHours(initialHours);
    }
  }, [isOpen, initialHours]);

  if (!isOpen) return null;

  const generateNumbers = (start, end, step = 1) => {
    return Array.from({ length: (end - start) / step + 1 }, (_, i) => start + i * step);
  };

  return (
    <div className="time-picker-modal">
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <div className="time-picker-header">
          <div className="time-picker-select">
            <span>{hours}</span>
            <span>小时</span>
          </div>
        </div>
        
        <div className="time-sections">
          {/* 整数小时 */}
          <div className="time-section">
            <div className="time-options">
              {generateNumbers(0, 12).map(num => (
                <div
                  key={num}
                  className={`time-option ${hours === num ? 'selected' : ''}`}
                  onClick={() => setHours(num)}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          {/* 半小时 */}
          <div className="time-section">
            <div className="time-options">
              {generateNumbers(0.5, 12.5, 1).map(num => (
                <div
                  key={num}
                  className={`time-option ${hours === num ? 'selected' : ''}`}
                  onClick={() => setHours(num)}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="confirm-btn" onClick={() => onConfirm(hours)}>确定</button>
          <button className="cancel-btn" onClick={onClose}>取消</button>
        </div>
      </div>
    </div>
  );
};

export default TimePickerModal; 