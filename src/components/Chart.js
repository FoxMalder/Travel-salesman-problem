import React from 'react';
import Heading from 'arui-feather/heading';
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  stop,
  linearGradient,
  Area,
  Tooltip,
} from 'recharts';
import PropTypes from 'prop-types';
import '../css/Chart.css';

export default function Chart(props) {
  const {
    data,
    dataKey,
    children,
  } = props;
  return (
    <div className="Chart">
      <Heading size="s" className="Chart__Title">
        {children}
      </Heading>
      <AreaChart width={400} height={300} data={data}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ff2e2e" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ff9494" stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <XAxis />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey={dataKey} stroke="#ff9494" fillOpacity={1} fill="url(#color)" />
      </AreaChart>
    </div>
  );
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    solution: PropTypes.number,
  })).isRequired,
  dataKey: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
