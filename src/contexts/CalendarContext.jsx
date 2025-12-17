import { createContext, useContext } from 'react';
import { useCalendar } from '../hooks';

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const calendarState = useCalendar();

  return (
    <CalendarContext.Provider value={calendarState}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendarContext must be used within CalendarProvider');
  }
  return context;
}
