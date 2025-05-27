import { createContext, useContext, useReducer, useEffect } from 'react';

const EventContext = createContext();

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(event => event.id !== action.payload),
      };
    case 'SET_SELECTED_EVENT':
      return { ...state, selectedEvent: action.payload };
    case 'SET_SELECTED_DATE':
      return { ...state, selectedDate: action.payload };
    default:
      return state;
  }
};

// export const EventProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(eventReducer, {
//     events: [],
//     selectedEvent: null,
//     selectedDate: new Date(),
//   });

//   return (
//     <EventContext.Provider value={{ state, dispatch }}>
//       {children}
//     </EventContext.Provider>
//   );
// };

export const EventProvider = ({ children, initialEvents = [], onEventsChange, onMonthChange }) => {
  const [state, dispatch] = useReducer(eventReducer, {
    events: initialEvents,
    selectedEvent: null,
    selectedDate: new Date(),
  });

  useEffect(() => {
    if (onEventsChange) {
      onEventsChange(state.events);
    }
  }, [state.events, onEventsChange]);

  useEffect(() => {
    if (onMonthChange) {
      onMonthChange(state.selectedDate);
    }
  }, [state.selectedDate, onMonthChange]);

  return (
    <EventContext.Provider value={{ state, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);