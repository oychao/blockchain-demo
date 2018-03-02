import store from 'store';
import Miner from 'business/miner';
import Investor from 'business/investor';
import exchange from 'business/exchange';

if (!global.Worker) {
    throw new TypeError('Please update your browser to support Web Worker');
}

let id = 1;

/**
 * Contactor act like network in real world
 */
class Contactor {
    constructor() { }

    registerExchange(exchange) {
        this.exchange = exchange;
    }

    /**
     * oops! a new miner poped up in the network all of a sudden,
     * new miner must be registered before new investor, otherwise there will
     * be a infinite call loop
     */
    popupMiner() {
        const investor = this.popupInvestor(id);
        const miner = new Miner(`miner-${id++}`, investor, exchange.chain);
        this.exchange.registerMiner(miner);
        miner.registerExchange(this.exchange);
        this.exchange.registerInvestor(investor);
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
        const isMiner = _id !== undefined;
        _id = do {
            if (_id === undefined) {
                id++;
            } else {
                _id;
            }
        };
        const investor = new Investor(`investor-${_id}`);
        if (!isMiner) {
            this.exchange.registerInvestor(investor);
        }
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
}

const contactor = new Contactor();
contactor.registerExchange(exchange);

store.subscribe(() => {
    const { newMinerFlag, newInvestorFlag } = store.getState();
    if (newMinerFlag) {
        contactor.popupMiner();
    }
    if (newInvestorFlag) {
        contactor.popupInvestor();
    }
});

export default contactor;
