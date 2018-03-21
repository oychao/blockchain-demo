import React from 'react';
import { connect, } from 'react-redux';
import { hot, } from 'react-hot-loader';

import actions from './actions';
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
            miners,
            investors,
            totalBtc,
            transactions,
            handleNewMiner,
            handleNewInvestor,
            activeBlock,
            activeMiner,
            activeInvestor,
            activateBlock,
            activateMiner,
            activateInvestor,
        } = this.props;
        return (
            <div id="app">
                <header>
                    <Dashboard.view {...{
                        blocks,
                        miners,
                        investors,
                        totalBtc,
                        transactions,
                    }} />
                </header>
                <nav>
                    <Navigator.view options={[{
                        name: 'Add Miner',
                        func: handleNewMiner,
                    }, {
                        name: 'Add Investor',
                        func: handleNewInvestor,
                    },]} />
                </nav>
                <div className="miner-list-area">
                    <MinerList.view {...{
                        miners,
                        activeMiner,
                        activateMiner,
                    }} />
                </div>
                <div className="miner-details-area">
                    <MinerDetails.view {...{
                        activeBlock,
                        activateBlock,
                        miner: miners.find(miner => miner.id === activeMiner),
                        blocks: blocks.filter(block => block.miner === activeMiner),
                    }} />
                </div>
                <div className="investor-list-area">
                    <InvestorList.view {...{
                        investors,
                        activeInvestor,
                        activateInvestor,
                    }} />
                </div>
                <div className="investor-details-area">
                    <InvestorDetails.view {...{
                        activeBlock,
                        activateBlock,
                        investor: investors.find(investor => investor.id === activeInvestor),
                        blocks: blocks.filter(block => {
                            return block.transacs.find(transac => transac.from === activeInvestor || transac.to === activeInvestor) !== undefined;
                        }),
                    }} />
                </div>
                <div className="transaction-list-area">
                    <Transactions.view transactions={transactions} />
                </div>
                <div className="blockchain-info-area">
                    <Blockchain.view {...{
                        blocks,
                        activeBlock,
                        activateBlock,
                    }} />
                </div>
                <div className="block-details-area">
                    <BlockDetails.view
                        block={blocks.find(block => block.hash === activeBlock)} />
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
    activeMiner: state.activeMiner,
    activeInvestor: state.activeInvestor,
});
const mapDispatchToProps = dispatch => ({
    handleNewMiner: () => dispatch(actions.miner.new.flag()),
    handleNewInvestor: () => dispatch(actions.investor.new.flag()),
    activateBlock: hash => hash |> actions.block.activate |> dispatch,
    activateMiner: id => id |> actions.miner.activate |> dispatch,
    activateInvestor: id => id |> actions.investor.activate |> dispatch,
});

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(App));
