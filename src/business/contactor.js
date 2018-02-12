if (!global.Worker) {
    throw new TypeError('Please update your browser to support web worker');
}

class Contactor {
    constructor() {
        this.workers = [];
    }

    create() {

    }
}

export default Contactor;
