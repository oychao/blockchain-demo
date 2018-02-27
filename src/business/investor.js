import Participant from 'business/participant';

class Investor extends Participant {
    constructor(id) {
        super(id);
        this.id = `investor-${id}`;
        this.balance = 0;
    }

    receiveBtc(amount) {
        this.balance += amount;
    }

    spendBtc(mount) {
        this.balance -= amount;
    }
}

export default Investor;
