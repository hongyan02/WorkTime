import React, { useState, useEffect } from "react";
import "../css/Calendar.css";
import TimePickerModal from "./TimePickerModal";

const Calendar = ({ workRecords = {}, onDateSelect, onMonthChange, onSaveHours }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    // 获取当月天数
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    // 获取当月第一天是星期几
    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    // 格式化日期为 YYYY-MM-DD
    const formatDate = (date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
            date.getDate()
        ).padStart(2, "0")}`;
    };

    // 切换月份
    const changeMonth = (offset) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
        setCurrentDate(newDate);
        onMonthChange?.(newDate.getFullYear(), newDate.getMonth() + 1);
    };

    // 获取月份标题
    const getMonthTitle = () => {
        return `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月`;
    };

    // 修改日期单元格的渲染和点击处理
    const renderDay = (day, isCurrentMonth) => {
        const dateStr = formatDate(day);
        const workRecord = workRecords[dateStr];

        return (
            <div
                key={dateStr}
                className={`calendar-day ${!isCurrentMonth ? "other-month" : ""}`}
                onClick={() => {
                    setSelectedDate(dateStr);
                    setIsModalOpen(true);
                }}
            >
                <div className="day-content">
                    <span className="day-number">{day.getDate()}</span>
                    {workRecord && workRecord.hours > 0 && (
                        <div className="day-hours">{workRecord.hours.toFixed(1)}h</div>
                    )}
                </div>
            </div>
        );
    };

    // 渲染日历格子
    const renderCalendarDays = () => {
        const days = [];
        const firstDay = getFirstDayOfMonth(currentDate);
        const daysInMonth = getDaysInMonth(currentDate);

        // 添加空白格子
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="day empty"></div>);
        }

        // 添加日期格子
        for (let i = 1; i <= daysInMonth; i++) {
            const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
            days.push(renderDay(day, true));
        }

        return days;
    };

    // 在组件顶部添加 effect 来监控状态变化
    useEffect(() => {
        console.log("Modal state:", isModalOpen);
    }, [isModalOpen]);

    // 处理时间选择确认
    const handleTimeConfirm = (hours) => {
        console.log("Confirming hours:", { selectedDate, hours }); // 调试日志
        if (selectedDate && onSaveHours) {
            onSaveHours(selectedDate, hours);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="calendar-container">
            <div className="calendar">
                <div className="calendar-header">
                    <button onClick={() => changeMonth(-1)}>&lt;</button>
                    <span className="month-title">{getMonthTitle()}</span>
                    <button onClick={() => changeMonth(1)}>&gt;</button>
                </div>
                <div className="weekdays">
                    <span>日</span>
                    <span>一</span>
                    <span>二</span>
                    <span>三</span>
                    <span>四</span>
                    <span>五</span>
                    <span>六</span>
                </div>
                <div className="days">{renderCalendarDays()}</div>
            </div>

            <TimePickerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleTimeConfirm}
                initialHours={(selectedDate && workRecords[selectedDate]?.hours) || 0}
            />
        </div>
    );
};

export default Calendar;
