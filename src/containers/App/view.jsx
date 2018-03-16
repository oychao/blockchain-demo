import React from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import * as actions from './actions';
import './style.css';

import Dashboard from 'containers/business/Dashboard';
import Navigator from 'containers/business/Navigator';
import Blockchain from 'containers/business/Blockchain';
import BlockDetails from 'containers/business/BlockDetails';
import MinerList from 'containers/business/MinerList';
import MinerDetails from 'containers/business/MinerDetails';
import InvestorList from 'containers/business/InvestorList';
import InvestorDetails from 'containers/business/InvestorDetails';
import Transactions from 'containers/business/Transactions';

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
        const handlers = [{
            name: 'Add Miner',
            func: this.handleNewMiner
        }, {
            name: 'Add Investor',
            func: this.handleNewInvestor
        }];
        return (
            <div id="app">
                <header>
                    <Dashboard.view {...this.props} />
                </header>
                <nav>
                    <Navigator.view handlers={handlers} />
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
