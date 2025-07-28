import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import ForecastCard from "./ForecastCard";
import WeatherChart from "./WeatherChart";

const WeatherDashboard = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("Kolkata");
  const [theme, setTheme] = useState("light");
  const recognitionRef = useRef(null);

  const API_KEY = "8c468c2e312aeacdb8c01411373d1440"; // ✅ Your API key

  const fetchWeather = async (searchCity) => {
    try {
      const [currentRes, forecastRes] = await Promise.all([
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`
        ),
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=${API_KEY}&units=metric`
        ),
      ]);
      setWeather(currentRes.data);
      setForecast(forecastRes.data.list.slice(0, 8)); // 24h forecast
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  const fetchByLocation = () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        setCity(res.data.name);
        fetchWeather(res.data.name);
      } catch (err) {
        console.error(err);
      }
    });
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice recognition not supported");
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setCity(transcript);
      fetchWeather(transcript);
    };

    recognition.start();
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div
      className={`min-h-screen p-6 transition-all duration-300 ${
        weather?.weather[0].main === "Rain"
          ? "bg-blue-200 dark:bg-gray-800"
          : weather?.weather[0].main === "Clear"
          ? "bg-yellow-100 dark:bg-gray-900"
          : "bg-gray-100 dark:bg-gray-800"
      }`}
    >
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 p-6 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchWeather(city)}
            className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
            placeholder="Search city..."
          />
          <button
            onClick={() => fetchWeather(city)}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Search
          </button>
          <button
            onClick={handleVoiceSearch}
            className="ml-2 px-3 py-2 bg-purple-500 text-white rounded"
          >
            🎤
          </button>
        </div>

        <div className="flex justify-between mb-4">
          <button
            onClick={fetchByLocation}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            📍 Auto Detect
          </button>
          <button
            onClick={toggleTheme}
            className="bg-gray-700 text-white px-4 py-2 rounded"
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>

        {weather && (
          <div className="text-center text-gray-800 dark:text-white">
            <h2 className="text-2xl font-bold">{weather.name}</h2>
            <p className="text-xl">{weather.main.temp}°C</p>
            <p className="capitalize">{weather.weather[0].description}</p>
          </div>
        )}

        {forecast.length > 0 && (
          <>
            <h3 className="mt-6 mb-2 text-lg font-semibold dark:text-white">
              24-Hour Forecast
            </h3>
            <div className="overflow-x-auto flex gap-4">
              {forecast.map((item, idx) => (
                <ForecastCard key={idx} data={item} />
              ))}
            </div>

            <h3 className="mt-6 mb-2 text-lg font-semibold dark:text-white">
              Temperature Chart
            </h3>
            <WeatherChart data={forecast} />
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherDashboard;
