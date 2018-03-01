import PromiseWorker from 'promise-worker-bi';

import Chain from 'business/chain';
import Block from 'business/block';
import Transaction from 'business/transaction';
import inherit from 'utils/inherit';

const pWorker = new PromiseWorker();

class Digger {
    constructor() {
        this.transactions = {};
    }

    init({ id, investorId, chain: { blocks } }) {
        this.id = id;
        this.investorId = investorId;
        this.chain = Reflect.construct(Chain, [blocks]);
    }

    /**
     * start mining
     */
    startMining() {
        this.block = new Block(this.id, this.getTransactions(), this.chain.lastBlock());
        this.timer = setInterval(() => {
            try {
                if (this.chain.isValidBlock(this.block)) {
                    this.chain.accept(this.block);
                    this.broadcast(this.block);
                } else {
                    this.block.calcHash(this.chain.lastBlock());
                }
            } catch (e) {
                this.stopMining();
            }
        }, 1);
    }

    /**
     * stop mining, reset all transactions, delete working block, and clear mining timer
     */
    stopMining() {
        this.transactions = {};
        delete this.block;
        clearInterval(this.timer);
    }

    /**
     * received a block from other miners, if the block is legal,
     * reset nonce and delete all transactions in order to prevent
     * transaction rewriting, then query miner for new transactions
     * @param {Block} block 
     */
    receiveBlock(block) {
        try {
            this.chain.accept(block);
        } catch (e) {
            this.stopMining();
            throw new Error(`${this.id} ${e.message}, block index: ${this.chain.lastBlock().index}, received block from ${block.miner}`);
        }
    }

    /**
     * receive blocks from miner, set latest blocks into the chain,
     * and query miner for latest transactions
     * @param {Object} param0 
     */
    receiveBlocks({ blocks, transacs }) {
        this.chain.blocks = blocks;
        this.receiveTransactions(transacs);
    }

    /**
     * set new transactions from miner
     * @param {Object} transacs 
     */
    receiveTransactions(transacs) {
        transacs.forEach(transac => this.transactions[transac.hash] = transac);
        this.startMining();
    }

    /**
     * return transactions, the first one is always coinbase transaction
     */
    getTransactions() {
        const ks = Object.keys(this.transactions);
        return [new Transaction(undefined, this.investorId,
            Chain.initReward * (.5 ** Math.floor((this.chain.lastBlock().index + 1) / Chain.binThreshold))
        )].concat(ks.map(k => this.transactions[k]));
    }

    /**
     * return blocks in the chain when miner queried
     */
    queryBlocks() {
        return this.chain.blocks;
    }

    /**
     * send a new block to miner
     * @param {Block} block 
     */
    broadcast(block) {
        this.stopMining();
        pWorker.postMessage({
            type: 'broadcast',
            payload: block
        }).then(transacs => this.receiveTransactions(transacs));
    }
}

const digger = new Digger();

pWorker.register(action => digger[action.type](action.payload));
