import CanvasRender from './js/CanvasRender.js';
import Draw from './js/Draw.js';
import packet_worker from './js/worker/worker.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = new CanvasRender('canvasArea');
  new Draw(app, packet_worker);
});