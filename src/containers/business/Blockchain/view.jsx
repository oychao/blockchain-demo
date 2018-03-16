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
            <div ref={_ => void (this.container = _)} className="block">
                <h3>Blockchain</h3>
                <ul className="odd-even-list">
                    {blocks.map(({ index, miner, nonce, hash, prevHash, transacs }) =>
                        <li key={hash}>{index} - {hash.slice(0, 30)}</li>
                    )}
                </ul>
            </div>
        );
    }

    componentDidUpdate() {
        this.container.scrollTop = this.container.scrollHeight;
    }
}

export default Block;
