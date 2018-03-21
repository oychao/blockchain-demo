import React from 'react';

import './style.css';

import ListPanel from 'containers/utils/ListPanel';

class BlockDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const currBlock = this.props.block;
        const nextBlock = nextProps.block;
        return !currBlock || currBlock.hash !== nextBlock.hash;
    }

    render() {
        const { block, } = this.props;
        return (
            <div className="block-details">
                <h3>Block Details</h3>
                <ListPanel.view>
                    <div style={{ whiteSpace: 'pre', }}>
                        {JSON.stringify(block, null, 2)}
                    </div>
                </ListPanel.view>
            </div>
        );
    }
}

export default BlockDetails;
