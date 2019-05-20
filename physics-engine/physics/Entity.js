/** Entity constructor. Entity is any object affected by physics. */
let Entity = function(m, x, y) {
	this.mass = m;
	this.position = createVector(x, y);
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);
	this.frictionCoefficient = 0;
};

/** Setters */
Entity.prototype.setMass = function(m) { this.mass = m; };
Entity.prototype.setPosition = function(x, y) { this.position = createVector(x,y); };
Entity.prototype.setVelocity = function(x, y) { this.velocity = createVector(x,y); };
Entity.prototype.setAcceleration = function(x, y) { this.acceleration = createVector(x,y); };
Entity.prototype.setFrictionCoefficient = function(mu) { this.frictionCoefficient = mu; };

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

Entity.prototype.update = function() {
  this.velocity.add(this.acceleration);
	this.position.add(this.velocity);

	// Clear acceleration
	this.acceleration.mult(0);
};

Entity.prototype.render = function() {
  stroke(0);
  strokeWeight(2);
  fill(255,127);
  ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16);
};