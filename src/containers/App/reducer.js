import Chain from 'business/chain';
import * as actionTypes from './actionTypes';

const reducer = (state = {
    blocks: [],
    miners: [],
    investors: [],
    transactions: {}
}, action) => {
    const { type, payload } = action;
    let { blocks, miners, investors, transactions } = state;
    switch (type) {
        case actionTypes.BLOCK_ADD:
            blocks = blocks.slice();
            blocks.push(payload);
            break;
        case actionTypes.MINER_ADD:
            miners = miners.slice();
            miners.push(payload);
            break;
        case actionTypes.INVESTOR_ADD:
            investors = investors.slice();
            investors.push(payload);
            break;
        case actionTypes.TRANSACTION_ADD:
            transactions = Object.assign({}, transactions);
            transactions[payload.hash] = payload;
            break;
        case actionTypes.TRANSACTION_DEL:
            transactions = Object.assign({}, transactions);
            delete transactions[payload];
            break;
        default: ;
    }
    return { blocks, miners, investors, transactions };
};

export default reducer;
