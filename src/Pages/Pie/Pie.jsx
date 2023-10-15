import React from 'react';

import Doughnut from '../../components/Charts/Pie.jsx';
import { pieChartData } from '../data/dummy.js';


const Pie = () => (
  <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
    <div className="w-full">
      <Doughnut id="chart-pie" data={pieChartData} legendVisiblity height="full" />
    </div>
  </div>
);

export default Pie;
