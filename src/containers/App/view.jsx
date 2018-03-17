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
    }

    render() {
        const {
            blocks,
            activeBlock,
            miners,
            investors,
            totalBtc,
            transactions,
            handleNewMiner,
            handleNewInvestor,
            activateBlock,
        } = this.props;
        const options = [{
            name: 'Add Miner',
            func: handleNewMiner
        }, {
            name: 'Add Investor',
            func: handleNewInvestor
        }];
        return (
            <div id="app">
                <header>
                    <Dashboard.view {...this.props} />
                </header>
                <nav>
                    <Navigator.view options={options} />
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
                    <Blockchain.view blocks={blocks} activeBlock={activeBlock} activateBlock={activateBlock} />
                </div>
                <div className="block-details">
                    <BlockDetails.view block={blocks.find(block => block.hash === activeBlock)} />
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
    transactions: Object.assign({}, state.transactions),
    activeBlock: state.activeBlock,
});
const mapDispatchToProps = dispatch => ({
    handleNewMiner: () => dispatch(actions.newMinerFlag()),
    handleNewInvestor: () => dispatch(actions.newInvestorFlag()),
    activateBlock: hash => dispatch(actions.activeBlock(hash)),
});

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
