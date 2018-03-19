import * as actionTypes from './actionTypes';

export const addBlock = block => ({
    type: actionTypes.BLOCK_ADD,
    payload: block,
});

export const activeBlock = hash => ({
    type: actionTypes.BLOCK_ACTIVATE,
    payload: hash,
});

export const addMiner = miner => ({
    type: actionTypes.MINER_ADD,
    payload: {
        id: miner,
    },
});

export const newMinerFlag = () => ({
    type: actionTypes.MINER_NEW_FLAG,
});

export const activateMiner = id => ({
    type: actionTypes.MINER_ACTIVATE,
    payload: id,
});

export const addInvestor = investor => ({
    type: actionTypes.INVESTOR_ADD,
    payload: investor,
});

export const newInvestorFlag = () => ({
    type: actionTypes.INVESTOR_NEW_FLAG,
});

export const activateInvestor = id => ({
    type: actionTypes.INVESTOR_ACTIVATE,
    payload: id,
});

export const resetInvestors = investors => ({
    type: actionTypes.INVESTORS_RESET,
    payload: investors,
});

export const addTransaction = transaction => ({
    type: actionTypes.TRANSACTION_ADD,
    payload: transaction,
});

export const delTransaction = hash => ({
    type: actionTypes.TRANSACTION_DEL,
    payload: hash,
});

export const delTransactionBatch = hashes => ({
    type: actionTypes.TRANSACTION_DEL_BATCH,
    payload: hashes,
});
