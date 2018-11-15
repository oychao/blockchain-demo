import PromiseWorker from 'promise-worker-bi';

abstract class Participant {
  _id: string;
  pWorker: any;
  constructor(id: string, worker: Worker) {
    this._id = id;
    this.pWorker = new PromiseWorker(worker);
    this.pWorker.register(action => this[action.type](action.payload));
  }
}

export default Participant;
