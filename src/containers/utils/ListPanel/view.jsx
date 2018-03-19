import React from 'react';

import './style.css';

class ListPanel extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { children, } = this.props;
        return (
            <div ref={_ => void (this.container = _)} className="list-panel">
                {children}
            </div>
        );
    }

    componentDidUpdate() {
        this.container.scrollTop = this.container.scrollHeight;
    }
}

export default ListPanel;
