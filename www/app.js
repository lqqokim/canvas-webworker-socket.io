var
    _APP = undefined,
    _IMG_PRELOAD = undefined,
    _DRAW = undefined,

    // 미리 불러올 이미지
    _PRELOAD_IMAGES = [
      '/images/SpeedSQ_Blue.png',
      '/images/SpeedSQ_Red.png',
      '/images/SpeedSQ_Yellow.png',
      '/images/nBlue.png',
      '/images/nRed.png',
      '/images/nYellow.png'
    ]
;

//* 캔버스 클래스
function CANVAS(targetElemID) {
  var
      _ctx = undefined,
      _target_element = undefined
  ;

  // 캔버스 만들기
  function create_canvas(width, height) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    if (width !== undefined && height !== undefined) {
      canvas.width = width;
      canvas.height = height;
    }

    ctx.imageSmoothingEnabled = false;

    return ctx;
  }

  this.create_canvas = create_canvas;

  // 생성된 캔버스 가져오기
  function get_context() {
    return _ctx;
  }

  this.get_context = get_context;

  // 캔버스 리사이즈
  function resize() {
    _ctx.canvas.width = _target_element.clientWidth;
    _ctx.canvas.height = _target_element.clientHeight;
  }

  // 이벤트
  function event() {
    window.addEventListener('resize', resize, false);
  }

  // 생성자
  function init() {
    _target_element = document.querySelectorAll('#' + targetElemID)[0];

    // 캔버스 생성
    _ctx = create_canvas();
    _target_element.appendChild(_ctx.canvas);

    // 이벤트
    event();

    // 강제 캔버스 리사이징
    resize();
  }

  init();
}

//* 캔버스 오브젝트 생성 관련 (이미지, 도형, 텍스트 ...)
function CANVAS_CREATE(canvas) {
  var _canvas = canvas;

  // 캔버스에 그릴 기본적인 오브젝트
  function create_container(buff_ctx) {
    var container = {
      ctx: buff_ctx,
      x: 0,
      y: 0
    }
    return container;
  }

  this.container = function (w, h) {//단순히 포멧을 맞추기위해서 빈 캔버스를 넘긴다.
    return create_container(_canvas.create_canvas(w, h));
  };

  // 이미지 만들기
  function create_image(url) {
    var ctx = _canvas.create_canvas();
    var img = document.createElement('img');
    img.src = url;

    ctx.drawImage(img, 0, 0);// 캔버스에 임시로 그린다

    return create_container(ctx);//이미지를 넘기는게 아니라 이미지를 그린 캔버스 컨텍스트를 넘긴다
  }

  this.image = create_image;//구분을 위해서 외부에서 쓰는 명칭은 image

  // 스프라이트 이미지 만들기
  function create_sprite(url_arr) {
    var ctx = _canvas.create_canvas();
    var imgs = [];
    var i = 0, len = url_arr.length;

    // 이미지 경로 갯수만큼 만들기
    while (i < len) {
      imgs[i] = document.createElement('img');
      imgs[i].src = url_arr[i];
      i++;
    }

    // 첫번째 이미지 그리기
    ctx.drawImage(imgs[0], 0, 0);// 캔버스에 임시로 그린다

    // 커스텀 컨테이너 세팅
    var container = create_container(ctx);

    // 이미지 등록
    container.imgs = imgs;

    // 이미지 교체
    container.change = function (idx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(this.imgs[idx], 0, 0);
    }

    return container;
  }

  this.sprite = create_sprite;
}

