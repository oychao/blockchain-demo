import * as actionTypes from './actionTypes';

export const addBlock = block => ({
    type: actionTypes.BLOCK_ADD,
    payload: block
});

export const addMiner = miner => ({
    type: actionTypes.MINER_ADD,
    payload: miner
});

export const addInvestor = investor => ({
    type: actionTypes.INVESTOR_ADD,
    payload: investor
});

export const addTransaction = transaction => ({
    type: actionTypes.TRANSACTION_ADD,
    payload: transaction
});

export const delTransaction = hash => ({
    type: actionTypes.TRANSACTION_DEL,
    payload: hash
});
