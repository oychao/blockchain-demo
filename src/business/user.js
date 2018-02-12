import Participant from 'business/participant';

class User extends Participant {
    constructor(id, name) {
        super(id, name);
    }
}

export default User;
