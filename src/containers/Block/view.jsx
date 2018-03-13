import React from 'react';
import { connect } from 'react-redux';

class Block extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.toggleDetails = :: this.toggleDetails;
    }
    toggleDetails() {
        this.setState({
            show: !this.state.show,
        });
    }
    render() {
        const { index, miner, nonce, hash, prevHash, transacs } = this.props;
        const { show } = this.state;
        return (
            <div className="block">
                <ul>
                    <li>{index} - {hash}</li>
                    <li>
                        <a href="javascript:;" onClick={this.toggleDetails}> {show ? 'Hide' : 'Show'} Details</a>
                    </li>
                    {show ? <>
                        <li>Miner: {miner}</li>
                        <li>Nonce: {nonce}</li>
                        <li>prev: {prevHash}</li>
                        <li>Show Transactions</li>
                    </> : null}
                </ul>
            </div>
        );
    }
}

export default Block;
