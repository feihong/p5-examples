'use strict';

var tx = 0
var ty = 0
var moving = false
var hueValue = 40
var hueDelta = 1

function setup() {
  createCanvas(300, 300)
  rectMode(CENTER)
  colorMode(HSB)
}

function draw() {
  background(hueValue, 50, 100)
  push()
  translate(tx, ty)
  drawRobot()
  pop()
}

function keyPressed() {
  moving = true
  hueValue += hueDelta
  if (hueValue === 0) {
    hueDelta = 1
  } else if (hueValue === 50) {
    hueDelta = -1
  }

  const delta = 5
  switch (keyCode) {
    case 37:
      tx -= delta
      break
    case 39:
      tx += delta
      break
    case 38:
      ty -= delta
      break
    case 40:
      ty += delta
      break
  }
}

function keyReleased() {
  moving = false
}

function drawRobot() {
  stroke(0)
  fill('white')
  ellipse(75, 110, 40, 60)  // body
  rect(75, 75, 50, 50)      // head

  fill('black')

  // face
  fill(moving ? 'aqua' : 'black')
  ellipse(60, 60, 5, 5)       // left eye
  ellipse(90, 60, 5, 5)       // right eye
  arc(75, 80, 30, 20, 0, PI, CHORD)  // mouth

  // limbs
  line(55, 110, 30, 100)    // left arm
  line(95, 110, 120, 100)   // right arm
  line(60, 130, 50, 160)    // left leg
  line(90, 130, 100, 160)   // right leg
}
