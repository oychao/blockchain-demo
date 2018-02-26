import crypto from 'crypto';

const crypter = crypto.createHash("sha256");

class Block {
    constructor(minerId, transactions = [], prevBlock = {
        index: -1,
        hash: 'Hello Block Chain'
    }) {
        this.miner = minerId;
        this.transactions = transactions;
        this.nonce = 0;
        this.prevHash = prevBlock.hash;
        this.index = prevBlock.index + 1;
        this.calcHash();
    }

    calcHash(prevBlock) {
        if (prevBlock) {
            this.index = prevBlock.index + 1;
        }
        this.prevHash = (prevBlock && prevBlock.hash) || this.prevHash;
        this.timestamp = new Date().getTime();
        this.nonce++;
        this.hash = this.getCyphertext();
    }

    getCyphertext() {
        let cyphertext = `${this.index}${this.prevHash}${this.timestamp}${this.nonce}`;
        this.transactions.forEach(trans => cyphertext += trans.from + trans.to + trans.amount);
        return crypter.update(cyphertext).digest("hex");
    }

    toString() {
        return JSON.stringify(this, null, 2);
    }
}

export default Block;
