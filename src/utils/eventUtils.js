import { isSameDay, parseISO } from 'date-fns';
import { shouldDisplayEvent } from './recurrenceUtils';

// export const filterEventsByDay = (events, day) => {
//   if (!day) return [];
//   return events.filter(event => 
//     isSameDay(parseISO(event.start), day) || 
//     (event.recurrence !== 'none' && checkRecurringEvent(event, day))
//   );
// };

export const filterEventsByDay = (events, day) => {
    if (!day) return [];
    return events.filter(event => shouldDisplayEvent(event, day));
};

export const checkEventConflict = (events, newEvent) => {
  const newStart = new Date(newEvent.start);
  const newEnd = new Date(newEvent.end);
  
  return events.some(event => {
    // Skip comparing with the same event (for updates)
    if (event.id === newEvent.id) return false;
    
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);

    // Check if events are on the same day
    if (!isSameDay(eventStart, newStart)) return false;
    
    // Check for time overlap
    return (
      (newStart >= eventStart && newStart < eventEnd) || // New event starts during existing event
      (newEnd > eventStart && newEnd <= eventEnd) || // New event ends during existing event
      (newStart <= eventStart && newEnd >= eventEnd) // New event completely encompasses existing event
    );
  });
};

export const checkRecurringEvent = (event, day) => {
  // Implement recurrence logic based on event.recurrence and event.recurrencePattern
  // This is a simplified version - actual implementation would be more complex
  const eventDay = parseISO(event.start);
  
  switch (event.recurrence) {
    case 'daily':
      return true;
    case 'weekly':
      return day.getDay() === eventDay.getDay();
    case 'monthly':
      return day.getDate() === eventDay.getDate();
    default:
      return false;
  }
};