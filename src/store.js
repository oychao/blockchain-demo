import { createStore, compose } from 'redux';

import Chain from 'business/chain';
import App from 'containers/App';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(App.reducer, composeEnhancers());

export default store;
