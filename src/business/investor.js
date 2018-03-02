class Investor {
    constructor(id, balance = 0) {
        this.id = id;
        this.balance = balance;
    }

    receiveBtc(value) {
        this.balance += value;
    }

    spendBtc(value) {
        this.balance -= value;
    }

    /**
     * reset balance to 0
     */
    resetBtc() {
        this.balance = 0;
    }
}

export default Investor;
