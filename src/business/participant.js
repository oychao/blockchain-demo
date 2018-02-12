class Participant {
    constructor(id, name, worker) {
        if (Participant === this.constructor) {
            throw new Error('Cannot instantiate abstract class');
        }
        if (!worker instanceof Worker) {
            throw new Error('Worker not given');
        }
        this.id = id;
        this.name = name;
        this.worker = worker;
    }

    listen() {
        throw new Error('Abstract method');
    }

    announce() {
        throw new Error('Abstract method');
    }

    sleep() {
        throw new Error('Abstract method');
    }
}

export default Participant;
