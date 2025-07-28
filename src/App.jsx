import React, { useState, useEffect } from "react";
import WeatherDashboard from "./components/WeatherDashboard";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors bg-gray-100 dark:bg-gray-900">
      <div className="flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          🌤️ Weather Dashboard
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          aria-label="Toggle dark mode"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
      <WeatherDashboard />
    </div>
  );
};

export default App;