//* 캔버스 렌더러
//화면에 그려줄 요소들을 그리기위한 역할
function CANVAS_RENDERER(targetElemID) {
  var
      _this = this,

      // 캔버스
      _canvas = undefined,
      _ctx = undefined,

      // 캔버스 배경색
      _bg_color = '#27282E',

      // 그려질 오브젝트 관련
      _draw_objs_arr = [],
      _draw_idx = 0,
      _draw_len = 0,
      _draw_obj = undefined
  ;

  // 업데이트
  function update() {
    (_this.hasOwnProperty('update')) && ( //외부에 update가 있으면 실행
        _this.update()
    );
  }

  // 그리기
  function draw() {

    // 배경
    background_draw();

    // 추가된 오브젝트 그리기
    _draw_idx = 0;
    _draw_len = _draw_objs_arr.length;

    while (_draw_idx < _draw_len) {
      _draw_obj = _draw_objs_arr[_draw_idx];
      _ctx.drawImage(_draw_obj.ctx.canvas, _draw_obj.x, _draw_obj.y);//drawImage를 통해 캔버스를 그린다. 이미지를 바로 박아넣지 않았다.
      _draw_idx++;
    }
  }

  // 배경색
  function background_draw() {
    _ctx.fillStyle = _bg_color;
    _ctx.fillRect(0, 0, _ctx.canvas.width, _ctx.canvas.height);
  }

  // 프로세스
  function process() {
    update();
    draw();
    window.requestAnimationFrame(process); //초당 60프레임으로 process 반복시킨다
  }

  // 캔버스 넓이 가져오기
  function get_width() {
    return _ctx.canvas.width;
  }

  this.get_width = get_width;

  // 캔버스 높이 가져오기
  function get_height() {
    return _ctx.canvas.height;
  }

  this.get_height = get_height;

  // 그릴 오브젝트 추가하기
  function add(obj) {
    _draw_objs_arr.push(obj);
  }

  this.add = add;

  // 그릴 오브젝트 찾기
  function obj_search(obj) {
    return _draw_objs_arr.indexOf(obj);
  }

  this.obj_search = obj_search;

  // 그릴 오브젝트 삭제
  function remove(obj) {
    var idx = obj_search(obj);
    _draw_objs_arr.splice(idx, 1);
  }

  this.remove = remove;

  // 생성자
  function init() {

    // 캔버스
    _canvas = new CANVAS(targetElemID);
    console.log(_canvas)
    _ctx = _canvas.get_context(); //화면에 그릴 메인 컨텍스트

    // 캔버스 오브젝트 생성관련
    _this.create = new CANVAS_CREATE(_canvas);

    process();
  }

  init();
}

//* 이미지 프리로드
function IMG_PRELOAD() {
  var
      _load_images = [],
      _images_urls = []
  ;

  // 이미지 로드할 경로 배열로 추가하기
  function add_image_urls(url_arr) {
    _images_urls = _images_urls.concat(url_arr);
  }

  this.add_image_urls = add_image_urls;

  // 프리로드 시작하기
  function load_start(callback) {
    var
        i = 0,
        len = _images_urls.length,
        load_count = 0
    ;

    while (i < len) {
      _load_images[i] = document.createElement('img');
      _load_images[i].src = _images_urls[i];

      _load_images[i].onload = function () {
        load_count++;
        if (load_count == len) {
          callback();
        }
      }
      i++;
    }
  }

  this.load_start = load_start;
}

