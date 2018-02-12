import Participant from 'business/participant';
import Worker from 'business/miner.worker';

class Miner extends Participant {
    constructor(id, name, chain) {
        super(id, name, new Worker());
        this.worker.postMessage({
            type: 'init',
            payload: { id, name, chain }
        });
    }

    listen(msg) {
        this.worker.postMessage({
            type: 'listen',
            payload: 'hello worker'
        });
    }

    announce() { }
}

export default Miner;
