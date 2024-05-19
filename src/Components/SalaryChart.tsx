import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import data from '../salaries.json';

const SalaryChart: React.FC = () => {
  const chartData = data.salaries.map((entry) => ({
    year: entry.year,
    totalJobs: entry.total_jobs,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="totalJobs" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SalaryChart;
