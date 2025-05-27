import { format } from 'date-fns';
import { useEvents } from '../../context/EventContext';
import { getNextMonth, getPrevMonth } from '../../utils/dateUtils';
import Button from '../UI/Button';

const CalendarControls = () => {
  const { state, dispatch } = useEvents();
  
  const handlePrevMonth = () => {
    const prevMonth = getPrevMonth(state.selectedDate);
    dispatch({
      type: 'SET_SELECTED_DATE',
      payload: prevMonth
    });
  };
  
  const handleNextMonth = () => {
    const nextMonth = getNextMonth(state.selectedDate);
    dispatch({
      type: 'SET_SELECTED_DATE',
      payload: nextMonth
    });
  };
  
  const handleToday = () => {
    dispatch({
      type: 'SET_SELECTED_DATE',
      payload: new Date()
    });
  };

  return (
    <div className="calendar-controls">
      <div className="calendar-controls-container">
        <Button onClick={handleToday} variant="secondary">
          Today
        </Button>
        <div className="month-navigation">
          <Button onClick={handlePrevMonth} variant="secondary">
            &lt;
          </Button>
          <h2>{format(state.selectedDate, 'MMMM yyyy')}</h2>
          <Button onClick={handleNextMonth} variant="secondary">
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarControls;