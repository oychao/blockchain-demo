import Miner from 'business/miner';
import Investor from 'business/investor';
import exchange from 'business/exchange';

if (!global.Worker) {
    throw new TypeError('Please update your browser to support Web Worker');
}

let id = 0;

/**
 * Contactor act like network in real world
 */
class Contactor {
    constructor(exchange) {
        this.exchange = exchange;
    }

    /**
     * oops! a new miner poped up in the network all of a sudden
     */
    popupMiner() {
        const investor = this.popupInvestor(id);
        const miner = new Miner(id++, investor, exchange.chain);
        this.exchange.registerMiner(miner);
        miner.registerExchange(this.exchange);
        Object.keys(this.exchange.miners).forEach(k => {
            const m = this.exchange.miners[k];
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
        _id = do {
            if (_id === undefined) {
                id++;
            } else {
                _id;
            }
        };
        const investor = new Investor(_id);
        this.exchange.registerInvestor(investor);
        return investor;
    }

    /**
     * get miner count in the exchange
     */
    getMinerLen() {
        return this.exchange.getMinerLen();
    }

    /**
     * get investor count in the exchange
     */
    getInvestorLen() {
        return this.exchange.getInvestorLen();
    }

    /**
     * start demostrating
     */
    startDemostrating() {
        for (let i = 0; i < 2; i++) {
            this.popupMiner();
        }
        for (let i = 0; i < 0; i++) {
            this.popupMiner();
        }
    }
}

const contactor = new Contactor(exchange);
contactor.startDemostrating();

export default contactor;
