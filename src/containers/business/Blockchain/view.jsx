import React from 'react';

import './style.css';

import ListPanel from 'containers/utils/ListPanel';

class Blockchain extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate({ blocks, activeBlock, }, nextState) {
        return this.props.blocks.length !== blocks.length ||
            this.props.activeBlock !== activeBlock;
    }

    render() {
        const {
            blocks,
            activeBlock,
            activateBlock,
        } = this.props;
        return (
            <div className="block">
                <h3>Blockchain</h3>
                <ListPanel.view>
                    <ul className="odd-even-list">
                        {blocks.map(({ index, miner, nonce, hash, prevHash, transacs, }) =>
                            <li key={hash} className={hash === activeBlock ? 'active' : ''}
                                onClick={() => void (activateBlock(hash))}>
                                {index} - {hash.slice(0, 27)}
                            </li>
                        )}
                    </ul>
                </ListPanel.view>
            </div>
        );
    }
}

export default Blockchain;
