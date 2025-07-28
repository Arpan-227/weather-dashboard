import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const apiKey = "8c468c2e312aeacdb8c01411373d1440";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather by coordinates:", error.message);
    }
  };

  const fetchWeatherByCity = async (city) => {
    try {
      const apiKey = "8c468c2e312aeacdb8c01411373d1440";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather by city:", error.message);
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (error) => {
          console.warn("Geolocation error:", error.message);
          fetch("https://ip-api.com/json/")
            .then((res) => res.json())
            .then((data) => fetchWeatherByCity(data.city))
            .catch((err) => {
              console.error("IP location fetch failed:", err);
              fetchWeatherByCity("Delhi");
            });
        }
      );
    } else {
      console.warn("Geolocation not supported, using fallback.");
      fetch("https://ip-api.com/json/")
        .then((res) => res.json())
        .then((data) => fetchWeatherByCity(data.city))
        .catch(() => fetchWeatherByCity("Delhi"));
    }
  }, []);

  return (
    <div className="p-4 text-center">
      {weatherData ? (
        <div>
          <h2 className="text-3xl font-bold mb-2">{weatherData.name}</h2>
          <p className="text-lg">🌡️ Temperature: {weatherData.main.temp} °C</p>
          <p className="text-lg">☁️ Condition: {weatherData.weather[0].description}</p>
          <p className="text-lg">💨 Wind: {weatherData.wind.speed} m/s</p>
          <p className="text-lg">💧 Humidity: {weatherData.main.humidity}%</p>
        </div>
      ) : (
        <p className="text-xl">Loading weather data...</p>
      )}
    </div>
  );
};

export default App;
