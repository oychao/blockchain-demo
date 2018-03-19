import React from 'react';

import './style.css';

import ListPanel from 'containers/utils/ListPanel';

class InvestorDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate({ investor, blocks, activeBlock, }, nextState) {
        return !this.props.investor ||
            this.props.blocks.length !== blocks.length ||
            this.props.activeBlock !== activeBlock;
    }

    render() {
        const { investor, blocks, activeBlock, activateBlock, } = this.props;
        const reward = !!blocks ? blocks.reduce((acc, block) => acc + block.transacs[0].value, 0) : 0;
        const transacCount = investor ? blocks.reduce((acc, block) => {
            const curCount = block.transacs.reduce((acc2, transac) => {
                return acc2 + (transac.from === investor.id || transac.to === investor.id ? 1 : 0);
            }, 0);
            return curCount + acc;
        }, 0) : 0;
        const children = investor ? (
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
                Investor Id: <span>{investor.id}</span>
                <br />
                Block Count: <span>{blocks.length}</span>
                <br />
                Transaction Count: <span>{transacCount}</span>
                <br />
                Balance in Chain: <span className="gold">{investor.balance}</span>
            </>
        ) : null;
        return (
            <div className="investor-details">
                <h3>Investor Details</h3>
                <ListPanel.view>
                    {children}
                </ListPanel.view>
            </div>
        );
    }
}

export default InvestorDetails;
