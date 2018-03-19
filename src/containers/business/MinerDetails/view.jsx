import React from 'react';

import './style.css';

import ListPanel from 'containers/utils/ListPanel';

const MinerDetails = ({ miner, blocks, activeBlock, activateBlock }) => {
    const reward = !!blocks ? blocks.reduce((acc, block) => acc + block.transacs[0].value, 0) : 0;
    const children = miner ? (
        <>
            <ul className="odd-even-list">
                {blocks.map(({ index, miner, nonce, hash, prevHash, transacs }) =>
                    <li key={hash} className={hash === activeBlock ? 'active' : ''}
                        onClick={() => void (activateBlock(hash))}>
                        {index} - {hash.slice(0, 30)}
                    </li>
                )}
            </ul>
            <hr />
            Miner: {miner.id}
            <br />
            Reward: <span className="gold">{reward}</span>
        </>
    ) : null;
    return (
        <div className="miner-details">
            <h3>Miner Details</h3>
            <ListPanel.view>
                {children}
            </ListPanel.view>
        </div>
    );
};

export default MinerDetails;
