'use strict';

(function() {

  var a = document.querySelector('a.show-grid')
  var canvas = null
  var coordsDiv = document.createElement('div')
  coordsDiv.textContent = '(?, ?)'
  var yOffset = null
  var xOffset = null

  a.onclick = (evt) => {
    evt.preventDefault()

    canvas = document.querySelector('canvas')

    // Insert coordsDiv before canvas
    canvas.parentNode.insertBefore(coordsDiv, canvas)

    var rect = canvas.getBoundingClientRect()
    xOffset = Math.round(rect.x)
    yOffset = Math.round(rect.y)

    canvas.onmousemove = showCoordinates
    canvas.onmouseleave = () => {
      coordsDiv.textContent = '(?, ?)'
    }
    drawGrid()
  }

  function drawGrid() {
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

  function showCoordinates(evt) {
    coordsDiv.textContent = `(${evt.clientX - xOffset - 1}, ${evt.clientY - yOffset - 2})`
  }

})()
