import Participant from 'business/participant';
import Worker from 'business/miner.worker';
import Investor from 'business/investor';
import Block from 'business/block';
import inherit from 'utils/inherit';

class Miner extends Participant {
    constructor(id, chain) {
        super(id, new Worker());
        this.investor = new Investor(id);
        this.id = `miner-${id}`;

        this.worker.onmessage = e => {
            this[e.data.type](e.data.payload);
        };
        this.worker.postMessage({
            type: 'init',
            payload: { chain, id: this.id }
        });
        this.worker.postMessage({
            type: 'startMining'
        });

        this.peers = [];
        this.refreshing = false;
        this.peerQueries = {};
        this.transactions = [];
    }

    broadcast(block) {
        inherit(block, Block);
        console.log(block.toString());
        this.peers.forEach(m => {
            m.receive(block);
        });
    }

    receive(block) {
        this.worker.postMessage({
            type: 'receiveBlock',
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
        this.peerQueries[minerId] = callback;
        this.worker.postMessage({
            type: 'queryBlocks',
            payload: minerId
        });
    }

    getBlocks({ minerId, blocks }) {
        try {
            this.peerQueries[minerId].call(null, blocks);
            delete this.peerQueries[minerId];
        } catch (e) {
            throw e;
        }
    }
}

export default Miner;
