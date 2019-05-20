WIDTH = 500;
HEIGHT = 500;
var yoffset = 0;
function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  background(51);
  drawBlobCircle(WIDTH/2, HEIGHT/2, 150)
}

function drawBlobCircle(x, y, r) {
  push();
  translate(x,y);
  beginShape();
  var xoffset = 0;
  for (var i = 0; i < TWO_PI; i+= 0.1) {
    var radius = r + map(noise(xoffset, yoffset), 0, 1, -25, 25);
    var x = radius * cos(i);
    var y = radius * sin(i);
    vertex(x, y);
    xoffset += 0.1;
  }
  endShape();
  pop();

  yoffset += 0.1;
}
