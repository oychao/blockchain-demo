import React from 'react';

const Transactions = ({ transactions }) => (
    <div className="transactions">
        <h3>Transactions in Exchange</h3>
        <ul>
            {Object.values(transactions).map(({ hash, from, to, value }) => (
                <li key={hash}>
                    {from} -> {to}: {value}
                </li>
            ))}
        </ul>
    </div>
);

export default Transactions;
