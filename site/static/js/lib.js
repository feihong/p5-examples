'use strict';

(function() {

  var a = document.querySelector('a.show-grid')
  a.onclick = (evt) => {
    evt.preventDefault()
    drawGrid()
  }

  function drawGrid() {
    var canvas = document.querySelector('canvas')
    var w = canvas.clientWidth
    var h = canvas.clientHeight
    var ctx = canvas.getContext('2d')

    ctx.strokeStyle = 'lightgray'

    for (var i=10; i < w; i+=10) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, h)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(w, i)
      ctx.stroke()
    }
  }

})()
