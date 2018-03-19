import React from 'react';

import './style.css';

import ListPanel from 'containers/utils/ListPanel';

class MinerDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate({ miner, activeBlock, blocks, }, nextState) {
        return !this.props.miner ||
            this.props.miner.id !== miner.id ||
            this.props.activeBlock !== activeBlock ||
            this.props.blocks.length !== blocks.length;
    }

    render() {
        const { miner, blocks, activeBlock, activateBlock, } = this.props;
        const reward = !!blocks ? blocks.reduce((acc, block) => acc + block.transacs[0].value, 0) : 0;
        const children = miner ? (
            <>
                <ul className="odd-even-list">
                    {blocks.map(({ index, miner, nonce, hash, prevHash, transacs, }) =>
                        <li key={hash} className={hash === activeBlock ? 'active' : ''}
                            onClick={() => void (activateBlock(hash))}>
                            {index} - {hash.slice(0, 27)}
                        </li>
                    )}
                </ul>
                <hr />
                Miner Id: <span>{miner.id}</span>
                <br />
                Block Count: <span>{blocks.length}</span>
                <br />
                Total Reward: <span className="gold">{reward}</span>
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
    }
}

export default MinerDetails;
