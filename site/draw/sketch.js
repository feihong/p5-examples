'use strict';

function setup() {
  createCanvas(500, 500)
  background('ivory')
}

function draw() {
  stroke(0)
}

// Putting this code inside of draw() won't work.
function mouseMoved() {
  var dx = Math.abs(mouseX - pmouseX)
  var dy = Math.abs(mouseY - pmouseY)
  var d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

  d = (d > 20) ? 20 : d   // cap at 20
  strokeWeight(d)

  line(pmouseX, pmouseY, mouseX, mouseY)
}
