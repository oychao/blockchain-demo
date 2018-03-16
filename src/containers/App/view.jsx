import React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import * as actions from './actions';
import './style.css';

import Blockchain from '../Blockchain';
import BlockDetails from '../BlockDetails';
import MinerList from '../MinerList';
import MinerDetails from '../MinerDetails';
import InvestorList from '../InvestorList';
import InvestorDetails from '../InvestorDetails';
import Transactions from '../Transactions';

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
                <div className="miner-list">
                    <MinerList.view miners={miners} />
                </div>
                <div className="miner-details">
                    <MinerDetails.view />
                </div>
                <div className="investor-list">
                    <InvestorList.view investors={investors} />
                </div>
                <div className="investor-details">
                    <InvestorDetails.view />
                </div>
                <div className="transaction-list">
                    <Transactions.view transactions={transactions} />
                </div>
                <div className="blockchain-info">
                    <Blockchain.view blocks={blocks} />
                </div>
                <div className="block-details">
                    <BlockDetails.view />
                </div>
            </div >
        );
    }
}

const mapStateToProps = state => ({
    blocks: state.blocks.slice(),
    miners: state.miners.slice(),
    investors: state.investors.slice(),
    totalBtc: state.totalBtc,
    transactions: Object.assign({}, state.transactions)
});
const mapDispatchToProps = dispatch => ({
    handleNewMiner: () => dispatch(actions.newMinerFlag()),
    handleNewInvestor: () => dispatch(actions.newInvestorFlag())
});

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
