import React from "react";

const ForecastCard = ({ data }) => {
  const date = new Date(data.dt * 1000);
  const hours = date.getHours();

  return (
    <div className="min-w-[120px] p-4 bg-white dark:bg-gray-800 rounded shadow text-center">
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {hours}:00
      </p>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
        alt="icon"
        className="mx-auto"
      />
      <p className="text-lg font-semibold text-gray-800 dark:text-white">
        {data.main.temp.toFixed(1)}°C
      </p>
      <p className="text-sm capitalize text-gray-600 dark:text-gray-300">
        {data.weather[0].description}
      </p>
    </div>
  );
};

export default ForecastCard;
