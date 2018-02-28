import store from 'store';
import Chain from 'business/chain';
import Transaction from "business/transaction";

/**
 * generate a random index number less than ${upperLimit}
 * @param {Number} upperLimit 
 */
const randomIdx = upperLimit => (Math.random() * (upperLimit |> Math.round)) |> Math.floor;

/**
 * generate a random decimal number less than half of ${upperLimit},
 * accurate to 2 decimal places
 * @param {Number} upperLimit 
 */
const randomBtc = upperLimit => +((Math.random() * upperLimit).toFixed(2)) / 2;

/**
 * mine pool, transactions generated here
 */
class Pool {
    constructor() {
        this.transactions = {};
        this.miners = {};
        this.investors = {};
        this.investorCount = 0;
        this.chain = store.chain;
        this.generateTransaction();
        this.calculateBalance = :: this.calculateBalance;
    }

    /**
     * start generating transaction randomly
     */
    generateTransaction() {
        if (!this.timer) {
            // generate a transaction every 0.1 second,
            // if investor less than 1 or random seller's balance is 0
            // or random seller and random buy are same investor,
            // skip and continue
            this.timer = setInterval(() => {
                if (!this.investorCount) {
                    return;
                }
                const fromIdx = randomIdx(this.investorCount);
                let toIdx = randomIdx(this.investorCount);
                if (fromIdx === toIdx) {
                    return;
                }
                const fromInvestor = this.investorIdxOf(fromIdx);
                const toInvestor = this.investorIdxOf(toIdx);
                if (fromInvestor.balance === 0) {
                    return;
                }
                const value = randomBtc(fromInvestor.balance);
                // tell investors that their balances have been Fchanged fo preventing double spend
                fromInvestor.spendBtc(value);
                toInvestor.receiveBtc(value);
                const transac = new Transaction(fromInvestor.id, toInvestor.id, value);
                this.transactions[transac.hash] = transac;
            }, 1.5e3);
        }
    }

    investorIdxOf(idx) {
        return this.investors[Object.keys(this.investors)[idx]]
    }

    /**
     * stop generating transactions
     */
    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            delete this.timer;
        }
    }

    /**
     * calculate balances of all investors by iterating all transactions
     * in the chain
     */
    calculateBalanceInChain() {
        this.chain.iterTrans(this.calculateBalance);
    }

    /**
     * calculate balances of all investors by iterating all transactions
     * out the chain, note this method must be invoked after ${calcylateBalanceInChain}
     * being invoked
     */
    calculateBalanceOutChain() {
        const { transactions } = this;
        Object.keys(transactions).map(k => transactions[k]).forEach(this.calculateBalance);
    }

    /**
     * calculate balance with one transaction
     * @param {Transaction} transac
     */
    calculateBalance(transac) {
        const { investors } = this;
        const { from, to, value } = transac;
        if (!from) {
            if (investors[to]) {
                investors[to].receiveBtc(value);
            }
        } else {
            if (investors[from] && investors[to]) {
                investors[from].spendBtc(value);
                investors[to].receiveBtc(value);
            }
        }
    }

    /**
     * receive a new block, if valid then refresh balances for all investors
     * @param {Block} block 
     */
    receiveBlock(block) {
        try {
            Object.keys(this.investors).forEach(k => void this.investors[k].resetBtc());
            this.chain.accept(block);
            this.calculateBalanceInChain();
            Object.keys(this.investors).forEach(k => void console.log(this.investors[k]));
            block.transacs.forEach(transac => {
                if (transac.hash) {
                    delete this.transactions[transac.hash];
                }
            });
            console.log(this.getTransactions().length);
            this.calculateBalanceOutChain();
        } catch (e) {
            throw e;
        }
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
        this.investorCount++;
        this.investors[investor.id] = investor;
    }

    /**
     * miners need transactions to construct a new block
     * @param {Number} num if not given, return all transactions
     */
    getTransactions(num) {
        const ks = Object.keys(this.transactions);
        const transacs = ks.map(k => this.transactions[k]);
        if (!num) {
            return transacs;
        } else {
            return transacs.slice(0, num);
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
