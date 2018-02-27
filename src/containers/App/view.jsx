import React from 'react';
import { hot } from 'react-hot-loader';

import 'containers/App/style.css';

import contactor from 'business/contactor';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minerCount: 0,
            investorCount: 0
        };
        this.handleAddMiner = this.handleAddMiner.bind(this);
        this.handleAddInvestor = this.handleAddInvestor.bind(this);
    }
    handleAddMiner() {
        contactor.popupMiner();
        this.setState({
            minerCount: contactor.getMinerLen()
        });
    }
    handleAddInvestor() {
        contactor.popupInvestor();
        this.setState({
            investorCount: contactor.getInvestorLen()
        });
    }
    render() {
        return (
            <div id="app">
                <h1>A BlockChain Demo</h1>
                <h2>Miner Number: {this.state.minerCount}</h2>
                <button onClick={this.handleAddMiner}>add miner</button>
                <hr />
                <h2>Investor Number: {this.state.investorCount}</h2>
                <button onClick={this.handleAddInvestor}>add investor</button>
            </div>
        );
    }
}

export default hot(module)(App);
