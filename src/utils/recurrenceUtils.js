import { parseISO, addDays, addWeeks, addMonths, isSameDay, isSameWeek, isSameMonth } from 'date-fns';

export const generateRecurringEvents = (event, endDate) => {
  if (event.recurrence === 'none') return [event];
  
  const events = [event];
  const startDate = parseISO(event.start);
  const originalEnd = parseISO(event.end);
  const duration = originalEnd - startDate;
  
  let currentDate = new Date(startDate);
  let count = 0;
  const maxCount = 365; // Prevent infinite loops
  
  while (count < maxCount) {
    switch (event.recurrence) {
      case 'daily':
        currentDate = addDays(currentDate, 1);
        break;
      case 'weekly':
        currentDate = addWeeks(currentDate, 1);
        break;
      case 'monthly':
        currentDate = addMonths(currentDate, 1);
        break;
      default:
        return events;
    }
    
    if (currentDate > endDate) break;
    
    const newEnd = new Date(currentDate.getTime() + duration);
    
    events.push({
      ...event,
      id: `${event.id}-${count}`,
      start: currentDate.toISOString(),
      end: newEnd.toISOString(),
      isRecurringInstance: true,
    });
    
    count++;
  }
  
  return events;
};

export const shouldDisplayEvent = (event, day) => {
  if (isSameDay(parseISO(event.start), day)) return true;
  
  if (event.recurrence === 'none') return false;
  
  switch (event.recurrence) {
    case 'daily':
      return parseISO(event.start) <= day;
    case 'weekly':
      return (
        isSameWeek(parseISO(event.start), day) && 
        parseISO(event.start).getDay() === day.getDay()
      );
    case 'monthly':
      return (
        isSameMonth(parseISO(event.start), day) && 
        parseISO(event.start).getDate() === day.getDate()
      );
    default:
      return false;
  }
};