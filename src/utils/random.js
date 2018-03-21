/**
 * generate a random integer number less than ${upperLimit}
 * @param {Number} upperLimit 
 */
const randomIdx = upperLimit => (Math.random() * (upperLimit |> Math.round)) |> Math.floor;

/**
 * generate a random integer number less than half of ${upperLimit},
 * accurate to 2 decimal places
 * @param {Number} upperLimit 
 */
const randomBtc = upperLimit => Math.floor(Math.random() * upperLimit / 2) + 1;

export { randomIdx, randomBtc, };
