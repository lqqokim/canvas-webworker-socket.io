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
    this.initCanvasSize();
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

  getTargetSize() {
    return {
      width: this.targetEl.clientWidth,
      height: this.targetEl.clientHeight
    };
  }

  bindEvent() {
    let timer;

    window.addEventListener('resize', () => {
      timer && clearTimeout(timer);
      timer = setTimeout(this.initCanvasSize())
    }, false);
  }

  initCanvasSize() {
    // this.ctx.canvas.width = this.getTargetSize().width * 2;
    // this.ctx.canvas.height =  this.getTargetSize().height * 2;
    // this.ctx.canvas.style = `width:${this.targetEl.clientWidth}px; height:${this.targetEl.clientHeight}px`;
    console.log(this)
    this.ctx.canvas.width = this.targetEl.clientWidth;
    this.ctx.canvas.height =  this.targetEl.clientHeight ;
  }

  getContext() {
    return this.ctx;
  }
}

export default Canvas;