import React from 'react';

import './style.css';

import ListPanel from 'containers/utils/ListPanel';

class Blockchain extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { blocks, activeBlock } = this.props;
        return blocks.length !== nextProps.blocks.length || activeBlock !== nextProps.activateBlock;
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
                        {blocks.map(({ index, miner, nonce, hash, prevHash, transacs }) =>
                            <li key={hash} className={hash === activeBlock ? 'active' : ''}
                                onClick={() => void (activateBlock(hash))}>
                                {index} - {hash.slice(0, 30)}
                            </li>
                        )}
                    </ul>
                </ListPanel.view>
            </div>
        );
    }
}

export default Blockchain;
