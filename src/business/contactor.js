import store from 'store';
import Miner from 'business/miner';

if (!global.Worker) {
    throw new TypeError('Please update your browser to support web worker');
}

class Contactor {
    constructor() {
        this.miners = [];
    }

    create(id, name) {
        if(!id) {
            console.log('id not given');
            return;
        }
        const miner = new Miner(id, Math.random(), store.chain, block => {
            this.miners.forEach(m => {
                if(m !== miner) {
                    
                }
            });
        });
        this.miners.push(miner);
    }
}

export default Contactor;
