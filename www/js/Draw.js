import Background from './draw/Background.js';
import Text from './draw/Text.js';
import Packet from './draw/Packet.js';

class Draw {
  constructor(app, worker) {
    this.app = app;
    this.app.updateObj = this.updateObj.bind(this);
    this.background = new Background(app);
    this.text = new Text(app);
    this.packet = new Packet(app);
    this.packet.text = this.text;
    this.worker = worker;
    this.worker.onmessage = (event) => {
      this.packet.createPacketLoop(event.data);
    }

    this.init();
  }

  init() {
    this.background.init();
    this.text.init();
    this.packet.init();
  }

  updateObj() {
    // console.log(this.packet)
    this.background.update();
    this.text.update();
    this.packet.update();
  }
}

export default Draw;