importScripts('/socket.io/socket.io.js');

//소켓 생성
const socket = io.connect('http://localhost:3000');

//packet을 쌓는 공간
const packetStack = [];

//server에서 connect에 대한 
socket.on('connect', () => {

});

socket.on('packet', (data) => {
    packetStack.push(data);
    socket.emit('a', 'asd');
});

//일정 시간 간격으로 stack에 쌓아둔 packet 묶음을 내보낸다.
function timeCheckLoop() {
    sendPacketStack(packetStack);
    packetStack.splice(0);
    setTimeout(timeCheckLoop, 200);
}

function sendPacketStack(data) {
    //worker객체로 보낸다.
    this.postMessage(data);
}

timeCheckLoop();





// importScripts('/socket.io/socket.io.js');

// //소켓 생성
// const socket = io();

// //packet을 쌓는 공간
// const packetStack = [];

// //server에서 connect에 대한 
// socket.on('connect', function (data) {
//     console.log('연결', data);
//     // socket.emit('success', {
//     //   key: 'tony',
//     //   password: 'tony'
//     // })
// });
// socket.on('packet', function (data) {
//     packetStack.push(data);
// });

// //일정 시간 간격으로 stack에 쌓아둔 packet 묶음을 내보낸다.
// function timeCheckLoop() {
//     sendPacketStack(packetStack);
//     packetStack.splice(0);
//     setTimeout(timeCheckLoop, 200);
// }

// function sendPacketStack(data) {
//     //worker객체로 보낸다.
//     this.postMessage(data);
// }

// timeCheckLoop();