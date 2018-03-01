import React from 'react';
import { hot } from 'react-hot-loader';

import './style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minerCount: 0,
            investorCount: 0
        };
        this.handleStart = :: this.handleStart;
    }

    handleStart() {
    }

    render() {
        return (
            <div id="app">
                <h1>A BlockChain Demo</h1>
                <hr />
                <p>Check the console and redux dev tools</p>
            </div>
        );
    }
}

export default hot(module)(App);
