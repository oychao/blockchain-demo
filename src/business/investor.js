class Investor {
    constructor(id) {
        this.id = `investor-${id}`;
        this.balance = 0;
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
