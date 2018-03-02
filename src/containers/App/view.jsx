import React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import * as actions from './actions';

import './style.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.handleNewMiner = :: this.handleNewMiner;
        this.handleNewInvestor = :: this.handleNewInvestor;
    }

    handleNewMiner() {
        this.props.handleNewMiner();
    }

    handleNewInvestor() {
        this.props.handleNewInvestor();
    }

    render() {
        const { blocks, miners, investors, totalBtc, transactions } = this.props;
        return (
            <div id="app">
                <h1>A BlockChain Demo</h1>
                <p>Check the console and redux dev tools</p>
                <hr />
                <button onClick={this.handleNewMiner}>Add Miner(5 at most)</button><br />
                <button onClick={this.handleNewInvestor}>Add Investor(10 at most)</button>
                <hr />
                <p>
                    block count: <strong>{blocks.length}</strong><br />
                    miner count: <strong>{miners.length}</strong><br />
                    investors count: <strong>{investors.length}</strong><br />
                    total BTC: <strong>{totalBtc}</strong><br />
                    transactions count in exchange: <strong>{Object.keys(transactions).length}</strong>
                </p>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    blocks: state.blocks,
    miners: state.miners,
    investors: state.investors,
    totalBtc: state.totalBtc,
    transactions: state.transactions
});
const mapDispatchToProps = dispatch => ({
    handleNewMiner: () => dispatch(actions.newMinerFlag()),
    handleNewInvestor: () => dispatch(actions.newInvestorFlag())
});

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
