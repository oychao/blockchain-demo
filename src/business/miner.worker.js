import Chain from 'business/chain';

const state = {};

const strategies = {
    init(e) {
        state.id = e.data.payload.id;
        state.name = e.data.payload.name;
        state.chain = Reflect.construct(Chain, [e.data.payload.chain.blocks]);
    },
    start(e) { },
    accept(e) { }
};

onmessage = e => void strategies[e.data.type](e);

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
