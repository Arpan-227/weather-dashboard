import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeatherChart = ({ data }) => {
  const chartData = data.map((item) => ({
    time: new Date(item.dt * 1000).getHours() + ":00",
    temp: item.main.temp,
  }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" stroke="#8884d8" />
        <YAxis stroke="#8884d8" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="temp"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeatherChart;
