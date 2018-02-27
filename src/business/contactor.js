import store from 'store';
import Miner from 'business/miner';
import Investor from 'business/investor';
import pool from 'business/pool';

if (!global.Worker) {
    throw new TypeError('Please update your browser to support Web Worker');
}

let id = 0;

/**
 * Contactor act like network in real world
 */
class Contactor {
    constructor(pool) {
        this.pool = pool;
    }

    /**
     * oops! a new miner poped up in the network all of a sudden
     */
    popupMiner() {
        const investor = this.popupInvestor(id);
        const miner = new Miner(id++, investor, store.chain);
        this.pool.registerMiner(miner);
        miner.registerPool(this.pool);
        Object.keys(this.pool.miners).forEach(k => {
            const m = this.pool.miners[k];
            miner.acquaint(m);
            m.acquaint(miner);
        });
        return miner;
    }

    /**
     * oops! a new investor poped up in the network all of a sudden
     * @param {Number} _id ${id} if not given
     */
    popupInvestor(_id) {
        _id = _id || id++;
        const investor = new Investor(_id);
        this.pool.registerInvestor(investor);
        return investor;
    }

    /**
     * get miner count in the pool
     */
    getMinerLen() {
        return this.pool.getMinerLen();
    }

    /**
     * get investor count in the pool
     */
    getInvestorLen() {
        return this.pool.getInvestorLen();
    }
}

const contactor = new Contactor(pool);

export default contactor;
