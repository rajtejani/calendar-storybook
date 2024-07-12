export const getDaysInMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

export const getMonthData = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = getDaysInMonth(date);
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const monthData = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    monthData.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    monthData.push(new Date(year, month, i));
  }

  return monthData;
};

