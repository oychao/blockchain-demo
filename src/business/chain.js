import Block from 'business/block';
import Transaction from 'business/transaction';

const difficulty = 3;

const initReward = 50;
const binThreshold = 10;
const transSize = 10;

class Chain {
    constructor(blocks) {
        if (blocks) {
            this.blocks = blocks;
        } else {
            this.blocks = [];
            const block = new Block('Genesis Block', [new Transaction(
                undefined, '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', initReward,
                'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks')]);
            while (!this.validDiffculty(block)) {
                block.calcHash();
            }
            this.blocks.push(block);
        }
    }

    isValidBlock(block) {
        const prev = this.lastBlock();
        return this.validDiffculty(block) &&
            prev.hash === block.prevHash &&
            prev.index === block.index - 1;
    }

    lastBlock() {
        return this.blocks[this.blocks.length - 1] || this.blocks[0];
    }

    accept(block) {
        const prev = this.lastBlock();
        if (this.isValidBlock(block)) {
            this.blocks.push(block);
            return true;
        } else if (prev.index > block.index - 1) {
            return true;
        } else if (prev.index < block.index - 1) {
            throw new Error('outdate chain');
        } else {
            throw new Error('conflict block');
        }
    }

    validDiffculty(block) {
        if (!block || !block.hash) {
            return false;
        }
        for (let i = 0; i < difficulty; i++) {
            if (block.hash.charAt(i) !== '0') {
                return false;
            }
        }
        return true;
    }

    /**
     * apply callback onto all transactions in the chain
     * @param {Function} callback 
     */
    iterTrans(callback) {
        this.blocks.forEach(block => block.transacs.forEach(trans => callback.call(null, trans)));
    }
}

Chain.initReward = initReward;
Chain.binThreshold = binThreshold;
Chain.transSize = 10;

export default Chain;
