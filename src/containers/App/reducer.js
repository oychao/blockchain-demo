/**
 * not suitable for using handleActions of redux-actions,
 * for totalBtc need to be calculated every time.
 */
// import { handleActions } from 'redux-actions';
import produce from 'immer';

import Chain from 'business/chain';
import * as actionTypes from './actionTypes';

const reducer = (state = {
    miners: [],
    investors: [],
    transactions: {},
    blocks: [],
    totalBtc: 0,
    newMinerFlag: undefined,
    newInvestorFlag: undefined,
    activeBlock: undefined,
    activeMiner: undefined,
    activeInvestor: undefined,
}, action) => {
    const { type, payload, } = action;
    const next = produce(state, draft => {
        draft.totalBtc = 0;
        switch (type) {
            case actionTypes.BLOCK_ADD:
                draft.blocks.push(payload.block);
                break;
            case actionTypes.BLOCK_ACTIVATE:
                draft.activeBlock = payload.hash;
                break;
            case actionTypes.MINER_ADD:
                draft.newMinerFlag = undefined;
                draft.miners.push(payload.miner);
                break;
            case actionTypes.MINER_NEW_FLAG:
                draft.newMinerFlag = true;
                break;
            case actionTypes.MINER_ACTIVATE:
                draft.activeMiner = payload.id;
                break;
            case actionTypes.INVESTOR_ADD:
                draft.newInvestorFlag = undefined;
                draft.investors.push(payload.investor);
                break;
            case actionTypes.INVESTOR_NEW_FLAG:
                draft.newInvestorFlag = true;
                break;
            case actionTypes.INVESTOR_ACTIVATE:
                draft.activeInvestor = payload.id;
                break;
            case actionTypes.INVESTORS_RESET:
                draft.investors = payload.investors;
                break;
            case actionTypes.TRANSACTION_ADD:
                draft.transactions[payload.transaction.hash] = payload.transaction;
                break;
            case actionTypes.TRANSACTION_DEL:
                delete draft.transactions[payload.hash];
                break;
            case actionTypes.TRANSACTION_DEL_BATCH:
                payload.hashes.forEach(hash => delete draft.transactions[hash]);
                break;
            default: ;
        }
        draft.totalBtc = draft.investors.reduce((acc, investor) => acc + investor.balance, draft.totalBtc);
        draft.totalBtc = draft.totalBtc !== draft.totalBtc ? '≈100' : draft.totalBtc;
    });
    return next;
};

export default reducer;
