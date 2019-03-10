class CanvasCreate {
  constructor(canvas) {
    this.canvas = canvas;
    this.image = this.create_image;
    this.sprite = this.create_sprite;
  }

  //캔버스에 그릴 기본적인 오브젝트
  createContainer(buffCtx) {
    const container = {
      ctx: buffCtx,
      x: 0,
      y: 0
    };

    return container;
  }

  container(w, h) {
    return this.createContainer(this.canvas.createCanvas(w, h));
  }

  create_image(url) {
    let ctx = this.canvas.createCanvas();
    let img = document.createElement('img');
    img.src = url;

    ctx.drawImage(img, 0, 0);// 캔버스에 임시로 그린다

    return createContainer(ctx);//이미지를 넘기는게 아니라 이미지를 그린 캔버스 컨텍스트를 넘긴다
  }

  create_sprite(url_arr) {
    let ctx = this.canvas.createCanvas();
    let imgs = [];
    let i = 0, len = url_arr.length;

    // 이미지 경로 갯수만큼 만들기
    while (i < len) {
      imgs[i] = document.createElement('img');
      imgs[i].src = url_arr[i];
      i++;
    }

    // 첫번째 이미지 그리기
    ctx.drawImage(imgs[0], 0, 0);// 캔버스에 임시로 그린다

    // 커스텀 컨테이너 세팅
    let container = this.createContainer(ctx);

    // 이미지 등록
    container.imgs = imgs;

    // 이미지 교체
    container.change = function (idx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(this.imgs[idx], 0, 0);
    }

    return container;
  }
}

export default CanvasCreate;