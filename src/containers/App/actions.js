import { createActions } from 'redux-actions';

import * as actionTypes from './actionTypes';

const actions = createActions({
    [actionTypes.BLOCK_ADD]: block => ({ block, }),
    [actionTypes.BLOCK_ACTIVATE]: hash => ({ hash, }),
    [actionTypes.MINER_ADD]: id => ({ miner: { id, }, }),
    [actionTypes.MINER_NEW_FLAG]: () => ({}),
    [actionTypes.MINER_ACTIVATE]: id => ({ id, }),
    [actionTypes.INVESTOR_ADD]: investor => ({ investor }),
    [actionTypes.INVESTOR_NEW_FLAG]: () => ({}),
    [actionTypes.INVESTOR_ACTIVATE]: id => ({ id, }),
    [actionTypes.INVESTOR_RESET]: investors => ({ investors, }),
    [actionTypes.TRANSACTION_ADD]: transaction => ({ transaction, }),
    [actionTypes.TRANSACTION_DEL]: hash => ({ hash, }),
    [actionTypes.TRANSACTION_DEL_BATCH]: hashes => ({ hashes, }),
});

export default actions;
