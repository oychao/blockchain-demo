import React from 'react';
import { hot } from 'react-hot-loader';
import store from 'store';

import 'containers/App/style.css';

import Miner from 'business/miner';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            miners: [
                new Miner(1, 'Zhao', store.chain),
                new Miner(2, 'Qian', store.chain)
            ]
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.state.miners.forEach(miner => {
            miner.listen('hello from App');
        });
    }
    render() {
        return (
            <div id="app">
                <h1>{this.state.count}</h1>
                <button onClick={this.handleClick}>click me</button>
            </div>
        );
    }
}

export default hot(module)(App);
