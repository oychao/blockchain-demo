import React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import * as actions from './actions';
import './style.css';

import Block from '../Block';

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
                <header>
                    <h1>A BlockChain Demo</h1>
                    <ul>
                        <li>block count: <strong>{blocks.length}</strong></li>
                        <li>miner count(5 at most): <strong>{miners.length}</strong></li>
                        <li>investors count(10 at most): <strong>{investors.length}</strong></li>
                        <li>total BTC: <strong>{totalBtc}</strong></li>
                        <li>transactions count in exchange: <strong>{Object.keys(transactions).length}</strong></li>
                    </ul>
                </header>
                <nav>
                    <a onClick={this.handleNewMiner}>Add Miner</a>
                    <a onClick={this.handleNewInvestor}>Add Investor</a>
                </nav>
                <main>
                    {blocks.map(block => <Block.view {...block} key={block.hash} />)}
                </main>
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
