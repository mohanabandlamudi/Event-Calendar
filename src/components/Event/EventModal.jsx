import { useEvents } from '../../context/EventContext';
import EventForm from './EventForm';

const EventModal = ({ isOpen, onClose }) => {
  const { state, dispatch } = useEvents();
  
  const handleClose = () => {
    dispatch({ type: 'SET_SELECTED_EVENT', payload: null });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {state.selectedEvent ? 'Edit Event' : 'Add New Event'}
          </h2>
          <button className="close-btn" onClick={handleClose}>
            &times;
          </button>
        </div>
        <EventForm onClose={handleClose} />
      </div>
    </div>
  );
};

export default EventModal;