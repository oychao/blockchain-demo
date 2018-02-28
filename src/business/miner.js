import Participant from 'business/participant';
import Worker from 'business/miner.worker';
import Investor from 'business/investor';
import Block from 'business/block';
import inherit from 'utils/inherit';

class Miner extends Participant {
    constructor(id, investor, chain) {
        super(id, new Worker());
        this.investor = new Investor(id);
        this.id = `miner-${id}`;

        this.worker.onmessage = e => {
            this[e.data.type](e.data.payload);
        };
        this.worker.postMessage({
            type: 'init',
            payload: { chain, id: this.id, investorId: investor.id }
        });
        this.worker.postMessage({
            type: 'startMining'
        });

        this.peers = [];
        this.refreshing = false;
        this.peerQueryCallbacks = {};
        this.transactions = [];
    }

    /**
     * register a pool for getting transactions
     * @param {Pool} pool 
     */
    registerPool(pool) {
        this.pool = pool;
    }

    /**
     * broadcast a new block to all miners
     * @param {Block} block 
     */
    broadcast(block) {
        inherit(block, Block);
        console.log(`${this.id.toUpperCase()}:`);
        console.log(block.toString());
        // console.log(block.miner, block.index);
        this.pool.receiveBlock(block);
        this.peers.forEach(m => {
            m.receive(block);
        });
    }

    /**
     * receive a new block from other miner
     * @param {Block} block 
     */
    receive(block) {
        this.worker.postMessage({
            type: 'receiveBlock',
            payload: block
        });
    }

    /**
     * store a miner for contacting
     * @param {Miner} miner 
     */
    acquaint(miner) {
        if (miner === this) {
            return;
        }
        if (this.peers.indexOf(miner) === -1) {
            this.peers.push(miner);
        }
    }

    /**
     * blocks in  the are outdate, query other miner for refreshing chain
     * @param {String} minerId if given, query specific miner, otherwise query a random one
     */
    queryPeer(minerId) {
        let peer = this.peers[Math.floor(Math.random() * this.peers.length)];
        if (minerId) {
            peer = this.peers.find(p => p.id === minerId) || peer;
        }
        if (!peer) {
            throw new Error('No valid miner');
        }
        peer.queryBlocks(this.id, blocks => {
            this.worker.postMessage({
                type: 'receiveBlocks',
                payload: blocks
            });
        });
    }

    /**
     * queried by someone whose chain is outdate for refreshing their chain
     * @param {String} minerId 
     * @param {Function} callback 
     */
    queryBlocks(minerId, callback) {
        if (minerId === 'pool') {
            this.poolQueryCallback = callback;
        } else {
            this.peerQueryCallbacks[minerId] = callback;
        }
        this.worker.postMessage({
            type: 'queryBlocks',
            payload: minerId
        });
    }

    /**
     * handle callback registered by specific miner after fetching blocks from digger
     * @param {Object} param0
     */
    handleQueryBlockCallback({ minerId, blocks }) {
        try {
            if (minerId === 'pool') {
                this.poolQueryCallback ?.call(null, blocks);
                delete this.poolQueryCallback;
            } else {
                this.peerQueryCallbacks[minerId] ?.call(null, blocks);
                delete this.peerQueryCallbacks[minerId];
            }
        } catch (e) {
            throw e;
        }
    }

    /**
     * return new transactions to digger
     * @param {Number} num transaction count
     */
    queryTransactions(num) {
        this.worker.postMessage({
            type: 'receiveTransactions',
            payload: this.pool.getTransactions(num)
        });
    }
}

export default Miner;
