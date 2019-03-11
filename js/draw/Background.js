class Background {
  constructor(app) {
    // console.log('Background class => app', app)
    this.app = app;
    this.init = this.init;
    this.update = this.update;
  }

  init() {
    const canvasWidth = this.app.getWidth();
    const canvasHeight = this.app.getHeight();
    const devideWidth = canvasWidth / 5;

    this.drawHorizontalLine(canvasWidth, canvasHeight);
    this.drawVerticalLine(canvasWidth, canvasHeight, devideWidth);
  }

  //수평선 그리기
  drawHorizontalLine(w, h) {
    const h_line = this.app.create.container(w, 6);

    h_line.ctx.strokeStyle = "rgb(255, 255, 255, 0.1)";
    h_line.ctx.lineWidth = 2;

    h_line.ctx.beginPath();
    h_line.ctx.moveTo(0, 1);
    h_line.ctx.lineTo(w, 1);
    h_line.ctx.stroke();

    h_line.ctx.beginPath();
    h_line.ctx.moveTo(0, 5);
    h_line.ctx.lineTo(w, 5);
    h_line.ctx.stroke();

    h_line.x = 0;
    h_line.y = (h * 0.5) - 3;
    this.app.add(h_line);
  }

  //수직선 그리기
  drawVerticalLine(w, h, d) {
    const startX = d * 2;
    const endX = d * 3;
    const contH = 100;
    const v_line = this.app.create.container(w, contH);

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
    v_line.y = (h * 0.5) - (contH * 0.5);

    this.app.add(v_line);
  }

  update() {

  }
}

export default Background;