'use strict';

(function() {

  var gridCanvas = $('canvas#grid')
  var coordsDiv = $('#controls .coords')
  $('#controls button').on('click', function() {
    gridCanvas.toggleClass('hidden')
    var hidden = $(this).text() === 'Show grid'
    $(this).text(hidden ? 'Hide grid' : 'Show grid')
  })

  gridCanvas.on('mousemove', showCoordinates)
  gridCanvas.on('mouseenter', () => gridCanvas.css('opacity', 1))
  gridCanvas.on('mouseleave', () => {
    gridCanvas.css('opacity', 0)
    coordsDiv.text('(?, ?)')
  })

  checkForCanvas()

  function checkForCanvas(callback) {
    if ($('#defaultCanvas0').length) {
      initialize()
    } else {
      window.setTimeout(checkForCanvas, 50)
    }
  }

  function initialize() {
    var canvas = $('#defaultCanvas0')

    var w = canvas.width()
    var h = canvas.height()

    var container = $('#container')
    container.width(w)
    container.height(h)

    gridCanvas.width(w)
    gridCanvas.height(h)
    gridCanvas[0].width = w
    gridCanvas[0].height = h

    container.append(canvas)
    drawGrid()
  }

  function drawGrid() {
    var canvas = gridCanvas[0]
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
    coordsDiv.text(`(${evt.offsetX}, ${evt.offsetY})`)
  }

})()
