// src/components/SalaryTable.tsx
import React, { useState } from "react";
import data from "../salaries.json";
import { FaSort } from "react-icons/fa";

interface SalaryData {
  year: number;
  total_jobs: number;
  average_salary: number;
  job_titles: { [key: string]: number };
}

const SalaryTable: React.FC = () => {
  const [salaries] = useState<SalaryData[]>(data.salaries);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SalaryData;
    direction: "ascending" | "descending";
  } | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const sortedSalaries = [...salaries].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key: keyof SalaryData) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleRowClick = (year: number) => {
    setSelectedYear(year);
  };

  const selectedYearData = salaries.find(
    (salary) => salary.year === selectedYear
  );

  return (
    
    <div className="max-w-[1000px] mx-auto">
      <div className=" flex justify-between mt-10 mb-10">
        <table className="table-auto border-collapse border border-slate-400 w-full">
          <thead className="text-center">
            <tr>
              <th className="border border-slate-300">
                <div className="flex items-center justify-center">
                  Year <FaSort onClick={() => requestSort("year")} />
                </div>
              </th>
              <th className="border border-slate-300">
                <div className="flex items-center justify-center">
                  Total Jobs{" "}
                  <FaSort onClick={() => requestSort("total_jobs")} />
                </div>
              </th>
              <th className="border border-slate-300">
                <div className="flex items-center justify-center">
                  Average Salary (USD)
                  <FaSort onClick={() => requestSort("average_salary")} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {sortedSalaries.map((salary) => (
              <tr key={salary.year} onClick={() => handleRowClick(salary.year)}>
                <td className="border border-slate-300">{salary.year}</td>
                <td className="border border-slate-300">{salary.total_jobs}</td>
                <td className="border border-slate-300">
                  {salary.average_salary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedYearData && (
          <div className="ml-10">
            <table className="table-auto border-collapse border border-slate-400 w-full mb-8">
              <caption className="caption-top">
                <h1 className=" text-2xl font-bold mb-3">Job Titles for {selectedYear}</h1>
              </caption>
              <thead className="text-center">
                <tr>
                  <th className="border border-slate-300">Job Title</th>
                  <th className="border border-slate-300">Number of Jobs</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {Object.entries(selectedYearData.job_titles).map(
                  ([title, count]) => (
                    <tr key={title}>
                      <td className="border border-slate-300">{title}</td>
                      <td className="border border-slate-300">{count}</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryTable;
