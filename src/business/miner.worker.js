import Chain from 'business/chain';
import Block from 'business/block';
import inherit from 'utils/inherit';

const transSize = 10;

class Digger {
    constructor() {
        this.transactions = {};
    }

    init({ id, investorId, chain: { blocks } }) {
        this.id = id;
        this.investorId = investorId;
        this.chain = Reflect.construct(Chain, [blocks]);
    }

    startMining() {
        this.block = new Block(this.id, this.getTransactions(), this.chain.lastBlock());
        this.timer = setInterval(() => {
            if (this.chain.isValidBlock(this.block)) {
                this.chain.accept(this.block);
                this.broadcast(this.block);
                postMessage({
                    type: 'queryTransactions',
                    payload: transSize
                });
                this.stopMining();
            } else {
                this.block.calcHash(this.chain.lastBlock());
            }
        }, 1);
    }

    getTransactions() {
        const ks = Object.keys(this.transactions);
        return [{
            to: this.investorId,
            value: Chain.initReward * (.5 ** Math.floor((this.chain.lastBlock().index + 1) / Chain.binThreshold))
        }].concat(ks.map(k => this.transactions[k]));
    }

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
            postMessage({
                type: 'queryPeer'
            });
            throw new Error(`${this.id} ${e.message}`);
        } finally {
            postMessage({
                type: 'queryTransactions',
                payload: transSize
            });
            this.stopMining();
        }
    }

    receiveBlocks(blocks) {
        this.chain.blocks = blocks;
    }

    /**
     * set new transactions from miner
     * @param {Object} transacs 
     */
    receiveTransactions(transacs) {
        transacs.forEach(transac => this.transactions[transac.hash] = transac);
        this.startMining();
    }

    queryBlocks(minerId) {
        postMessage({
            type: 'getBlocks',
            payload: {
                minerId,
                blocks: this.chain.blocks
            }
        });
    }

    broadcast(block) {
        postMessage({
            type: 'broadcast',
            payload: block
        });
    }
}

const digger = new Digger();

onmessage = e => void digger[e.data.type](e.data.payload);
