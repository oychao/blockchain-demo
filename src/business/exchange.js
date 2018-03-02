import store from 'store';
import Chain from 'business/chain';
import Investor from 'business/investor';
import Transaction from "business/transaction";
import { randomIdx, randomBtc } from 'utils/random';
import App from 'containers/App';

/**
 * exchange, transactions generated here
 */
class Exchange {
    constructor(store) {
        this.transactions = {};
        this.miners = {};
        this.investors = {};
        this.investorCount = 0;
        this.chain = new Chain();
        this.startDealing();
        this.calculateBalance = :: this.calculateBalance;
        this.totalBtc = Chain.initReward;

        this.store = store;
        const block = { ...this.chain.lastBlock() };
        block |> App.actions.addBlock |> this.store.dispatch;
    }

    /**
     * start generating transaction randomly
     */
    startDealing() {
        if (!this.timer) {
            // generate a transaction every 0.5 second,
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
                let transac = new Transaction(fromInvestor.id, toInvestor.id, value);
                this.transactions[transac.hash] = transac;
                transac = { ...transac };
                transac |> App.actions.addTransaction |> this.store.dispatch;
            }, 5e2);
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
        const { investors } = this;
        Object.values(investors).map(inv => ({ ...inv })) |> App.actions.resetInvestors |> this.store.dispatch;
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
            this.printInfo();
            block.transacs.map(transac => {
                delete this.transactions[transac.hash];
                return transac.hash;
            }) |> App.actions.delTransactionBatch |> this.store.dispatch;
            this.calculateBalanceOutChain();
            block = { ...block };
            block |> App.actions.addBlock |> this.store.dispatch;
        } catch (e) {
            const { miners } = this;
            const minerArr = Object.values(miners);
            let miner = miners[block.miner] || minerArr[randomIdx(minerArr.length)];
            this.stopDealing();
            miner.queryBlocks('exchange', blocks => {
                this.chain.blocks = blocks;
                this.startDealing();
            });
            throw new Error(`${e.message}, block received from ${block.miner}`);
        }
    }

    /**
     * register a new miner into exchange
     * @param {Miner} miner 
     */
    registerMiner(miner) {
        miner.id |> App.actions.addMiner |> this.store.dispatch;
        this.miners[miner.id] = miner;
    }

    /**
     * register a new investor into exchange
     * @param {Investor} investor 
     */
    registerInvestor(investor) {
        this.investorCount++;
        this.investors[investor.id] = investor;
        investor = { ...investor };
        investor |> App.actions.addInvestor |> this.store.dispatch;
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
     * get miner count in the exchange
     */
    getMinerLen() {
        return Object.keys(this.miners).length;
    }

    /**
     * get investor count in the exchange
     */
    getInvestorLen() {
        return Object.keys(this.investors).length;
    }

    /**
     * print all exchange info to console
     */
    printInfo() {
        // console.log('EXCHANGE: investor list:');
        Object.values(this.investors).forEach(investor => void console.log(investor));
        console.log(`EXCHANGE: chain length: ${this.chain.lastBlock().index}, total BTC: ${this.totalBtc}`);
    }
}

const exchange = new Exchange(store);
exchange.registerInvestor(new Investor(Chain.kamiSama, 50));

export default exchange;
