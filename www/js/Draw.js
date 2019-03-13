import Background from './draw/Background.js';
import Text from './draw/Text.js';
import Packet from './draw/Packet.js';

class Draw {
  constructor(app, worker) {
    this.app = app;
    this.app.updateObj = this.updateObj.bind(this);

    //draw할 요소들의 객체생성
    this.background = new Background(app);
    this.text = new Text(app);
    this.packet = new Packet(app);
    this.packet.text = this.text;

    //packet-stack에서 수행한 postMessage에 대한 수신
    worker.onmessage = (event) => {
      //넘겨받은 packet을 생성하여 내보낸다.
      this.packet.generatePacket(event.data);
    };

    this.init();
  }

  init() {
    this.background.init();
    this.text.init();
    this.packet.init();
  }

  updateObj() {
    this.background.update();
    this.text.update();
    this.packet.update();
  }
}

export default Draw;