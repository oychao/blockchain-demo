import store from 'store';
import Chain from 'business/chain';

const randomIdx = upperLimit => Math.floor(Math.random() * Math.round(upperLimit));

class Pool {
    constructor() {
        this.miners = {};
        this.investors = {};
        this.chain = store.chain;
    }

    /**
     * start generating transaction randomly
     */
    generateTransaction() {
        setInterval(() => {
            if (!this.investors.length) {
                return;
            }
            const from = randomIdx(this.investors.length);
            let to = randomIdx(this.investors.length);
            while (from === to) {
                to = randomIdx(this.investors.length);
            }

        }, 1e2);
    }

    /**
     * calculate balances of all investors
     */
    calculateBalance() {
        const { investors } = this;
        this.chain.iterTrans((trans, idx) => {
            const { from, to, value } = trans;
            if (idx === 0) {
                if (investors[to]) {
                    investors[to].receiveBtc(value);
                }
            } else {
                if (investors[from] && investors[to]) {
                    investors[from].spendBtc(value);
                    investors[to].receiveBtc(value);
                }
            }
        });
    }

    /**
     * receive a new block, if valid then refresh balances for all investors
     * @param {Block} block 
     */
    receiveBlock(block) {
        try {
            this.chain.accept(block);
            this.calculateBalance();
        } catch (e) { }
    }

    /**
     * register a new miner into pool
     * @param {Miner} miner 
     */
    registerMiner(miner) {
        this.miners[miner.id] = miner;
    }

    /**
     * register a new investor into pool
     * @param {Investor} investor 
     */
    registerInvestor(investor) {
        this.investors[investor.id] = this.investor;
    }

    /**
     * miners need transactions to construct a new block
     * @param {Number} num 
     */
    getTransactions(num) {
        if (!num) {
            return this.transactions;
        } else {
            return this.transactions.slice(0, 3);
        }
    }

    /**
     * get miner count in the pool
     */
    getMinerLen() {
        return Object.keys(this.miners).length;
    }

    /**
     * get investor count in the pool
     */
    getInvestorLen() {
        return Object.keys(this.investors).length;
    }
}

const pool = new Pool();

export default pool;
