import React from 'react';

import './style.css';

import ListPanel from 'containers/utils/ListPanel';

class Transactions extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { transactions } = this.props;
        return (
            <div className="transactions">
                <h3>Transactions in Exchange</h3>
                <ListPanel.view>
                    <ul className="odd-even-list">
                        {Object.values(transactions).map(({ hash, from, to, value }) => (
                            <li key={hash}>
                                {from} -> {to}: {value}
                            </li>
                        ))}
                    </ul>
                </ListPanel.view>
            </div>
        );
    }
}

export default Transactions;
