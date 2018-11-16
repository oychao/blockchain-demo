import * as React from 'react';

import './style.css';

const Dashboard = ({ blocks, miners, investors, totalBtc, transactions }) => (
  <div className="dashboard">
    <h1>A BlockChain Demo</h1>
    <ul>
      <li>
        <span>block count:&nbsp;</span><strong>{blocks.length}</strong>
      </li>
      <li>
        <span>miner count:&nbsp;</span><strong>{miners.length}</strong>
      </li>
      <li>
        <span>investors count:&nbsp;</span><strong>{investors.length}</strong>
      </li>
      <li>
        <span>total BTC:&nbsp;</span><strong>{totalBtc}</strong>
      </li>
      <li>
        <span>transactions count in exchange:&nbsp;</span>
        <strong>{Object.keys(transactions).length}</strong>
      </li>
    </ul>
  </div>
);

export default Dashboard;
