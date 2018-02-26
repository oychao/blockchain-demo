class Participant {
    constructor(id, worker) {
        if (Participant === this.constructor) {
            throw new Error('Cannot instantiate abstract class');
        }
        if (!worker instanceof Worker) {
            throw new Error('Worker not given');
        }
        this._id = id;
        this.worker = worker;
    }
}

export default Participant;
