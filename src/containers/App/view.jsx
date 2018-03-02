import React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import * as actions from './actions';

import './style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minerCount: 0,
            investorCount: 0
        };
        this.handleNewMiner = :: this.handleNewMiner;
        this.handleNewInvestor =:: this.handleNewInvestor;
    }

    handleNewMiner() {
        this.props.handleNewMiner();
    }

    handleNewInvestor() {
        this.props.handleNewInvestor();
    }

    render() {
        return (
            <div id="app">
                <h1>A BlockChain Demo</h1>
                <p>Check the console and redux dev tools</p>
                <hr />
                <button onClick={this.handleNewMiner}>Add Miner</button>
                <br />
                <button onClick={this.handleNewInvestor}>Add Investor</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    blocks: state.blocks,
    miners: state.miners,
    investors: state.investors,
    transactions: state.transactions,
    balances: state.balances
});
const mapDispatchToProps = dispatch => ({
    handleNewMiner: () => dispatch(actions.newMinerFlag()),
    handleNewInvestor: () => dispatch(actions.newInvestorFlag())
});

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
