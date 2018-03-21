import React from 'react';

const BlockList = ({ blocks, activeBlock, activateBlock }) => (
    <ul className="odd-even-list">
        {blocks.map(({ index, miner, nonce, hash, prevHash, transacs, }) =>
            <li key={hash} className={hash === activeBlock ? 'active' : ''}
                onClick={() => void (activateBlock(hash))}>
                {index} - {hash.slice(0, 27)}
            </li>
        )}
    </ul>
);

export default BlockList;
