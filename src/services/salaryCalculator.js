// 工资等级标准表
const SALARY_LEVELS = [
  { min: 0, max: 20, base: 0, adjusted: 0 },
  { min: 20, max: 30, base: 100, adjusted: 200 },
  { min: 30, max: 36, base: 150, adjusted: 300 },
  { min: 36, max: 40, base: 200, adjusted: 400 },
  { min: 40, max: 45, base: 250, adjusted: 500 },
  { min: 45, max: 50, base: 300, adjusted: 600 },
  { min: 50, max: 55, base: 350, adjusted: 700 },
  { min: 55, max: 60, base: 400, adjusted: 800 },
  { min: 60, max: 65, base: 450, adjusted: 900 },
  { min: 65, max: 70, base: 500, adjusted: 1000 },
  { min: 70, max: 75, base: 550, adjusted: 1100 },
  { min: 75, max: 80, base: 650, adjusted: 1200 },
  { min: 80, max: 85, base: 750, adjusted: 1300 },
  { min: 85, max: 90, base: 850, adjusted: 1400 },
  { min: 90, max: Infinity, base: 950, adjusted: 1500 },
];

export const salaryCalculator = {
  // 计算单月加班费
  calculateMonthlySalary(hours, isAdjusted = true) {
    if (hours <= 0) return 0;
    
    const level = SALARY_LEVELS.find(
      level => hours > level.min && hours <= level.max
    );

    if (!level) return 0;
    return isAdjusted ? level.adjusted : level.base;
  },

  // 计算总加班费
  calculateTotalSalary(workRecords, isAdjusted = true) {
    const monthlyHours = {};

    // 按月份分组工时
    Object.entries(workRecords).forEach(([date, record]) => {
      const month = date.substring(0, 7); // 获取年月 (YYYY-MM)
      monthlyHours[month] = (monthlyHours[month] || 0) + record.hours;
    });

    // 计算每月加班费并求和
    return Object.values(monthlyHours).reduce((total, hours) => {
      return total + this.calculateMonthlySalary(hours, isAdjusted);
    }, 0);
  }
}; 