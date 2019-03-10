import Sprite from './Sprite.js';
import Text from './Text.js';

class Packet {
  constructor(app) {
    this.app = app;
    this.init = this.init;
    this.update = this.updatePacket;

    this.packets = [];
    this.MOVE_IMAGES = {
      blue: '/images/SpeedSQ_Blue.png',
      red: '/images/SpeedSQ_Red.png',
      yellow: '/images/SpeedSQ_Yellow.png'
    };

    this.WAIT_IMAGES = {
      blue: '/images/nBlue.png',
      red: '/images/nRed.png',
      yellow: '/images/nYellow.png'
    };


    this.type_state_count = {
      normal: 0,
      alarm: 0,
      warning: 0
    };

    this.input_count = 0;
    this.output_count = 0;

    this.spriteInfo = new Sprite(app);
    // this.text = new Text(app);
  }

  init() {
    this.create_packet_loop();
    this.input_update();
    this.output_update();
  }

  updatePacket() {
    let i = 0;
    let len = this.packets.length;

    while (i < len) {
      this.packets[i].update();
      i++;
    }
  }

  create_packet() {
    // 1 ~ 20초 랜덤 시간 설정
    const random_time = Math.floor(Math.random() * 20) + 1;
    let input_img = this.MOVE_IMAGES.blue;
    let output_img = this.MOVE_IMAGES.red;
    let wait_img = this.WAIT_IMAGES.red;
    let packet_type = 'alarm';

    // 랜덤시간 0~5초 blue
    if (random_time <= 5) {
      output_img = this.MOVE_IMAGES.blue;
      wait_img = this.WAIT_IMAGES.blue;
      packet_type = 'normal';
    }
    // 랜덤시간 6~10초 yellow
    else if (random_time <= 10) {
      output_img = this.MOVE_IMAGES.yellow;
      wait_img = this.WAIT_IMAGES.yellow;
      packet_type = 'warning';
    }

    // (0: input/ 1: wait/ 2: output) 이미지 등록
    let sprite = this.app.create.sprite([
      input_img,
      wait_img,
      output_img
    ]);

    // 패킷 상태 (input/output/stay)
    sprite.state = 'input';
    sprite.type = packet_type;
    sprite.random_time = random_time * 1000;// 자바스크립트 기준 시간계산

    sprite.x = this.spriteInfo.get_input_start_x();
    sprite.y = this.spriteInfo.get_vertical_mid();          // y축 중심 설정
    sprite.speed = 20;

    sprite.get_x_rand = this.spriteInfo.get_x_rand.bind(this.spriteInfo); //연결

    // sprite.set_x_rand = function (rand_x) {
    //   sprite.target_x = rand_x;//target_x: 랜덤으로 이동할 위치
    sprite.set_x_rand = function () {
      this.target_x = this.get_x_rand();//target_x: 랜덤으로 이동할 위치
      if (this.x < this.target_x) {
        this.wait_arrow = 'right';//목표지점에 대한 방향설정
        this.wait_speed = 1;
      } else {
        this.wait_arrow = 'left';
        this.wait_speed = -1;
      }
    }

    sprite.update = () => {
      // input 일 때
      if (sprite.state == 'input' && sprite.x < this.spriteInfo.get_input_end_x()) {
        sprite.x += sprite.speed;

        // input x축 마지막 위치를 넘어갔을 때
        if (sprite.x >= this.spriteInfo.get_input_end_x()) {
          sprite.state = 'wait';
          sprite.change(1);

          // y축 랜덤
          sprite.x = this.spriteInfo.get_x_rand();
          sprite.y = this.spriteInfo.get_y_rand();

          // x축 랜덤 세팅
          // sprite.set_x_rand(this.spriteInfo.get_x_rand());
          sprite.set_x_rand();

          // 패킷 상태 업데이트 (카운트)
          this.packet_state_update('wait', sprite.type);


          // 대기 시간 뒤에 output 처리
          setTimeout(() => {
            sprite.state = 'output';
            sprite.change(2);
            sprite.x = this.spriteInfo.get_output_start_x() - 130;
            sprite.y = this.spriteInfo.get_vertical_mid();
            this.packet_state_update('output', sprite.type);
          }, sprite.random_time);
        }
      }

      else if (sprite.state == 'output' && sprite.x < this.spriteInfo.get_output_end_x()) {
        sprite.x += sprite.speed;

        // output x축 마지막 위치를 넘어갔을 때
        if (sprite.x >= this.spriteInfo.get_output_end_x()) {
          sprite.state = 'end';
          this.app.remove(sprite);
        }
      }

      else if (sprite.state == 'wait') {
        sprite.x += sprite.wait_speed;

        if (sprite.wait_arrow == 'right' && sprite.x >= sprite.target_x) {
          // sprite.set_x_rand(this.spriteInfo.get_x_rand());
          sprite.set_x_rand();
        }
        else if (sprite.wait_arrow == 'left' && sprite.x <= sprite.target_x) {
          // sprite.set_x_rand(this.spriteInfo.get_x_rand());
          sprite.set_x_rand();
        }
      }
    }

    // 패킷 이미지 등록
    this.app.add(sprite);
    this.packets.push(sprite);
  }

  packet_state_update(type, state) {
    if (type == 'wait') {
      this.type_state_count[state]++;
    }
    else if (type == 'output') {
      this.type_state_count[state]--;
      this.output_count++;
    }

    this.text.change_num('normal', this.type_state_count.normal);
    this.text.change_num('alarm', this.type_state_count.alarm);
    this.text.change_num('warning', this.type_state_count.warning);

    this.text.change_num('current_count', (
      this.type_state_count.warning +
      this.type_state_count.alarm +
      this.type_state_count.warning
    ));
  }

  input_update() {
    this.text.change_num('request_sec', this.input_count);
    this.input_count = 0;
    setTimeout(() => {
      this.input_update();
    }, 1000);
  }

  output_update() {
    this.text.change_num('response_sec', this.output_count);
    this.output_count = 0;
    setTimeout(() => {
      this.output_update();
    }, 1000);
  }



  create_packet_loop() {
    this.create_packet();
    this.input_count++;
    // // setTimeout( create_packet_loop, 1000/10 );
    setTimeout(() => {
      this.create_packet_loop();
    }, 1000 / (Math.floor(Math.random() * 10) + 1));
    
  }

}

export default Packet;