const STORAGE_KEY = 'workRecords';

export const storageService = {
  // 获取所有工时记录
  getWorkRecords() {
    try {
      const records = localStorage.getItem(STORAGE_KEY);
      return records ? JSON.parse(records) : {};
    } catch (error) {
      console.error('Error loading work records:', error);
      return {};
    }
  },

  // 保存工时记录
  saveWorkRecords(records) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    } catch (error) {
      console.error('Error saving work records:', error);
    }
  },

  // 更新单个日期的工时
  updateWorkRecord(date, hours) {
    try {
      const records = this.getWorkRecords();
      if (hours === 0) {
        delete records[date];
      } else {
        records[date] = { hours };
      }
      this.saveWorkRecords(records);
      return records;
    } catch (error) {
      console.error('Error updating work record:', error);
      return null;
    }
  },

  // 清除所有工时记录
  clearWorkRecords() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing work records:', error);
    }
  }
}; 