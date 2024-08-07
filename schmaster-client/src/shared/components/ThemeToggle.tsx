import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []); // Only run on mount

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode.toString());
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
      <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-400 rounded-full transition duration-300 ease-in-out ${darkMode ? 'bg-green-500' : 'bg-gray-400'}`}></span>
      <span className={`absolute left-0.5 bottom-0.5 w-4 h-4 bg-white rounded-full transition duration-300 ease-in-out transform ${darkMode ? 'translate-x-5' : ''}`}></span>
    </label>
  );
};

export default ThemeToggle;
