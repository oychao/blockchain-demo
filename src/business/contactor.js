import store from 'store';
import Miner from 'business/miner';

if (!global.Worker) {
    throw new TypeError('Please update your browser to support web worker');
}

class Contactor {
    constructor() {
        this.miners = [];
    }

    create(id) {
        if (!id) {
            console.log('id not given');
            return;
        }
        const miner = new Miner(id, store.chain)
        this.miners.push(miner);
        this.miners.forEach(m => {
            miner.acquaint(m);
            m.acquaint(miner);
        });
    }
}

export default Contactor;
