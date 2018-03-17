import Chain from 'business/chain';
import * as actionTypes from './actionTypes';

const reducer = (state = {
    miners: [],
    investors: [],
    transactions: {},
    blocks: [],
    activeBlock: undefined,
}, action) => {
    const { type, payload, } = action;
    let {
        miners,
        investors,
        transactions,
        blocks,
        activeBlock,
    } = state;
    let totalBtc = 0;
    let newMinerFlag = undefined;
    let newInvestorFlag = undefined;
    switch (type) {
        case actionTypes.BLOCK_ADD:
            blocks = blocks.slice();
            blocks.push(payload);
            break;
        case actionTypes.BLOCK_ACTIVATE:
            activeBlock = payload;
            break;
        case actionTypes.MINER_ADD:
            miners = miners.slice();
            newMinerFlag = undefined;
            miners.push(payload);
            break;
        case actionTypes.MINER_NEW_FLAG:
            newMinerFlag = true;
            break;
        case actionTypes.INVESTOR_ADD:
            investors = investors.slice();
            newInvestorFlag = undefined;
            investors.push(payload);
            break;
        case actionTypes.INVESTOR_NEW_FLAG:
            newInvestorFlag = true;
            break;
        case actionTypes.INVESTORS_RESET:
            investors = payload.slice();
            break;
        case actionTypes.TRANSACTION_ADD:
            transactions = Object.assign({}, transactions);
            transactions[payload.hash] = payload;
            break;
        case actionTypes.TRANSACTION_DEL:
            transactions = Object.assign({}, transactions);
            delete transactions[payload];
            break;
        case actionTypes.TRANSACTION_DEL_BATCH:
            transactions = Object.assign({}, transactions);
            payload.forEach(hash => delete transactions[hash]);
            break;
        default: ;
    }
    totalBtc = investors.reduce((acc, investor) => acc + investor.balance, totalBtc);
    return {
        miners,
        investors,
        totalBtc,
        transactions,
        blocks,
        activeBlock,
        newMinerFlag,
        newInvestorFlag,
    };
};

export default reducer;
