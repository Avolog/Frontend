import { useCalendarContext } from '../../../contexts/CalendarContext';
import { MONTH_NAMES, DAY_NAMES } from '../../../utils/calendar';
import './Calendar.css';

function Calendar() {
  const {
    year,
    month,
    selectedDate,
    calendarDays,
    handleDateClick,
    goToPrevMonth,
    goToNextMonth,
  } = useCalendarContext();

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="month-btn" onClick={goToPrevMonth}>
          &lt;&lt;
        </button>

        <h2 className="calendar-month">
          {MONTH_NAMES[month]} {year}
        </h2>

        <button className="month-btn" onClick={goToNextMonth}>
          &gt;&gt;
        </button>
      </div>

      <div className="calendar-grid">
        {DAY_NAMES.map((day) => (
          <div
            key={day}
            className={`calendar-day-name
              ${day === 'Sa' ? 'saturday' : ''}
              ${day === 'Su' ? 'sunday' : ''}
            `}
          >
            {day}
          </div>
        ))}

        {calendarDays.map((item, index) => (
          <div
            key={index}
            className={`calendar-day
              ${!item.isCurrentMonth ? 'other-month' : ''}
              ${selectedDate === item.day && item.isCurrentMonth ? 'selected' : ''}
              ${index % 7 === 0 ? 'sunday' : ''}
              ${index % 7 === 6 ? 'saturday' : ''}
            `}
            onClick={() => handleDateClick(item.day, item.isCurrentMonth)}
          >
            {item.day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
