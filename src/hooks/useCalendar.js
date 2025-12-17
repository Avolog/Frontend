import { useState, useMemo } from 'react';
import { generateCalendarDays, getMonthInfo } from '../utils/calendar';

export const useCalendar = () => {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today.getDate());

  const { year, month } = getMonthInfo(currentDate);

  const calendarDays = useMemo(
    () => generateCalendarDays(year, month),
    [year, month]
  );

  const getFullSelectedDate = () => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
  };

  const handleDateClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return;
    setSelectedDate(day);
  };

  /** ◀ 이전 달 */
  const goToPrevMonth = () => {
    const prevDate = new Date(year, month - 1, 1);
    setCurrentDate(prevDate);
    setSelectedDate(1);
  };

  /** ▶ 다음 달 */
  const goToNextMonth = () => {
    const nextDate = new Date(year, month + 1, 1);
    setCurrentDate(nextDate);
    setSelectedDate(1);
  };

  /** 오늘 */
  const goToToday = () => {
    setCurrentDate(today);
    setSelectedDate(today.getDate());
  };

  return {
    year,
    month,
    selectedDate,
    fullSelectedDate: getFullSelectedDate(),
    calendarDays,
    handleDateClick,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
  };
};
