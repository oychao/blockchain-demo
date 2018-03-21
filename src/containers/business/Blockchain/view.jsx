import React from 'react';

import './style.css';

import ListPanel from 'containers/utils/ListPanel';
import BlockList from 'containers/business/BlockList';

class Blockchain extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate({ blocks, activeBlock, }, nextState) {
        return this.props.blocks.length !== blocks.length ||
            this.props.activeBlock !== activeBlock;
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
