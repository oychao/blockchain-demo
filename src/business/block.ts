import crypter from 'utils/crypter';

class Block {
  miner: string;
  nonce: number;
  prevHash: string;
  index: number;
  timestamp: number;
  hash: string;
  transacs: Array<any>;
  constructor(
    minerId: string,
    transacs: Array<any> = [],
    prevBlock = {
      index: -1,
      hash: '0000000000000000000'
    }
  ) {
    this.miner = minerId;
    this.nonce = 0;
    this.prevHash = prevBlock.hash;
    this.index = prevBlock.index + 1;
    this.timestamp = new Date().getTime();
    this.hash = '0';
    this.transacs = transacs;
    this.calcHash();
  }

  calcHash(prevBlock?: Block): void {
    if (prevBlock) {
      this.index = prevBlock.index + 1;
    }
    this.prevHash = (prevBlock && prevBlock.hash) || this.prevHash;
    this.timestamp = new Date().getTime();
    this.nonce++;
    this.hash = this.getCyphertext();
  }

  getCyphertext(): string {
    let cyphertext: string = `${this.index}${this.prevHash}${this.timestamp}${
      this.nonce
    }`;
    this.transacs.forEach(trans => (cyphertext += trans.hash));
    return crypter.update(cyphertext).digest('hex');
  }

  toString(): string {
    return JSON.stringify(this, null, 2);
  }
}

export default Block;
