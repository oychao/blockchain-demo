import store from 'store/index';
import Miner from 'business/miner';
import Investor from 'business/investor';
import Exchange from 'business/exchange';

let id: number = 1;

const maxMinerCount: number = 5;
const maxInvestorCount: number = 5;

const exchange: Exchange = Exchange.getInstance();

/**
 * Contactor act like network in real world
 */
class Contactor {
  exchange: Exchange;
  constructor() {}

  registerExchange(exchange) {
    this.exchange = exchange;
  }

  /**
   * oops! a new miner poped up in the network all of a sudden,
   * new miner must be registered before new investor, otherwise there will
   * be a infinite call loop
   */
  popupMiner() {
    if (this.getMinerLen() >= maxMinerCount) {
      return;
    }
    const investor = this.popupInvestor(id);
    const miner = new Miner(`miner-${id++}`, investor, exchange.chain);
    this.exchange.registerMiner(miner);
    miner.registerExchange(this.exchange);
    this.exchange.registerInvestor(investor);
    Object.keys(this.exchange.miners).forEach(k => {
      const m = this.exchange.miners[k];
      miner.acquaint(m);
      m.acquaint(miner);
    });
    return miner;
  }

  /**
   * oops! a new investor poped up in the network all of a sudden
   * @param {Number} _id ${id} if not given
   */
  popupInvestor(_id?: number) {
    if (
      !_id &&
      this.getInvestorLen() - this.getMinerLen() >= maxInvestorCount
    ) {
      return;
    }
    const isMiner = _id !== undefined;
    if (_id === undefined) {
      _id = id++;
    }
    const investor = new Investor(`investor-${_id}`);
    if (!isMiner) {
      this.exchange.registerInvestor(investor);
    }
    return investor;
  }

  /**
   * get miner count in the exchange
   */
  getMinerLen() {
    return this.exchange.getMinerLen();
  }

  /**
   * get investor count in the exchange
   */
  getInvestorLen() {
    return this.exchange.getInvestorLen();
  }
}

const contactor = new Contactor();
contactor.registerExchange(exchange);

store.subscribe(() => {
  const state: any = store.getState();
  const { newMinerFlag, newInvestorFlag } = state;
  if (newMinerFlag) {
    contactor.popupMiner();
  }
  if (newInvestorFlag) {
    contactor.popupInvestor();
  }
});

export default contactor;
