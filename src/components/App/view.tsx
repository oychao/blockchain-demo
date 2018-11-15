import * as React from 'react';
import { connect } from 'react-redux';

import actions from './actions';
import './style.css';

import Dashboard from 'comps/business/Dashboard';
import Navigator from 'comps/business/Navigator';
import Blockchain from 'comps/business/Blockchain';
import BlockDetails from 'comps/business/BlockDetails';
import MinerList from 'comps/business/MinerList';
import MinerDetails from 'comps/business/MinerDetails';
import InvestorList from 'comps/business/InvestorList';
import InvestorDetails from 'comps/business/InvestorDetails';
import Transactions from 'comps/business/Transactions';

class App extends React.Component {
  props: any;

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
      activateInvestor
    } = this.props;
    return (
      <div id="app">
        <header>
          <Dashboard.view
            {...{
              blocks,
              miners,
              investors,
              totalBtc,
              transactions
            }}
          />
        </header>
        <nav>
          <Navigator.view
            options={[
              {
                name: 'Add Miner',
                func: handleNewMiner
              },
              {
                name: 'Add Investor',
                func: handleNewInvestor
              }
            ]}
          />
        </nav>
        <div className="miner-list-area">
          <MinerList.view
            {...{
              miners,
              activeMiner,
              activateMiner
            }}
          />
        </div>
        <div className="miner-details-area">
          <MinerDetails.view
            {...{
              activeBlock,
              activateBlock,
              miner: miners.find(miner => miner.id === activeMiner),
              blocks: blocks.filter(block => block.miner === activeMiner)
            }}
          />
        </div>
        <div className="investor-list-area">
          <InvestorList.view
            {...{
              investors,
              activeInvestor,
              activateInvestor
            }}
          />
        </div>
        <div className="investor-details-area">
          <InvestorDetails.view
            {...{
              activeBlock,
              activateBlock,
              investor: investors.find(
                investor => investor.id === activeInvestor
              ),
              blocks: blocks.filter(block => {
                return (
                  block.transacs.find(
                    transac =>
                      transac.from === activeInvestor ||
                      transac.to === activeInvestor
                  ) !== undefined
                );
              })
            }}
          />
        </div>
        <div className="transaction-list-area">
          <Transactions.view transactions={transactions} />
        </div>
        <div className="blockchain-info-area">
          <Blockchain.view
            {...{
              blocks,
              activeBlock,
              activateBlock
            }}
          />
        </div>
        <div className="block-details-area">
          <BlockDetails.view
            block={blocks.find(block => block.hash === activeBlock)}
          />
        </div>
      </div>
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
  activeInvestor: state.activeInvestor
});
const mapDispatchToProps = dispatch => ({
  handleNewMiner: () => dispatch(actions.miner.new.flag()),
  handleNewInvestor: () => dispatch(actions.investor.new.flag()),
  activateBlock: hash => dispatch(actions.block.activate(hash)),
  activateMiner: id => dispatch(actions.miner.activate(id)),
  activateInvestor: id => dispatch(actions.investor.activate(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
