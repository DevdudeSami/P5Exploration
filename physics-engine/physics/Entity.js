/** Entity constructor. Entity is any object affected by physics. */
let Entity = function(m, x, y) {
	this.mass = m;
	this.position = createVector(x, y);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);
	this.dragCoefficient = 0;
};

/** Setters */
Entity.prototype.setMass = function(m) { this.mass = m; };
Entity.prototype.setPosition = function(x, y) { this.position = createVector(x,y); };
Entity.prototype.setVelocity = function(x, y) { this.velocity = createVector(x,y); };
Entity.prototype.setAcceleration = function(x, y) { this.acceleration = createVector(x,y); };
Entity.prototype.setDragCoefficient = function(c) { this.dragCoefficient = c; };

Entity.prototype.direction = function() {
	let direction = this.velocity.copy();
	direction.normalize();
	return direction;
}

/** Force: F = ma */
Entity.prototype.applyForce = function(f) {
	let da = p5.Vector.div(f, this.mass);
  this.acceleration.add(da);
}

/** Impulse: dp = mdv */
Entity.prototype.applyImpulse = function(j) {
	let dv = p5.Vector.div(j, this.mass);
	this.velocity.add(dv);
}

/** Drag */
Entity.prototype.applyDrag = function() {
	let drag = this.direction();
	drag.mult(-this.dragCoefficient*this.velocity.magSq());
	this.applyForce(drag);
}

Entity.prototype.update = function() {
  this.velocity.add(this.acceleration);
	this.position.add(this.velocity);
	
	// Clear acceleration
	this.acceleration.mult(0);

	// Apply friction force
	this.applyDrag();

};
let yoffset = 0;
Entity.prototype.render = function() {
  // stroke(0);
  // strokeWeight(2);
  // fill(255,127);
	// ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2);
	push();
  translate(this.position.x,this.position.y);
  beginShape();
  var xoffset = 0;
  for (var i = 0; i < TWO_PI; i+= 0.1) {
    var radius = this.mass*2 + map(noise(xoffset, yoffset), 0, 1, -25, 25);
    var x = radius * cos(i);
    var y = radius * sin(i);
    vertex(x, y);
    xoffset += 0.1;
  }
  endShape();
  pop();

  yoffset += 0.1;
};