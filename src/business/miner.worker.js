import Chain from 'business/chain';
import Block from 'business/block';
import inherit from 'utils/inherit';

const transSize = 3;

class Digger {
    constructor() {
        this.transPool = [];
    }

    init({ id, chain: { blocks } }) {
        this.id = id;
        this.chain = Reflect.construct(Chain, [blocks]);
    }

    startMining() {
        this.block = new Block(this.id, this.getTransactions(), this.chain.lastBlock());
        this.timer = setInterval(() => {
            if (this.chain.isValidBlock(this.block)) {
                this.chain.accept(this.block);
                this.broadcast(this.block);
                this.block = new Block(this.id, this.getTransactions(), this.chain.lastBlock());
            } else {
                this.block.calcHash(this.chain.lastBlock());
            }
        }, 1);
    }

    getTransactions() {
        return [{
            from: 'btc',
            to: this.id,
            value: Chain.initReward * (.5 ** Math.floor((this.chain.lastBlock().index + 1) / Chain.binThreshold))
        }];
    }

    stopMining() {
        clearInterval(this.timer);
    }

    receiveBlock(block) {
        try {
            this.chain.accept(block);
            this.block.transactions = this.getTransactions();
            this.block.nonce = 0;
        } catch (e) {
            this.stopMining();
            postMessage({
                type: 'queryPeer'
            });
            throw new Error(`${this.id} ${e.message}`);
        }
    }

    receiveBlocks(blocks) {
        this.chain.blocks = blocks;
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
