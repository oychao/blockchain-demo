import * as React from 'react';

import './style.css';

const Dashboard = ({ blocks, miners, investors, totalBtc, transactions }) => (
  <div className="dashboard">
    <h1>A BlockChain Demo</h1>
    <ul>
      <li>
        block count: <strong>{blocks.length}</strong>
      </li>
      <li>
        miner count: <strong>{miners.length}</strong>
      </li>
      <li>
        investors count: <strong>{investors.length}</strong>
      </li>
      <li>
        total BTC: <strong>{totalBtc}</strong>
      </li>
      <li>
        transactions count in exchange:{' '}
        <strong>{Object.keys(transactions).length}</strong>
      </li>
    </ul>
  </div>
);

export default Dashboard;
