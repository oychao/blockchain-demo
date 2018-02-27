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
        const miner = new Miner(id++, store.chain)
        this.pool.registerMiner(miner);
        Object.keys(this.pool.miners).forEach(k => {
            const m = this.pool.miners[k];
            miner.acquaint(m);
            m.acquaint(miner);
        });
    }

    /**
     * oops! a new investor poped up in the network all of a sudden
     */
    popupInvestor() {
        const investor = new Investor(id++);
        this.pool.registerInvestor(investor);
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
