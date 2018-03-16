import React from 'react';

import './style.css';

const MinerList = ({ miners }) => (
    <div className="miner-list">
        <h3>Miner List</h3>
        <ul>
            {miners.map(({ id }) =>
                <li key={id}>{id}</li>
            )}
        </ul>
    </div>
);

export default MinerList;
