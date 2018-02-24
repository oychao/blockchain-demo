import Chain from 'business/chain';
import Block from 'business/block';

const state = {};

const strategies = {
    init(payload) {
        state.id = payload.id;
        state.name = payload.name;
        state.chain = Reflect.construct(Chain, [payload.chain.blocks]);
    },
    start() {
        let block = new Block(state.name, Math.random(), state.chain.lastBlock());
        setInterval(() => {
            if (state.chain.isValidBlock(block)) {
                state.chain.accept(block);
                console.log(state.chain.blocks.length);
                block = new Block(state.name, Math.random(), state.chain.lastBlock());
            } else {
                block.calcHash(state.chain.lastBlock());
            }
        }, 1);
    },
    accept(payload) { },
    listen(payload) {
        console.log(`${state.id} ${state.name} payload`);
        postMessage({
            type: 'announce',
            payload: 'haha'
        });
    }
};

onmessage = e => void strategies[e.data.type](e.data.payload);

// setInterval(() => {
//     let i = 0;
//     if (block.validDiffculty()) {
//         this.chain.accept(block);
//         this.broadcast(block);
//         console.log(`${this.name} mined block ${block.index}, hash: ${block.hash}`);
//         block = new Block(this.name, Math.random(), this.chain.prevBlock);
//     } else {
//         while (i++ < 100 && !block.validDiffculty()) {
//             block.calcHash(this.chain.prevBlock);
//         }
//     }
// }, 0);
