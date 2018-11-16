class Investor {
  id: string;
  balance: number;
  constructor(id: string, balance: number = 0) {
    this.id = id;
    this.balance = balance;
  }

  receiveBtc(value: number): void {
    this.balance += value;
  }

  spendBtc(value: number): void {
    this.balance -= value;
  }

  /**
   * reset balance to 0
   */
  resetBtc(): void {
    this.balance = 0;
  }
}

export default Investor;
