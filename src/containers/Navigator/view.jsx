import React from 'react';

import './style.css';

const Navigator = ({ handlers }) => (
    <div className="navigator">
        {handlers.map(handler => (
            <a key={handler.name} onClick={handler.func}>{handler.name}</a>
        ))}
    </div>
);

export default Navigator;
