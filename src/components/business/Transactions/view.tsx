import * as React from 'react';

import './style.css';

import ListPanel from 'comps/utils/ListPanel';

class Transactions extends React.PureComponent {
  props: any;

  constructor(props: any) {
    super(props);
  }

  render() {
    const { transactions } = this.props;
    return (
      <div className="transactions">
        <h3>Transactions in Exchange</h3>
        <ListPanel.view>
          <ul className="odd-even-list">
            {Object.values(transactions).map(({ hash, from, to, value }) => (
              <li key={hash}>
                {from} -> {to}: {value}
              </li>
            ))}
          </ul>
        </ListPanel.view>
      </div>
    );
  }
}

export default Transactions;
