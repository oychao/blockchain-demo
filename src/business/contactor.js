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
        if(!id) {
            console.log('id not given');
            return;
        }
        const miner = new Miner(id, store.chain, block => {
            console.log(block.index, block.payload.minerId, block.hash);
            this.miners.forEach(m => {
                if(m !== miner) {
                    m.receive(block);
                }
            });
        });
        this.miners.push(miner);
    }
}

export default Contactor;
