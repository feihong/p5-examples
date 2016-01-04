'use strict';

var hueValue = 180

function setup() {
  createCanvas(500, 500)
  background('ivory')
  colorMode(HSB)
}

function draw() {
}

// Putting this code inside of draw() won't work.
function mouseMoved() {
  var dx = abs(mouseX - pmouseX)
  var dy = abs(mouseY - pmouseY)
  var d = sqrt(sq(dx) + sq(dy))

  d = (d > 20) ? 20 : d   // cap at 20
  strokeWeight(d)

  hueValue = (hueValue + 0.5) % 360
  stroke(hueValue, 80, 100)

  line(pmouseX, pmouseY, mouseX, mouseY)
}

function keyPressed() {
  if (key === 'X') {
    background('ivory')
  }
}
