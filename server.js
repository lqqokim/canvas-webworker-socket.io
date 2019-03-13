const express = require('express');
const app = express();

//express가 app을 초기화해서 HTTP 서버를 제공할 수 있도록 함
const http = require('http').Server(app);
const io = require('socket.io')(http);

/*
    1. static: 이미지, CSS 파일 및 JavaScript 파일과 같은 정적 파일을 제공
    2. www폴더 내부를 루트로 잡고 시작
*/
app.use('/', express.static(`${__dirname}/www`));

//server가 대기하는 포트 설정
http.listen(3000, () => {
    console.log('listening on *:3000');
});

//packet-stack에서의 socket 생성 후 연결시 수향되는 이벤트 리스너
io.on('connect', (socket) => {
    console.log('client 접속')

    packet_loop(socket);

    socket.on('a', (msg) => {
        
    })

    socket.on('disconnect', () => {
        console.log('client 접속 종료');
    })

    //io: 자신을 포함한 모든 클라이언트로 소켓요청을 보낸다
    // io.emit('newScoreToClient', data);
});

//packet이 생성되는 주기에 관여
const PACKET_LOOP_TIME_RANGE = {
    start: 1,
    end: 200
};

//각각의 packet이 가진 랜덤 대기시간에 관여
const PACKET_DELAY_RAND_TIME = {
    start: 0,
    end: 20
};

//랜덤시간 간격으로 packet을 생성하여 client(packet-stack)으로 전달
function packet_loop(socket) {

    //client에서 server로 오는 요청을 처리하는 이벤트 리스너
    socket.emit('packet', createPacket());

    setTimeout(() => {
        packet_loop(socket);
    }, random(PACKET_LOOP_TIME_RANGE.start, PACKET_LOOP_TIME_RANGE.end));
}

//랜덤 대기시간을 가진 packet 생성
function createPacket() {
    return {
        delay: random(PACKET_DELAY_RAND_TIME.start, PACKET_DELAY_RAND_TIME.end)
    }
}

function random(start, end) {
    return Math.floor(Math.random() * end) + start;
}