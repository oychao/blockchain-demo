import React from 'react';

import './style.css';

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
        const { blocks } = this.props;
        return (
            <div className="block">
                <h3>Blockchain</h3>
                <ul>
                    {blocks.reverse().map(({ index, miner, nonce, hash, prevHash, transacs }) =>
                        <li key={hash}>{index} - {hash.slice(0, 30)}</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Block;
