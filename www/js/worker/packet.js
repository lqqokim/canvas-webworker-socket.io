importScripts('/socket.io/socket.io.js');

var socket = io();
console.log(socket);

var count = 0;
var packetStack = [];

socket.on('connect', function () {
    console.log('연결');
    // socket.emit('success', {
    //   key: 'tony',
    //   password: 'tony'
    // })
});
socket.on('packet', function (data) {
    packetStack.push(data);

    // setTimeout(() => {
    //   sendPacketStack(packetStack);
    //   packetStack.splice(0);
    // }, 200);
});

function checkTime() {
    sendPacketStack(packetStack);
    packetStack.splice(0);
    setTimeout(checkTime, 200);
}

checkTime();


function sendPacketStack(data) {
    // console.log(`0.2초동안 모아진 놈들 ${count++}`, data);
    this.postMessage(data);
}


// function send(type, data) {
//     g_worker.postMessage({type: type, val: data});
//   }

//   function sum(dataArr) {
//     send('sum', dataArr[0] + dataArr[1]);
//   }

//   function init() {
//     g_worker.onmessage = on;
//   }