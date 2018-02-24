import Participant from 'business/participant';
import Worker from 'business/miner.worker';

class Miner extends Participant {
    constructor(id, name, chain, broadcast) {
        super(id, name, new Worker());
        this.worker.postMessage({
            type: 'init',
            payload: { id, name, chain }
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

    announce(payload) {
        console.log(payload);
    }
}

export default Miner;
