import Participant from 'business/participant';
import Chain from 'business/chain';

class Pool extends Participant {
    constructor() {
        this.miners = [];
    }

    receiveBlock(block) { }

    receiveTransaction(trans) { }

    registerMiner(miner) {
        if (this.miners.indexOf(miner) === -1) {
            this.miners.push(miner);
        }
    }

    getTransactions(num) {
        if (!num) {
            return this.transactions;
        } else {
            return this.transactions.slice(0, 3);
        }
    }

    broadcastTransaction() { }
}
