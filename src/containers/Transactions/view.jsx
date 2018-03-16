import React from 'react';

import './style.css';

class Transactions extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { transactions } = this.props;
        return (
            <div ref={_ => void (this.container = _)} className="transactions" >
                <h3>Transactions in Exchange</h3>
                <ul className="odd-even-list">
                    {Object.values(transactions).map(({ hash, from, to, value }) => (
                        <li key={hash}>
                            {from} -> {to}: {value}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    componentDidUpdate() {
        this.container.scrollTop = this.container.scrollHeight;
    }
}

export default Transactions;
