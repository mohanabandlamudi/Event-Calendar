import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { EventProvider } from './context/EventContext';
import Calendar from './components/Calendar/Calendar';
import EventModal from './components/Event/EventModal';
import useLocalStorage from './hooks/useLocalStorage';
import { getMonthBackground, preloadBackgrounds } from './utils/backgroundImages';
import './App.css';

const App = () => {
  const [storedEvents, setStoredEvents] = useLocalStorage('calendarEvents', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    preloadBackgrounds();
  }, []);

  const handleMonthChange = (date) => {
    setCurrentDate(date);
  };

  const backgroundStyle = {
    backgroundImage: `url(${getMonthBackground(currentDate)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <EventProvider 
        initialEvents={storedEvents} 
        onEventsChange={setStoredEvents}
        onMonthChange={handleMonthChange}
      >
        <div className="app-background" style={backgroundStyle}>
          <div className="app-container">
            <h1>Event Calendar</h1>
            <button 
              className="add-event-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Add Event
            </button>
            <Calendar />
            <EventModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </EventProvider>
    </DndProvider>
  );
};

export default App;