import crypto from 'crypto';

class Block {
    constructor(minerId, data, prevBlock = {
        index: -1,
        hash: 'Hello Block Chain'
    }) {
        this.payload = { minerId, data };
        this.nonce = 0;
        this.prevBlock = prevBlock;
        this.calcHash();
    }

    calcHash(prevBlock) {
        this.prevBlock = prevBlock || this.prevBlock;
        this.index = this.prevBlock.index + 1;
        this.prevHash = this.prevBlock.hash;
        this.timestamp = new Date().getTime();
        this.hash = crypto
            .createHash("sha256")
            .update(this.index + this.prevHash + this.timestamp + this.payload.minerId + this.payload.data + ++this.nonce)
            .digest("hex");
    }
}

export default Block;
