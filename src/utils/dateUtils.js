import { format, addMonths, subMonths, isSameMonth, isSameDay, parseISO } from 'date-fns';

export const formatDate = (date, formatStr = 'MMMM yyyy') => {
  return format(date, formatStr);
};

export const getNextMonth = (date) => {
  return addMonths(date, 1);
};

export const getPrevMonth = (date) => {
  return subMonths(date, 1);
};

export const isCurrentMonth = (date, currentDate) => {
  return isSameMonth(date, currentDate);
};

export const isToday = (date) => {
  return isSameDay(date, new Date());
};

export const parseDateISO = (dateString) => {
  return parseISO(dateString);
};