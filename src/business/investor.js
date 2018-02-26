import Participant from 'business/participant';

class Investor extends Participant {
    constructor(id) {
        super(id);
        this.id = `investor-${id}`;
    }

    send() {}
}

export default Investor;
