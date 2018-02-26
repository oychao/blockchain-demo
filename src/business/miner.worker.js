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
        this.timer = setInterval(() => {
            if (state.chain.isValidBlock(block)) {
                state.chain.accept(block);
                this.broadcast(block);
                block = new Block(state.id, Math.random(), state.chain.lastBlock());
            } else {
                block.calcHash(state.chain.lastBlock());
            }
        }, 1);
    },

    stop() {
        clearInterval(this.timer);
    },

    receive(block) {
        try {
            console.log(block.index, state.chain.lastBlock().index);
            if (!state.chain.accept(block)) {
                throw new Error(`${state.id} outdate chain`);
            }
        } catch (e) {
            this.stop();
            postMessage({
                type: 'queryPeer'
            });
            throw e;
        }
    },

    receiveBlocks(blocks) {
        console.log(state.id, blocks.length);
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
