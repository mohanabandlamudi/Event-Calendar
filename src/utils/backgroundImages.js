// Background images for each month - optimized sizes and formats
const monthlyBackgrounds = {
  0: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=1200&q=75&auto=format&fit=crop', // January
  1: 'https://images.unsplash.com/photo-1454944338482-a69bb95894af?w=1200&q=75&auto=format&fit=crop', // February
  2: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1200&q=75&auto=format&fit=crop', // March
  3: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=75&auto=format&fit=crop', // April
  4: 'https://images.unsplash.com/photo-1586952205040-22514ffab1a1?w=1200&q=75&auto=format&fit=crop', // May
  5: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=75&auto=format&fit=crop', // June
  6: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=75&auto=format&fit=crop', // July
  7: 'https://images.unsplash.com/photo-1535463731090-e34f4b5098c5?w=1200&q=75&auto=format&fit=crop', // August
  8: 'https://images.unsplash.com/photo-1506102383123-c8ef1e872756?w=1200&q=75&auto=format&fit=crop', // September
  9: 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=1200&q=75&auto=format&fit=crop', // October - Fall maple trees
  10: 'https://images.unsplash.com/photo-1446034295857-c39f8844fad4?w=1200&q=75&auto=format&fit=crop', // November - Misty autumn forest
  11: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=1200&q=75&auto=format&fit=crop', // December
};

// Preload next and previous month images
const preloadAdjacentMonths = (currentDate) => {
  const currentMonth = currentDate.getMonth();
  const prevMonth = (currentMonth - 1 + 12) % 12;
  const nextMonth = (currentMonth + 1) % 12;
  
  [prevMonth, nextMonth].forEach(month => {
    const img = new Image();
    img.src = monthlyBackgrounds[month];
  });
};

export const getMonthBackground = (date) => {
  const month = date.getMonth();
  // Preload adjacent months when getting current month's background
  preloadAdjacentMonths(date);
  return monthlyBackgrounds[month];
};

// Preload only the current month and adjacent months initially
export const preloadBackgrounds = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const prevMonth = (currentMonth - 1 + 12) % 12;
  const nextMonth = (currentMonth + 1) % 12;
  
  [prevMonth, currentMonth, nextMonth].forEach(month => {
    const img = new Image();
    img.src = monthlyBackgrounds[month];
  });
}; 