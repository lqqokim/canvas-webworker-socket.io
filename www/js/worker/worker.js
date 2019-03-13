var PacketStackWorker = new Worker('./js/worker/packet-stack.js');

// PacketStackWorker.onmessage = function(event) {
//     console.log('PacketStackWorker onmessage', event.data);
// }

export default PacketStackWorker;