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
        this.block = new Block(state.id, Math.random(), state.chain.lastBlock());
        this.timer = setInterval(() => {
            if (state.chain.isValidBlock(this.block)) {
                state.chain.accept(this.block);
                this.broadcast(this.block);
                this.block = new Block(state.id, Math.random(), state.chain.lastBlock());
            } else {
                this.block.calcHash(state.chain.lastBlock());
            }
        }, 1);
    },

    stop() {
        clearInterval(this.timer);
    },

    receive(block) {
        try {
            state.chain.accept(block);
            this.block.nouce = 0;
        } catch (e) {
            this.stop();
            postMessage({
                type: 'queryPeer'
            });
            throw new Error(`${state.id} ${e.message}`);
        }
    },

    receiveBlocks(blocks) {
        state.chain.blocks = blocks;
        this.start();
    },

    queryBlocks(minerId) {
        postMessage({
            type: 'getBlocks',
            payload: {
                minerId,
                blocks: state.chain.blocks
            }
        });
    },

    broadcast(block) {
        postMessage({
            type: 'broadcast',
            payload: block
        });
    }
};

onmessage = e => void strategies[e.data.type](e.data.payload);
