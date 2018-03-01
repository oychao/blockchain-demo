import Participant from 'business/participant';
import Chain from 'business/chain';
import Worker from 'business/miner.worker';
import Investor from 'business/investor';
import Block from 'business/block';
import inherit from 'utils/inherit';

class Miner extends Participant {
    constructor(id, investor, chain) {
        super(id, new Worker());
        this.investor = new Investor(id);
        this.id = `miner-${id}`;

        this.pWorker.postMessage({
            type: 'init',
            payload: { chain, id: this.id, investorId: investor.id }
        });
        this.pWorker.postMessage({
            type: 'startMining'
        });

        this.peers = [];
        this.refreshing = false;
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
        // this.printInfo();
        this.pool.receiveBlock(block);
        this.peers.forEach(m => {
            m.receive(block);
        });
        return this.pool.getTransactions(Chain.transSize);
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
     * receive a new block from other miner
     * @param {Block} block 
     */
    receive(block) {
        this.pWorker.postMessage({
            type: 'receiveBlock',
            payload: block
        }).catch(err => {
            this.queryPeer(block.miner);
            throw err;
        });
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
        peer.queryBlocks(this.id).then(blocks => {
            this.pWorker.postMessage({
                type: 'receiveBlocks',
                payload: { blocks, transacs: this.pool.getTransactions(Chain.transSize) }
            });
        });
    }

    /**
     * queried by someone whose chain is outdate for refreshing their chain,
     * return a promise
     * @param {String} minerId 
     */
    queryBlocks(minerId) {
        return this.pWorker.postMessage({
            type: 'queryBlocks',
            payload: minerId
        })
    }

    /**
     * return new transactions to digger
     */
    queryTransactions() {
        this.worker.postMessage({
            type: 'receiveTransactions',
            payload: this.pool.getTransactions(Chain.transSize)
        });
    }

    printInfo() {
        console.log(`${this.id.toUpperCase()}:`);
        console.log(block.toString());
        // console.log(block.miner, block.index);
    }
}

export default Miner;
