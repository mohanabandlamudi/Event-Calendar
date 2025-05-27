import { format } from 'date-fns';
import { useDrop } from 'react-dnd';
import { useEvents } from '../../context/EventContext';
import { filterEventsByDay } from '../../utils/eventUtils';
import EventItem from '../Event/EventItem';

const CalendarDay = ({ day, isCurrentMonth, isToday, onDateClick }) => {
  const { state, dispatch } = useEvents();
  
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'event',
    drop: (item) => {
      if (!day) return;
      const { event } = item;
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      const duration = eventEnd - eventStart;
      
      const newStart = new Date(day);
      newStart.setHours(eventStart.getHours(), eventStart.getMinutes());
      
      const newEnd = new Date(newStart.getTime() + duration);
      
      dispatch({
        type: 'UPDATE_EVENT',
        payload: {
          ...event,
          start: newStart.toISOString(),
          end: newEnd.toISOString(),
        },
      });
    },
    canDrop: () => day !== null,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }), [day, dispatch]);
  
  const dayEvents = filterEventsByDay(state.events, day);
  
  if (!day) {
    return <div className="calendar-day empty" />;
  }

  const handleDayClick = (e) => {
    if (onDateClick) {
      onDateClick(day);
    }
  };

  return (
    <div
      ref={drop}
      className={`calendar-day ${isToday ? 'today' : ''} ${!isCurrentMonth ? 'other-month' : ''}`}
      onClick={handleDayClick}
      style={{ 
        cursor: 'pointer',
        position: 'relative',
        backgroundColor: isOver && canDrop ? 'rgba(59, 130, 246, 0.1)' : undefined,
        transition: 'background-color 0.2s'
      }}
    >
      {isOver && canDrop && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '2px dashed var(--primary-color)',
            borderRadius: '0.25rem',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      )}
      <div className="calendar-day-header">
        <span className="calendar-day-number">
          {format(day, 'd')}
        </span>
      </div>
      <div className="calendar-day-events">
        {dayEvents.map(event => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;