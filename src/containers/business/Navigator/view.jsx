import React from 'react';

import './style.css';

const Navigator = ({ handlers }) => (
    <div className="navigator">
        <ul className="odd-even-list">
            {handlers.map(handler => (
                <li key={handler.name} onClick={handler.func}>{handler.name}</li>
            ))}
        </ul>
    </div>
);

export default Navigator;
