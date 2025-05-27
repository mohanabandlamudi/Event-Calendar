import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { useState, useEffect } from 'react';
import { useEvents } from '../../context/EventContext';
import CalendarDay from './CalendarDay';
import CalendarHeader from './CalendarHeader';
import CalendarControls from './CalendarControls';
import EventModal from '../Event/EventModal';

const Calendar = () => {
  const { state, dispatch } = useEvents();
  const { selectedDate } = state;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };

    window.addEventListener('openEventModal', handleOpenModal);
    return () => {
      window.removeEventListener('openEventModal', handleOpenModal);
    };
  }, []);

  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Pad the calendar with days from previous and next months
  const startDay = monthStart.getDay();
  const endDay = monthEnd.getDay();
  const prevMonthDays = startDay > 0 ? Array(startDay).fill(null) : [];
  const nextMonthDays = endDay < 6 ? Array(6 - endDay).fill(null) : [];

  const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays];

  const handleDateClick = (date) => {
    dispatch({ type: 'SET_SELECTED_DATE', payload: date });
    dispatch({ type: 'SET_SELECTED_EVENT', payload: null }); // Clear any selected event
    setIsModalOpen(true);
  };

  return (
    <div className="calendar">
      <CalendarControls />
      <CalendarHeader />
      <div className="calendar-grid">
        {allDays.map((day, index) => (
          <CalendarDay 
            key={index} 
            day={day} 
            isCurrentMonth={day && isSameMonth(day, selectedDate)}
            isToday={day && isSameDay(day, new Date())}
            onDateClick={handleDateClick}
          />
        ))}
      </div>
      <EventModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Calendar;