import CanvasRender from './js/CanvasRender.js';
import Draw from './js/Draw.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = new CanvasRender('canvasArea');
  new Draw(app);
});