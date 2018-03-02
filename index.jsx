import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from 'containers/App';
import contactor from 'business/contactor';
import store from 'store';

import './style.css';

ReactDOM.render(
    <Provider store={store}>
        <App.view />
    </Provider>,
    document.getElementById('root'),
);
