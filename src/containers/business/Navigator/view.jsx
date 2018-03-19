import React from 'react';

import './style.css';

const Navigator = ({ options, }) => (
    <div className="navigator">
        <ul className="odd-even-list">
            {options.map(handler => (
                <li key={handler.name} onClick={handler.func}>{handler.name}</li>
            ))}
        </ul>
    </div>
);

export default Navigator;
