import PromiseWorker from 'promise-worker-bi';

class Participant {
    constructor(id, worker) {
        if (Participant === this.constructor) {
            throw new Error('Cannot instantiate abstract class');
        }
        if (!worker instanceof Worker) {
            throw new Error('Worker not given');
        }
        this._id = id;
        this.pWorker = new PromiseWorker(worker);
        this.pWorker.register(action => this[action.type](action.payload));
    }
}

export default Participant;
