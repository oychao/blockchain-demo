import Participant from 'business/participant';
import Worker from 'business/miner.worker';

class Miner extends Participant {
    constructor(id, chain, broadcast) {
        super(id, new Worker());
        this.worker.postMessage({
            type: 'init',
            payload: { id, chain }
        });
        this.worker.onmessage = e => {
            this[e.data.type](e.data.payload);
        };
        this.broadcast = broadcast;
        this.worker.postMessage({
            type: 'start'
        });
    }

    listen(msg) {
        this.worker.postMessage({
            type: 'listen',
            payload: 'hello worker'
        });
    }

    receive(block) {
        this.worker.postMessage({
            type: 'receive',
            payload: block
        });
    }
}

export default Miner;
