var _WORKER = undefined;

function WORKER() {
  var _this = this;
  _worker = new Worker('./js/worker/w_in_packet.js');

  // 매칭 될 함수
  var match_funcs = {
    sum: res_sum
  };

  function send(type, data) {
    _worker.postMessage({
      type: type,
      val: data
    });
  }

  function on(e) {
    var type = e.data.type;
    var data = e.data.val;

    (match_funcs.hasOwnProperty(type)) && (
      match_funcs[type](data)
    );
  }

  function req_sum(num1, num2) {
    send('sum', [num1, num2]);
  }

  this.sum = req_sum;

  function res_sum(data) {
    (_this.hasOwnProperty('res_sum')) && (
      _this.res_sum(data)
    );
  }

  function init() {
    _worker.onmessage = on;
  }

  init();
}

function dom_ready() {
  if (typeof (Worker) !== "undefined") {
    _WORKER = new WORKER();
    _WORKER.sum(10, 20);
    _WORKER.res_sum = function (result) {
      console.log('res_sum', result)
    }
  } else {


  }
}

window.addEventListener('DOMContentLoaded', dom_ready, false);









  // var in_packet = new Worker('./js/worker/w_in_packet.js');
  // var value_sum = {
  //     a: 1,
  //     b: 2,
  //     type: 'sum'
  // };

  // var value_minus = {
  //     a: 3,
  //     b: 2,
  //     type: 'minus'
  // }

  // in_packet.postMessage(value_sum); // 보낼때
  // in_packet.postMessage(value_minus); // 보낼때
  // in_packet.onmessage = function (e) { // 받을때
  //     console.log('result => ', e.data);
  // };