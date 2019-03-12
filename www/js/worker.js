var _WORKER = new Worker('./js/worker/packet.js');

_WORKER.onmessage = function(event) {
    console.log(event.data);
}

export default _WORKER;