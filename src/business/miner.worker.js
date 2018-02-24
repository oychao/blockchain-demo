import Chain from 'business/chain';
import Block from 'business/block';
import inherit from 'utils/inherit';

const state = {};

const strategies = {
    init(payload) {
        state.id = payload.id;
        state.chain = Reflect.construct(Chain, [payload.chain.blocks]);
    },

    start() {
        let block = new Block(state.id, Math.random(), state.chain.lastBlock());
        setInterval(() => {
            if (state.chain.isValidBlock(block)) {
                state.chain.accept(block);
                this.broadcast(block);
                block = new Block(state.id, Math.random(), state.chain.lastBlock());
            } else {
                block.calcHash(state.chain.lastBlock());
            }
        }, 1);
    },

    receive(block) {
        inherit(block, Block);
        state.chain.accept(block);
    },

    broadcast(block) {
        postMessage({
            type: 'broadcast',
            payload: block
        });
    }
};

onmessage = e => void strategies[e.data.type](e.data.payload);
