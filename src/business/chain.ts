import Block from 'business/block';
import Transaction from 'business/transaction';

const kamiSama: string = 'Nakamoto Satoshi';

const difficulty: number = 3;

const initReward: number = 50;
const binThreshold: number = 10;
const transSize: number = 10;

class Chain {
  static initReward: number = initReward;
  static binThreshold: number = binThreshold;
  static transSize: number = transSize;
  static kamiSama: string = kamiSama;

  blocks: Array<Block>;

  constructor(blocks?: Array<Block>) {
    if (blocks) {
      this.blocks = blocks;
    } else {
      this.blocks = [];
      const block: Block = new Block(kamiSama, [
        new Transaction(
          undefined,
          kamiSama,
          initReward,
          'Genesis Block: The Times 03/Jan/2009 Chancellor on brink of second bailout for banks'
        )
      ]);
      while (!this.validDiffculty(block)) {
        block.calcHash();
      }
      this.blocks.push(block);
    }
  }

  isValidBlock(block): boolean {
    const prev: Block = this.lastBlock();
    return (
      this.validDiffculty(block) &&
      prev.hash === block.prevHash &&
      prev.index === block.index - 1
    );
  }

  lastBlock(): Block {
    return this.blocks[this.blocks.length - 1] || this.blocks[0];
  }

  accept(block: Block): boolean {
    const prev: Block = this.lastBlock();
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

  validDiffculty(block: Block): boolean {
    if (!block || !block.hash) {
      return false;
    }
    for (let i: number = 0; i < difficulty; i++) {
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
  iterTrans(callback: (transac: Transaction) => void): void {
    this.blocks.forEach(block =>
      block.transacs.forEach(trans => callback.call(null, trans))
    );
  }
}

export default Chain;
