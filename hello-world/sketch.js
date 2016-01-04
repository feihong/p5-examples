'use strict';

function setup() {
  createCanvas(300, 300)
  background('palegoldenrod')
}

function draw() {
  rectMode(CENTER)
  stroke(0)

  fill('white')
  ellipse(75, 110, 40, 60)  // body
  rect(75, 75, 50, 50)      // heady

  fill('black')

  // face
  ellipse(60, 60, 5, 5)
  ellipse(90, 60, 5, 5)
  line(60, 90, 90, 90)
  line(60, 90, 60, 80)
  line(90, 90, 90, 80)

  // limbs
  line(55, 110, 30, 100)
  line(95, 110, 120, 100)
  line(60, 130, 50, 160)
  line(90, 130, 100, 160)
}
