import { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { useEvents } from '../../context/EventContext';
import { checkEventConflict } from '../../utils/eventUtils';
import { v4 as uuidv4 } from 'uuid';
import Input from '../UI/Input';
import Dropdown from '../UI/Dropdown';
import Button from '../UI/Button';

const recurrenceOptions = [
  { value: 'none', label: 'No recurrence' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'custom', label: 'Custom' },
];

const colorOptions = [
  { value: '#3b82f6', label: 'Blue' },
  { value: '#ef4444', label: 'Red' },
  { value: '#10b981', label: 'Green' },
  { value: '#f59e0b', label: 'Orange' },
  { value: '#8b5cf6', label: 'Purple' },
  { value: '#ec4899', label: 'Pink' },
  { value: '#6366f1', label: 'Indigo' },
  { value: '#14b8a6', label: 'Teal' },
];

const EventForm = ({ onClose }) => {
  const { state, dispatch } = useEvents();
  const { selectedEvent, selectedDate } = state;
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    id: uuidv4(),
    title: '',
    description: '',
    start: format(selectedDate, 'yyyy-MM-dd') + 'T09:00',
    end: format(selectedDate, 'yyyy-MM-dd') + 'T10:00',
    recurrence: 'none',
    recurrencePattern: {},
    color: colorOptions[Math.floor(Math.random() * colorOptions.length)].value, // Random initial color
  });

  useEffect(() => {
    if (selectedEvent) {
      setFormData({
        ...selectedEvent,
        start: format(parseISO(selectedEvent.start), "yyyy-MM-dd'T'HH:mm"),
        end: format(parseISO(selectedEvent.end), "yyyy-MM-dd'T'HH:mm"),
      });
    }
    setError('');
  }, [selectedEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const validateEventTimes = () => {
    const startTime = new Date(formData.start);
    const endTime = new Date(formData.end);
    
    if (endTime <= startTime) {
      setError('End time must be after start time');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateEventTimes()) {
      return;
    }
    
    const event = {
      ...formData,
      start: new Date(formData.start).toISOString(),
      end: new Date(formData.end).toISOString(),
    };

    if (checkEventConflict(state.events, event)) {
      setError('This time slot conflicts with an existing event');
      return;
    }

    if (selectedEvent) {
      dispatch({ type: 'UPDATE_EVENT', payload: event });
    } else {
      dispatch({ type: 'ADD_EVENT', payload: event });
    }
    
    onClose();
  };

  const handleDelete = () => {
    if (selectedEvent && window.confirm('Are you sure you want to delete this event?')) {
      dispatch({ type: 'DELETE_EVENT', payload: selectedEvent.id });
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      {error && (
        <div className="error-message" style={{
          color: '#ef4444',
          backgroundColor: '#fee2e2',
          padding: '0.5rem',
          borderRadius: '0.25rem',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}
      
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      
      <div className="form-row">
        <Input
          type="datetime-local"
          label="Start"
          name="start"
          value={formData.start}
          onChange={handleChange}
          required
        />
        <Input
          type="datetime-local"
          label="End"
          name="end"
          value={formData.end}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="input-label">Event Color</label>
        <div className="color-picker">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              type="button"
              className={`color-option ${formData.color === color.value ? 'selected' : ''}`}
              style={{
                backgroundColor: color.value,
                width: '30px',
                height: '30px',
                border: formData.color === color.value ? '2px solid #000' : '2px solid transparent',
                borderRadius: '50%',
                cursor: 'pointer',
                margin: '0 4px',
                padding: 0,
              }}
              onClick={() => handleChange({ target: { name: 'color', value: color.value } })}
              title={color.label}
            />
          ))}
        </div>
      </div>
      
      <Input
        type="textarea"
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      
      <Dropdown
        label="Recurrence"
        name="recurrence"
        value={formData.recurrence}
        options={recurrenceOptions}
        onChange={handleChange}
      />
      
      <div className="form-actions">
        {selectedEvent && (
          <Button 
            type="button" 
            onClick={handleDelete}
            className="btn delete-btn"
          >
            Delete Event
          </Button>
        )}
        <div className="form-actions-right">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {selectedEvent ? 'Update' : 'Add'} Event
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EventForm;