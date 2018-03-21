import { handleActions } from 'redux-actions';
import produce from 'immer';

import Chain from 'business/chain';
import * as actionTypes from './actionTypes';

const defaultState = {
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
};
const reducer = handleActions({
    [actionTypes.BLOCK_ADD]: (state, { payload, }) => produce(state, draft => {
        draft.blocks.push(payload.block);
        draft.totalBtc = 0;
        draft.totalBtc = draft.blocks.reduce((acc, block) => acc + block.transacs[0].value, draft.totalBtc);
        draft.totalBtc = draft.totalBtc !== draft.totalBtc ? '≈100' : draft.totalBtc;
        return draft;
    }),
    [actionTypes.BLOCK_ACTIVATE]: (state, { payload, }) => produce(state, draft => {
        draft.activeBlock = payload.hash;
        return draft;
    }),
    [actionTypes.MINER_ADD]: (state, { payload, }) => produce(state, draft => {
        draft.newMinerFlag = undefined;
        draft.miners.push(payload.miner);
        return draft;
    }),
    [actionTypes.MINER_NEW_FLAG]: (state, { payload, }) => produce(state, draft => {
        draft.newMinerFlag = true;
        return draft;
    }),
    [actionTypes.MINER_ACTIVATE]: (state, { payload, }) => produce(state, draft => {
        draft.activeMiner = payload.id;
        return draft;
    }),
    [actionTypes.INVESTOR_ADD]: (state, { payload, }) => produce(state, draft => {
        draft.newInvestorFlag = undefined;
        draft.investors.push(payload.investor);
        return draft;
    }),
    [actionTypes.INVESTOR_NEW_FLAG]: (state, { payload, }) => produce(state, draft => {
        draft.newInvestorFlag = true;
        return draft;
    }),
    [actionTypes.INVESTOR_ACTIVATE]: (state, { payload, }) => produce(state, draft => {
        draft.activeInvestor = payload.id;
        return draft;
    }),
    [actionTypes.INVESTOR_RESET]: (state, { payload, }) => produce(state, draft => {
        draft.investors = payload.investors;
        return draft;
    }),
    [actionTypes.TRANSACTION_ADD]: (state, { payload, }) => produce(state, draft => {
        draft.transactions[payload.transaction.hash] = payload.transaction;
        return draft;
    }),
    [actionTypes.TRANSACTION_DEL]: (state, { payload, }) => produce(state, draft => {
        delete draft.transactions[payload.hash];
        return draft;
    }),
    [actionTypes.TRANSACTION_DEL_BATCH]: (state, { payload, }) => produce(state, draft => {
        payload.hashes.forEach(hash => delete draft.transactions[hash]);
        return draft;
    }),
}, defaultState);

export default reducer;
