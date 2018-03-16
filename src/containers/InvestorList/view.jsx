import React from 'react';

import './style.css';

const InvestorList = ({ investors }) => (
    <div className="investor-list">
        <h3>Investor List</h3>
        <ul className="odd-even-list">
            {investors.map(({ id }) =>
                <li key={id}>
                    {id}
                </li>
            )}
        </ul>
    </div>
);

export default InvestorList;
