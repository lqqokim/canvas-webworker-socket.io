class Canvas {
  ctx = undefined;
  targetEl = undefined;

  constructor(targetElementId) {
    this.targetElementId = targetElementId;
    this.init();
  }

  init() {
    if (!this.targetElementId) return;
    this.targetEl = document.querySelector('#' + this.targetElementId);
    this.ctx = this.createCanvas();
    this.targetEl.appendChild(this.ctx.canvas);

    this.bindEvent();
    this.resizeCanvas();
    console.log('Canvas init!!', this)
  }

  createCanvas(width, height) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (width !== undefined && height !== undefined) {
      canvas.width = width;
      canvas.height = height;
    }

    return ctx;
  }

  bindEvent() {
    window.addEventListener('resize', this.resizeCanvas, false);
  }

  resizeCanvas() {
    this.ctx.canvas.width = this.targetEl.clientWidth * 2;
    this.ctx.canvas.height = this.targetEl.clientHeight * 2;
    this.ctx.canvas.style = `width:${this.targetEl.clientWidth}px; height:${this.targetEl.clientHeight}px`;
  }

  getContext() {
    return this.ctx;
  }
}

export default Canvas;