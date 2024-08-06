// components/ThemeToggle.js
import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  // Initialize darkMode based on localStorage
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved theme
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    // Apply dark mode class based on darkMode state
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    // Toggle the darkMode state
    setDarkMode(prevMode => {
      // Update localStorage and apply the dark class based on the new mode
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode.toString()); // Store as string
      document.documentElement.classList.toggle('dark', newMode); // Toggle class based on new mode
      return newMode;
    });
  };

  return (
<label className="relative inline-block w-10 h-5">
      <input
        type="checkbox"
        checked={darkMode}
        onChange={toggleDarkMode}
        className="opacity-0 w-0 h-0"
      />
      <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-400 rounded-full transition duration-300 ease-in-out dark:bg-green-500"></span>
      <span className="absolute left-0.5 bottom-0.5 w-4 h-4 bg-white rounded-full transition duration-300 ease-in-out transform dark:translate-x-5"></span>
    </label>
  );
};

export default ThemeToggle;
