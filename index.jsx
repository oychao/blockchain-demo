import React from 'react';
import ReactDOM from 'react-dom';

import App from 'containers/App';
import contactor from 'business/contactor';
import store from 'store';

import './style.css';

ReactDOM.render(
    <App.view />,
    document.getElementById('root'),
);
