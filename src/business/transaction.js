import crypter from 'utils/crypter';

class Transaction {
    constructor(from, to, value, coinbase) {
        this.hash = '';
        if (from) {
            this.from = from;
            this.hash += from;
        }
        if (to) {
            this.to = to;
            this.hash += to;
        }
        if (value) {
            this.value = value;
            this.hash += value;
        }
        if (coinbase) {
            this.coinbase = coinbase;
            this.hash += coinbase;
        }
        this.hash = crypter.update(this.hash).digest('hex');
    }
}

export default Transaction;
