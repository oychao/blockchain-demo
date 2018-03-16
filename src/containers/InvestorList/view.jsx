import React from 'react';

const InvestorList = ({ investors }) => (
    <div className="investor-list">
        <h3>Investor List</h3>
        <ul>
            {investors.map(({ id }) =>
                <li key={id}>
                    {id}
                </li>
            )}
        </ul>
    </div>
);

export default InvestorList;
