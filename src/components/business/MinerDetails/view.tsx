import * as React from 'react';

import './style.css';

import ListPanel from 'comps/utils/ListPanel';
import BlockList from 'comps/business/BlockList';

class MinerDetails extends React.Component {
  props: any;

  constructor(props) {
    super(props);
  }

  shouldComponentUpdate({ miner, activeBlock, blocks }, nextState) {
    return (
      !this.props.miner ||
      this.props.miner.id !== miner.id ||
      this.props.activeBlock !== activeBlock ||
      this.props.blocks.length !== blocks.length
    );
  }

  render() {
    const { miner, blocks, activeBlock, activateBlock } = this.props;
    const reward = !!blocks
      ? blocks.reduce((acc, block) => acc + block.transacs[0].value, 0)
      : 0;
    const children = miner ? (
      <>
        <BlockList.view {...{ blocks, activeBlock, activateBlock }} />
        <hr />
        <span>Miner Id:</span>
        <span>{miner.id}</span>
        <br />
        <span>Block Count:</span>
        <span>{blocks.length}</span>
        <br />
        <span>Total Reward:</span>
        <span className="gold">{reward}</span>
      </>
    ) : null;
    return (
      <div className="miner-details">
        <h3>Miner Details</h3>
        <ListPanel.view>{children}</ListPanel.view>
      </div>
    );
  }
}

export default MinerDetails;
