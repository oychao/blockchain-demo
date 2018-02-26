import store from 'store';
import Miner from 'business/miner';
import Pool from 'business/pool';

if (!global.Worker) {
    throw new TypeError('Please update your browser to support Web Worker');
}

class Contactor {
    constructor() {
        this.miners = [];
        this.pools = [];
    }

    createMiner(id) {
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
