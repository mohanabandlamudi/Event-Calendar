import { format } from 'date-fns';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarHeader = () => {
  return (
    <div className="calendar-header">
      {weekdays.map(day => (
        <div key={day} className="calendar-header-day">
          {day}
        </div>
      ))}
    </div>
  );
};

export default CalendarHeader;