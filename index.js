const express = require('express');
const app = express();
//Express가 app을 초기화해서 HTTP 서버를 제공할 수 있도록 함
const http = require('http').Server(app);
const io = require('socket.io')(http);

// 이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공
app.use('/', express.static(`${__dirname}/www`)); // www폴더 내부를 루트로 잡고 시작

//서버가 대기하는 포트를 3000번으로 정한다.
http.listen(3000, () => {
    console.log('listening on *:3000');
});

const _PACKET_LOOP_RAND_TIME = {
    start: 1,
    end: 200
};
const _PACKET_DELAY_RAND_TIME = {
    start: 0,
    end: 20
};

io.on('connection', (socket) => {
    packet_loop(socket);
});

function random(start, end) {
    return Math.floor(Math.random() * end) + start;
}

function createPacket() {
    return {
        delay: random(_PACKET_DELAY_RAND_TIME.start, _PACKET_DELAY_RAND_TIME.end)
    }
}

function packet_loop(socket) {
    socket.emit('packet', createPacket());

    setTimeout(() => {
        packet_loop(socket);
    }, random(_PACKET_LOOP_RAND_TIME.start, _PACKET_LOOP_RAND_TIME.end));
}

/**
Socket.IO는 두 가지로 이루어져 있습니다:

Node.JS HTTP 서버에(또는 기반해서) 통합되는 서버: socket.io
브라우저에서 실행되는 클라이언트 라이브러리: socket.io-client
 */


//경로 핸들러 /를 선언해서 웹사이트 홈에 접속할 주소를 선언
// app.get('/', function (req, res) {
//     console.log(res, req);
//     res.sendFile(__dirname + '/index.html');
// });

    // socket.on('success', (msg) => {
    //     console.log( msg );
    //     // socket.emit('chat message', msg);
    // });
    // socket.emit('packet', '위험');
    // setTimeout(()=>{
    //     socket.emit('packet', '노말');
    // }, 1000);
    // setTimeout(()=>{
    //     socket.emit('packet', '경고');
    // }, 5000);