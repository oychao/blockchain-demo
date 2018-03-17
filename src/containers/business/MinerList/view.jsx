import React from 'react';

import './style.css';

import ListPanel from 'containers/utils/ListPanel';

const MinerList = ({ miners }) => (
    <div className="miner-list">
        <h3>Miner List</h3>
        <ListPanel.view>
            <ul className="odd-even-list">
                {miners.map(({ id }) =>
                    <li key={id}>{id}</li>
                )}
            </ul>
        </ListPanel.view>
    </div>
);

export default MinerList;
