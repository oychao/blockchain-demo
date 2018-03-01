import store from 'store';
import Chain from 'business/chain';
import Transaction from "business/transaction";
import { randomIdx, randomBtc } from 'utils/random';

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
        this.startDealing();
        this.calculateBalance = :: this.calculateBalance;
        this.totalBtc = Chain.initReward;
    }

    /**
     * start generating transaction randomly
     */
    startDealing() {
        if (!this.timer) {
            // generate a transaction every 1.5 second,
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
    stopDealing() {
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
        Object.values(this.transactions).forEach(this.calculateBalance);
    }

    /**
     * calculate all BTC in the network
     */
    calculateTotalBtc() {
        this.totalBtc = Object.values(this.investors).reduce(
            (acc, investor) => acc + investor.balance,
            Chain.initReward
        );
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
     * receive a new block, if valid then refresh balances for all investors,
     * if conflict happens, query for latest blocks and refresh the chain
     * @param {Block} block 
     */
    receiveBlock(block) {
        try {
            Object.values(this.investors).forEach(investor => void investor.resetBtc());
            this.chain.accept(block);
            this.calculateBalanceInChain();
            this.calculateTotalBtc();
            console.log(block.transacs[0].value);
            this.printInfo();
            block.transacs.forEach(transac => {
                if (transac.hash) {
                    delete this.transactions[transac.hash];
                }
            });
            this.calculateBalanceOutChain();
        } catch (e) {
            const { miners } = this;
            const minerArr = Object.values(miners);
            let miner = miners[block.miner] || minerArr[randomIdx(minerArr.length)];
            this.stopDealing();
            miner.queryBlocks('pool', blocks => {
                this.chain.blocks = blocks;
                this.startDealing();
            });
            throw new Error(`${e.message}, block received from ${block.miner}`);
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
        const transacs = Object.values(this.transactions);
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

    /**
     * print all pool info to console
     */
    printInfo() {
        // console.log('POOL: investor list:');
        // Object.values(this.investors).forEach(investor => void console.log(investor));
        console.log(`POOL: chain length: ${this.chain.lastBlock().index}, total BTC: ${this.totalBtc}`);
    }
}

const pool = new Pool();

export default pool;
