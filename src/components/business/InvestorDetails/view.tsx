import * as React from 'react';

import './style.css';

import ListPanel from 'comps/utils/ListPanel';
import BlockList from 'comps/business/BlockList';

class InvestorDetails extends React.Component {
  props: any;
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate({ investor, blocks, activeBlock }, nextState) {
    return (
      !this.props.investor ||
      this.props.blocks.length !== blocks.length ||
      this.props.activeBlock !== activeBlock ||
      this.props.investor.id !== investor.id
    );
  }

  render() {
    const { investor, blocks, activeBlock, activateBlock } = this.props;
    const reward = !!blocks
      ? blocks.reduce((acc, block) => acc + block.transacs[0].value, 0)
      : 0;
    const transacCount = investor
      ? blocks.reduce((acc, block) => {
          const curCount = block.transacs.reduce((acc2, transac) => {
            return (
              acc2 +
              (transac.from === investor.id || transac.to === investor.id
                ? 1
                : 0)
            );
          }, 0);
          return curCount + acc;
        }, 0)
      : 0;
    const children = investor ? (
      <>
        <BlockList.view {...{ blocks, activeBlock, activateBlock }} />
        <hr />
        <span>Investor Id:</span>
        <span>{investor.id}</span>
        <br />
        <span>Block Count:</span>
        <span>{blocks.length}</span>
        <br />
        <span>Transaction Count:</span>
        <span>{transacCount}</span>
        <br />
        <span>Balance in Chain:</span>
        <span className="gold">{investor.balance}</span>
      </>
    ) : null;
    return (
      <div className="investor-details">
        <h3>Investor Details</h3>
        <ListPanel.view>{children}</ListPanel.view>
      </div>
    );
  }
}

export default InvestorDetails;
