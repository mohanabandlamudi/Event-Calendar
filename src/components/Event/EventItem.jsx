import { useDrag } from 'react-dnd';
import { parseISO, format } from 'date-fns';
import { useEvents } from '../../context/EventContext';

const EventItem = ({ event }) => {
  const { dispatch } = useEvents();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'event',
    item: { id: event.id, event: event },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleDrop = (eventId, newDay) => {
    if (!newDay) return;
    
    const eventStart = parseISO(event.start);
    const eventEnd = parseISO(event.end);
    const duration = eventEnd - eventStart;
    
    const newStart = new Date(newDay);
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
  };

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent calendar day click
    dispatch({ type: 'SET_SELECTED_EVENT', payload: event });
    // Open the modal
    const modalOpenEvent = new CustomEvent('openEventModal');
    window.dispatchEvent(modalOpenEvent);
  };

  return (
    <div
      ref={drag}
      className={`event-item ${isDragging ? 'dragging' : ''}`}
      style={{
        backgroundColor: event.color,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        transform: isDragging ? 'scale(0.95)' : 'scale(1)',
        transition: 'transform 0.2s, opacity 0.2s'
      }}
      onClick={handleClick}
    >
      <div className="event-time">
        {format(parseISO(event.start), 'HH:mm')} - {format(parseISO(event.end), 'HH:mm')}
      </div>
      <div className="event-title">{event.title}</div>
    </div>
  );
};

export default EventItem;