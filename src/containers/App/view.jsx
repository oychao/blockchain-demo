import React from 'react';
import { hot } from 'react-hot-loader';

import './style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({
            count: this.state.count + 1
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
