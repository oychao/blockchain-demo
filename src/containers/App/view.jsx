import React from 'react';
import { hot } from 'react-hot-loader';

import 'containers/App/style.css';

import Contactor from 'business/contactor';

const contactor = new Contactor();
let id = 0;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        contactor.create(++id);
        this.setState({
            count: contactor.miners.length
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
