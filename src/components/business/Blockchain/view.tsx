import * as React from 'react';

import './style.css';

import ListPanel from 'comps/utils/ListPanel';
import BlockList from 'comps/business/BlockList';

class Blockchain extends React.Component {
  props: any;
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate({ blocks, activeBlock }, nextState) {
    return (
      this.props.blocks.length !== blocks.length ||
      this.props.activeBlock !== activeBlock
    );
  }

  render() {
    return (
      <div className="block">
        <h3>Blockchain</h3>
        <ListPanel.view>
          <BlockList.view {...this.props} />
        </ListPanel.view>
      </div>
    );
  }
}

export default Blockchain;
