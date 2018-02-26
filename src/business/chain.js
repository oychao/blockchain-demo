import Block from 'business/block';

const difficulty = 2;

class Chain {
    constructor(blocks) {
        if (blocks) {
            this.blocks = blocks;
        } else {
            this.blocks = [];
            const block = new Block('Genesis Block', 'hello_block_chain');
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
            return false;
        } else {
            throw new Error('invalid block');
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

    print() {
        this.blocks.forEach(b => void console.log(b));
    }
}

export default Chain;
