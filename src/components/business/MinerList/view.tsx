import * as React from 'react';

import './style.css';

import ListPanel from 'comps/utils/ListPanel';

const MinerList = ({ miners, activeMiner, activateMiner }) => (
  <div className="miner-list">
    <h3>
      Miner List
      <span> (5 at most)</span>
    </h3>
    <ListPanel.view>
      <ul className="odd-even-list">
        {miners.map(({ id }) => (
          <li
            key={id}
            className={activeMiner === id ? 'active' : ''}
            onClick={() => void activateMiner(id)}
          >
            {id}
          </li>
        ))}
      </ul>
    </ListPanel.view>
  </div>
);

export default MinerList;