//* 캔버스에 그리기
function DRAW(app) {
  var _app = app;

  // 배경 이미지 관련
  var _background = new function () {
    var
        h_line = undefined,
    v_line = undefined
    ;
    this.init = function () {
      var
          canvasW = _app.get_width(),
          canvasH = _app.get_height(),
          divide_width = canvasW / 5
      ;

      // 수평선
      h_line = _app.create.container(canvasW, 6);

      h_line.ctx.strokeStyle = "rgb(255, 255, 255, 0.1)";
      h_line.ctx.lineWidth = 2;

      h_line.ctx.beginPath();
      h_line.ctx.moveTo(0, 1);
      h_line.ctx.lineTo(canvasW, 1);
      h_line.ctx.stroke();

      h_line.ctx.beginPath();
      h_line.ctx.moveTo(0, 5);
      h_line.ctx.lineTo(canvasW, 5);
      h_line.ctx.stroke();

      h_line.x = 0;
      h_line.y = (canvasH * 0.5) - 3;

      _app.add(h_line);

      // 수직선
      var startX = divide_width * 2;
      var endX = divide_width * 3;
      var contH = 100;

      v_line = _app.create.container(canvasW, contH);

      v_line.ctx.strokeStyle = "rgb(255, 255, 255, 0.5)";
      v_line.ctx.lineWidth = 2;

      v_line.ctx.beginPath();
      v_line.ctx.moveTo(startX, 0);
      v_line.ctx.lineTo(startX, contH);
      v_line.ctx.stroke();

      v_line.ctx.beginPath();
      v_line.ctx.moveTo(endX, 0);
      v_line.ctx.lineTo(endX, contH);
      v_line.ctx.stroke();

      v_line.x = 0;
      v_line.y = (canvasH * 0.5) - (contH * 0.5);

      _app.add(v_line);
    }
    this.update = function () {
    }
  }

  // 텍스트 문구
  var _txt = new function () {

    function create_text(txt, w, h, x, y, size, color, align) {
      var cont = _app.create.container(w, h);
      cont.ctx.font = (size === undefined) ? '22px MS' : size + 'px MS';
      cont.ctx.fillStyle = (color === undefined) ? '#333333' : color;
      cont.ctx.textAlign = (align === undefined) ? 'left' : align;
      cont.ctx.textBaseline = 'middle';

      var align_x = 0;
      switch (cont.ctx.textAlign) {
        case 'left':
          align_x = 0;
          break;
        case 'center':
          align_x = w / 2;
          break;
        case 'right':
          align_x = w;
          break;
      }

      cont.align_x = align_x;
      cont.align_y = h / 2;

      cont.ctx.fillText(txt, cont.align_x, cont.align_y);
      cont.x = x;
      cont.y = y;

      // cont.ctx.fillStyle = '#ffffff';
      // cont.ctx.rect(0, 0, cont.ctx.canvas.width, cont.ctx.canvas.height);
      // cont.ctx.stroke();

      _app.add(cont);
      return cont;
    }

    // 현재 전체 건수
    var current_count = new function () {
      var num = undefined;
      var txt = undefined;

      function change_num(str) {
        num.ctx.clearRect(0, 0, num.ctx.canvas.width, num.ctx.canvas.height);
        num.ctx.fillText(str, num.align_x, num.align_y);
      }

      this.change_num = change_num;

      this.init = function () {
        var commH = (_app.get_height() / 2) - (50 + 50);
        var left_margin = 10;

        num = create_text('0', 50, 30, left_margin, commH, 25, '#cccccc', 'right');
        txt = create_text('현재 전체 건수', 150, 30, left_margin + 55, commH, 15, '#cccccc', 'left');
      }
    }

    // 요청/초
    var request_sec = new function () {
      var num = undefined;
      var txt = undefined;

      function change_num(str) {
        num.ctx.clearRect(0, 0, num.ctx.canvas.width, num.ctx.canvas.height);
        num.ctx.fillText(str, num.align_x, num.align_y);
      }

      this.change_num = change_num;

      this.init = function () {
        var commH = (_app.get_height() / 2) - (50);
        var left_margin = 10;

        num = create_text('0', 50, 30, left_margin, commH, 25, '#cccccc', 'right');
        txt = create_text('요청/초', 150, 30, left_margin + 55, commH, 15, '#cccccc', 'left');
      }
    }

    // 응답/초
    var response_sec = new function () {
      var num = undefined;
      var txt = undefined;

      function change_num(str) {
        num.ctx.clearRect(0, 0, num.ctx.canvas.width, num.ctx.canvas.height);
        num.ctx.fillText(str, num.align_x, num.align_y);
      }

      this.change_num = change_num;

      this.init = function () {
        var commH = (_app.get_height() / 2) - (50);
        var left_margin = _app.get_width() - 120;

        txt = create_text('응답/초', 50, 30, left_margin, commH, 15, '#cccccc', 'right');
        num = create_text('0', 150, 30, left_margin + 55, commH, 25, '#cccccc', 'left');
      }
    }

    // 경고
    var warning = new function () {
      var num = undefined;
      var txt = undefined;

      function change_num(str) {
        num.ctx.clearRect(0, 0, num.ctx.canvas.width, num.ctx.canvas.height);
        num.ctx.fillText(str, num.align_x, num.align_y);
      }

      this.change_num = change_num;

      this.init = function () {
        var commH = (_app.get_height() / 2) - (50 + 50);
        var left_margin = (_app.get_width() / 2) - (105 / 2);

        num = create_text('0', 50, 30, left_margin, commH, 25, '#ffff33', 'right');
        txt = create_text('경고', 50, 30, left_margin + 55, commH, 15, '#cccccc', 'left');
      }
    }

    // 정상
    var normal = new function () {
      var num = undefined;
      var txt = undefined;

      function change_num(str) {
        num.ctx.clearRect(0, 0, num.ctx.canvas.width, num.ctx.canvas.height);
        num.ctx.fillText(str, num.align_x, num.align_y);
      }

      this.change_num = change_num;

      this.init = function () {
        var commH = (_app.get_height() / 2) - (50 + 50);
        var left_margin = (_app.get_width() / 2) - (105 / 2) - 120;

        num = create_text('0', 50, 30, left_margin, commH, 25, '#99ccff', 'right');
        txt = create_text('정상', 50, 30, left_margin + 55, commH, 15, '#cccccc', 'left');
      }
    }

    // 심각
    var alarm = new function () {
      var num = undefined;
      var txt = undefined;

      function change_num(str) {
        num.ctx.clearRect(0, 0, num.ctx.canvas.width, num.ctx.canvas.height);
        num.ctx.fillText(str, num.align_x, num.align_y);
      }

      this.change_num = change_num;

      this.init = function () {
        var commH = (_app.get_height() / 2) - (50 + 50);
        var left_margin = (_app.get_width() / 2) - (105 / 2) + 120;

        num = create_text('0', 50, 30, left_margin, commH, 25, '#ff3333', 'right');
        txt = create_text('심각', 50, 30, left_margin + 55, commH, 15, '#cccccc', 'left');
      }
    }

    // 값 변경
    function change_num(type, num) {
      switch (type) {
        case 'current_count':
          current_count.change_num(num);
          break;
        case 'request_sec':
          request_sec.change_num(num);
          break;
        case 'response_sec':
          response_sec.change_num(num);
          break;
        case 'warning':
          warning.change_num(num);
          break;
        case 'normal':
          normal.change_num(num);
          break;
        case 'alarm':
          alarm.change_num(num);
          break;
      }
    }

    this.change_num = change_num;

    this.init = function () {
      current_count.init();
      request_sec.init();
      response_sec.init();

      normal.init();
      warning.init();
      alarm.init();
    }
    this.update = function () {

    }
  }

  var _packet = new function () {
    var packets = [];
    var i = 0, len = 0;

    var move_imgs = {
      blue: '/images/SpeedSQ_Blue.png',
      red: '/images/SpeedSQ_Red.png',
      yellow: '/images/SpeedSQ_Yellow.png'
    };
    var wait_imgs = {
      blue: '/images/nBlue.png',
      red: '/images/nRed.png',
      yellow: '/images/nYellow.png'
    };

    var type_state_count = {
      normal: 0,
      alarm: 0,
      warning: 0
    };

    var input_count = 0;
    var output_count = 0;

    // 패킷 상태 업데이트
    function packet_state_update(type, state) {
      if (type == 'wait') {
        type_state_count[state]++;
      } else if (type == 'output') {
        type_state_count[state]--;
        output_count++;
      }

      _txt.change_num('normal', type_state_count.normal);
      _txt.change_num('alarm', type_state_count.alarm);
      _txt.change_num('warning', type_state_count.warning);

      _txt.change_num('current_count', (
          type_state_count.warning +
          type_state_count.alarm +
          type_state_count.warning
      ));
    }

    function input_update() {
      _txt.change_num('request_sec', input_count);
      input_count = 0;
      setTimeout(input_update, 1000);
    }

    function output_update() {
      _txt.change_num('response_sec', output_count);
      output_count = 0;
      setTimeout(output_update, 1000);
    }

    // 패킷 만들기
    function create_packet() {
      // 1 ~ 20초 랜덤 시간 설정
      var random_time = Math.floor(Math.random() * 20) + 1;
      var input_img = move_imgs.blue;
      var output_img = move_imgs.red;
      var wait_img = wait_imgs.red;
      var packet_type = 'alarm';

      // 랜덤시간 0~5초 blue
      if (random_time <= 5) {
        output_img = move_imgs.blue;
        wait_img = wait_imgs.blue;
        packet_type = 'normal';
      }
      // 랜덤시간 6~10초 yellow
      else if (random_time <= 10) {
        output_img = move_imgs.yellow;
        wait_img = wait_imgs.yellow;
        packet_type = 'warning';
      }

      // (0: input/ 1: wait/ 2: output) 이미지 등록
      var sprite = _app.create.sprite([
        input_img,
        wait_img,
        output_img
      ]);

      // 패킷 상태 (input/output/stay)
      sprite.state = 'input';
      sprite.type = packet_type;
      sprite.random_time = random_time * 1000;// 자바스크립트 기준 시간계산

      // input x축 시작 지점
      sprite.get_input_start_x = function () {
        return -108;
      }
      // input x축 종료 지점
      sprite.get_input_end_x = function () {
        var divide_width = _app.get_width() / 5;
        return divide_width * 2;
      }

      // output x축 시작 지점
      sprite.get_output_start_x = function () {
        var divide_width = _app.get_width() / 5;
        return (divide_width * 3) - 20;
      }
      // output x축 종료 지점
      sprite.get_output_end_x = function () {
        return _app.get_width();
      }

      // 패킷 수직 중앙 y축
      sprite.get_vertical_mid = function () {
        return (_app.get_height() * 0.5) - (22 * 0.5);//기본값 수직중앙
      }

      // x축 랜덤
      sprite.get_x_rand = function () {
        var start_x = sprite.get_input_end_x();
        var end_x = sprite.get_output_start_x();
        var width = end_x - start_x;
        var rand_width = Math.floor(Math.random() * width);

        return start_x + rand_width;
      }

      // y축 랜덤
      sprite.get_y_rand = function () {
        var v_mid = sprite.get_vertical_mid() - 50;
        var add_y = Math.floor(Math.random() * 100);

        return v_mid + add_y;
      }

      // x축 랜덤 설정
      sprite.set_x_rand = function () {
        sprite.target_x = sprite.get_x_rand();//target_x: 랜덤으로 이동할 위치
        if (sprite.x < sprite.target_x) {
          sprite.wait_arrow = 'right';//목표지점에 대한 방향설정
          sprite.wait_speed = 1;
        } else {
          sprite.wait_arrow = 'left';
          sprite.wait_speed = -1;
        }
      }

      // 시작 위치 설정
      sprite.x = sprite.get_input_start_x();
      sprite.y = sprite.get_vertical_mid();          // y축 중심 설정
      sprite.speed = 20;

      sprite.update = function () {

        // input 일 때
        if (sprite.state == 'input' && sprite.x < sprite.get_input_end_x()) {
          sprite.x += sprite.speed;

          // input x축 마지막 위치를 넘어갔을 때
          if (sprite.x >= sprite.get_input_end_x()) {
            sprite.state = 'wait';
            sprite.change(1);

            // y축 랜덤
            sprite.x = sprite.get_x_rand();
            sprite.y = sprite.get_y_rand();

            // x축 랜덤 세팅
            sprite.set_x_rand();

            // 패킷 상태 업데이트 (카운트)
            packet_state_update('wait', sprite.type);


            // 대기 시간 뒤에 output 처리
            setTimeout(function () {
              sprite.state = 'output';
              sprite.change(2);
              sprite.x = sprite.get_output_start_x() - 130;
              sprite.y = sprite.get_vertical_mid();
              packet_state_update('output', sprite.type);
            }, sprite.random_time);
          }
        } else if (sprite.state == 'output' && sprite.x < sprite.get_output_end_x()) {
          sprite.x += sprite.speed;

          // output x축 마지막 위치를 넘어갔을 때
          if (sprite.x >= sprite.get_output_end_x()) {
            sprite.state = 'end';
            _app.remove(sprite);
          }
        } else if (sprite.state == 'wait') {
          sprite.x += sprite.wait_speed;

          if (sprite.wait_arrow == 'right' && sprite.x >= sprite.target_x) {
            sprite.set_x_rand();
          } else if (sprite.wait_arrow == 'left' && sprite.x <= sprite.target_x) {
            sprite.set_x_rand();
          }
        }
      }

      // 패킷 이미지 등록
      _app.add(sprite);

      packets.push(sprite);
    }

    // 반복 패킷 만들기
    function create_packet_loop() {
      create_packet();
      input_count++;
      // setTimeout( create_packet_loop, 1000/10 );
      setTimeout(create_packet_loop, 1000 / (Math.floor(Math.random() * 10) + 1));
    }

    // 생성자
    this.init = function () {
      create_packet_loop();
      // create_packet();
      input_update();
      output_update();
    }

    // 패킷 화면 업데이트
    this.update = function () {
      i = 0;
      len = packets.length;

      while (i < len) {
        packets[i].update();
        i++;
      }
    }
  }

  // 화면 업데이트
  function update() {
    _background.update();
    _txt.update();
    _packet.update();
  }

  // 생성자
  function init() {
    _app.update = update;

    // 초기 세팅
    _background.init();
    _txt.init();
    _packet.init();

    // 텍스트 숫자 제어
    // _txt.change_num('current_count', 29);
    // _txt.change_num('request_sec', 2);
    // _txt.change_num('response_sec', 5);
    // _txt.change_num('normal', 15);
    // _txt.change_num('warning', 7);
    // _txt.change_num('alarm', 7);
  }

  init();
}

//* 프리로드 후 시작
function preload_ready() {
  _APP = new CANVAS_RENDERER('canvasArea');
  _DRAW = new DRAW(_APP);

}

//* 초기 설정
function init() {

  // 이미지 프리로드
  _IMG_PRELOAD = new IMG_PRELOAD();
  _IMG_PRELOAD.add_image_urls(_PRELOAD_IMAGES);

  // 프리로드 시작
  _IMG_PRELOAD.load_start(preload_ready);
}

window.addEventListener('DOMContentLoaded', init, false);

// import CanvasRender from './js/CanvasRender.js';
// import Draw from './js/Draw.js';
// import packet_worker from './js/worker/worker.js';

// document.addEventListener('DOMContentLoaded', () => {
//   const app = new CanvasRender('canvasArea');
//   new Draw(app, packet_worker);
// });