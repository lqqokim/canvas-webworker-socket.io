class Text {
  constructor(app) {
    this.app = app;
    this.init = this.init;
    this.update = this.update;
    this.change_num = this.changeCanvasNum;

    this.current_count = {
      num: undefined,
      txt: undefined,
      type: 'current_count'
    };

    this.request_sec = {
      num: undefined,
      txt: undefined,
      type: 'request_sec'
    };

    this.response_sec = {
      num: undefined,
      txt: undefined,
      type: 'response_sec'
    };

    this.warning = {
      num: undefined,
      txt: undefined,
      type: 'warning'
    };

    this.normal = {
      num: undefined,
      txt: undefined,
      type: 'normal'
    };

    this.alarm = {
      num: undefined,
      txt: undefined,
      type: 'alarm'
    };

    // this.init();
  }

  init() {
    this.initCurrentCount();
    this.initRequestSec();
    this.initResponseSec();
    this.initWarning();
    this.initNormal();
    this.initAlarm();
  }

  initCurrentCount() {
    const commH = (this.app.getHeight() / 2) - (50 + 50);
    const left_margin = 10;

    this.current_count.num = this.create_text('0', 50, 30, left_margin, commH, 25, '#cccccc', 'right');
    this.current_count.txt = this.create_text('현재 전체 건수', 150, 30, left_margin + 55, commH, 15, '#cccccc', 'left');
  }

  initRequestSec() {
    const commH = (this.app.getHeight() / 2) - (50);
    const left_margin = 10;

    this.request_sec.num = this.create_text('0', 50, 30, left_margin, commH, 25, '#cccccc', 'right');
    this.request_sec.txt = this.create_text('요청/초', 150, 30, left_margin + 55, commH, 15, '#cccccc', 'left');
  }

  initResponseSec() {
    const commH = (this.app.getHeight() / 2) - (50);
    const left_margin = this.app.getWidth() - 120;

    this.response_sec.num = this.create_text('0', 150, 30, left_margin + 55, commH, 25, '#cccccc', 'left');
    this.response_sec.txt = this.create_text('응답/초', 50, 30, left_margin, commH, 15, '#cccccc', 'right');
  }

  initWarning() {
    const commH = (this.app.getHeight() / 2) - (50 + 50);
    const left_margin = (this.app.getWidth() / 2) - (105 / 2);

    this.warning.num = this.create_text('0', 50, 30, left_margin, commH, 25, '#ffff33', 'right');
    this.warning.txt = this.create_text('경고', 50, 30, left_margin + 55, commH, 15, '#cccccc', 'left');
  }

  initNormal() {
    const commH = (this.app.getHeight() / 2) - (50 + 50);
    const left_margin = (this.app.getWidth() / 2) - (105 / 2) - 120;

    this.normal.num = this.create_text('0', 50, 30, left_margin, commH, 25, '#99ccff', 'right');
    this.normal.txt = this.create_text('정상', 50, 30, left_margin + 55, commH, 15, '#cccccc', 'left');
  }

  initAlarm() {
    const commH = (this.app.getHeight() / 2) - (50 + 50);
    const left_margin = (this.app.getWidth() / 2) - (105 / 2) + 120;

    this.alarm.num = this.create_text('0', 50, 30, left_margin, commH, 25, '#ff3333', 'right');
    this.alarm.txt = this.create_text('심각', 50, 30, left_margin + 55, commH, 15, '#cccccc', 'left');
  }

  create_text(txt, w, h, x, y, size, color, align) {
    const cont = this.app.create.container(w, h);

    cont.ctx.font = (size === undefined) ? '22px MS' : size + 'px MS';
    cont.ctx.fillStyle = (color === undefined) ? '#333333' : color;
    cont.ctx.textAlign = (align === undefined) ? 'left' : align;
    cont.ctx.textBaseline = 'middle';

    let align_x = 0;
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

    this.app.add(cont);
    return cont;
  }

  changeCanvasNum(type, num) {
    let item;

    switch (type) {
      case 'current_count':
        item = this.current_count;
        break;
      case 'request_sec':
        item = this.request_sec;
        break;
      case 'response_sec':
        item = this.response_sec;
        break;
      case 'warning':
        item = this.warning;
        break;
      case 'normal':
        item = this.normal;
        break;
      case 'alarm':
        item = this.alarm;
        break;
    }

    item.num.ctx.clearRect(0, 0, item.num.ctx.canvas.width, item.num.ctx.canvas.height);
    item.num.ctx.fillText(num, item.num.align_x, item.num.align_y);
  }

  update() {

  }
}

export default Text;