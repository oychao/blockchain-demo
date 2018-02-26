import Participant from 'business/participant';
import Worker from 'business/miner.worker';

class Miner extends Participant {
    constructor(id, chain) {
        super(id, new Worker());
        this.worker.postMessage({
            type: 'init',
            payload: { id, chain }
        });
        this.worker.onmessage = e => {
            this[e.data.type](e.data.payload);
        };
        this.peers = [];
        this.worker.postMessage({
            type: 'start'
        });
        this.refreshing = false;
        this.queryTransactions = {};
    }

    broadcast(block) {
        console.log(block.index, block.payload.minerId, block.nonce,
            block.prevHash.slice(0, 10), block.hash.slice(0, 10),);
        this.peers.forEach(m => {
            m.receive(block);
        });
    }

    receive(block) {
        this.worker.postMessage({
            type: 'receive',
            payload: block
        });
    }

    acquaint(miner) {
        if (miner === this) {
            return;
        }
        if (this.peers.indexOf(miner) === -1) {
            this.peers.push(miner);
        }
    }

    queryPeer() {
        const randPeer = this.peers[Math.floor(Math.random() * this.peers.length)];
        if (!randPeer) {
            throw new Error('No valid miner');
        }
        randPeer.queryBlocks(this.id, blocks => {
            this.worker.postMessage({
                type: 'receiveBlocks',
                payload: blocks
            });
        });
    }

    queryBlocks(minerId, callback) {
        this.queryTransactions[minerId] = callback;
        this.worker.postMessage({
            type: 'queryBlocks',
            payload: minerId
        });
    }

    getBlocks({ minerId, blocks }) {
        try {
            this.queryTransactions[minerId].call(null, blocks);
            delete this.queryTransactions[minerId];
        } catch (e) {
            throw e;
        }
    }
}

export default Miner;
