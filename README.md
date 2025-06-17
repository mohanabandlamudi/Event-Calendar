# Event Calendar App
Website: https://mohanabandlamudi.github.io/Event-Calendar/

A beautiful and feature-rich event calendar application built with React. This application allows users to manage events with an intuitive interface and beautiful seasonal backgrounds.

## Features

- 📅 Interactive Calendar Interface
- ✨ Beautiful Seasonal Backgrounds
- 🎯 Click-to-Add Events
- 🖱️ Drag and Drop Event Management
- 🎨 Event Color Customization
- 🔄 Event Recurrence Options
- 📱 Responsive Design
- 💾 Local Storage Persistence
- ⚡ Conflict Prevention
- 🎯 Event Duration Management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-event-calendar
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## Usage

### Adding Events
- Click the "Add Event" button or click directly on any date
- Fill in the event details in the modal
- Choose a color for your event
- Set the start and end times
- Optionally set recurrence

### Managing Events
- Drag and drop events to different dates
- Click on an event to edit or delete it
- Events are automatically checked for time conflicts
- Color-coded for easy visualization

### Calendar Navigation
- Use the arrow buttons to move between months
- Click "Today" to return to the current month
- Beautiful background images change with each month

## Technologies Used

- React
- React DnD (Drag and Drop)
- date-fns
- Local Storage for data persistence
- CSS Modules for styling

## Project Structure

```
my-event-calendar/
├── src/
│   ├── components/
│   │   ├── Calendar/
│   │   ├── Event/
│   │   └── UI/
│   ├── context/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   └── App.css
├── public/
└── package.json
```

## Features in Detail

### Event Management
- Create, edit, and delete events
- Set event title, description, time, and color
- Drag and drop functionality for easy rescheduling
- Conflict detection prevents overlapping events

### Calendar Interface
- Monthly view with intuitive navigation
- Clear visual hierarchy
- Responsive design for all screen sizes
- Seasonal background images

### Data Persistence
- All events are automatically saved to local storage
- Data persists between browser sessions
- No backend required

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- Background images from Unsplash
- Icons from React Icons
- Date handling with date-fns
- Drag and Drop functionality with React DnD
