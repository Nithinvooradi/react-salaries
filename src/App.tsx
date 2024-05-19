import React from 'react';

import SalaryTable from './Components/SalaryTable';
import SalaryChart from './Components/SalaryChart';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className='text-5xl font-bold text-center mt-4 mb-4'>ML Engineer Salaries (2020 - 2024)</h1>
      <SalaryTable />
      <SalaryChart/>
    </div>
  );
}

export default App;