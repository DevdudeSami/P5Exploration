class Entity {
	position: p5.Vector;
	velocity: p5.Vector = createVector(0,0);
	acceleration: p5.Vector = createVector(0,0);
	dragCoefficient: number = 0;
	restitution: number = 1;
	density: number = 0.1;
	renderer: CircleRenderer;
	rendererUpdate: (e: Entity) => void;

	constructor(public mass: number, x: number, y: number) {
		this.position = createVector(x,y);
	}

	get direction(): p5.Vector {
		let direction = this.velocity.copy();
		direction.normalize();
		return direction;
	} 

	get radius(): number {
		let area = this.mass/this.density;
		return Math.sqrt(area/0.5);
	}

	setRenderer(renderer: CircleRenderer, rendererUpdate: (e: Entity) => void) {
		this.renderer = renderer;
		this.rendererUpdate = rendererUpdate;
	}

	/** Force: F = ma */
	applyForce(f: p5.Vector) {
		let da = p5.Vector.div(f, this.mass);
		this.acceleration.add(da);
	}

	/** Impulse: dp = mdv */
	applyImpulse(j: p5.Vector) {
		let dv = p5.Vector.div(j, this.mass);
		this.velocity.add(dv);
	}

	/** Drag */
	applyDrag() {
		let drag = this.direction;
		drag.mult(-this.dragCoefficient*this.velocity.magSq());
		this.applyForce(drag);
	}

	update() {
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		
		// Clear acceleration
		this.acceleration.mult(0);

		// Apply drag force
		this.applyDrag();

		this.rendererUpdate(this);
	};

	render() {
		if(this.renderer != null) this.renderer.render();
	};

}

/** Entity constructor. Entity is any object affected by physics. */
// let Entity = function(m, x, y) {
// 	this.mass = m;
// 	this.position = createVector(x, y);
// 	this.velocity = createVector(0, 0);
// 	this.acceleration = createVector(0, 0);
// 	this.dragCoefficient = 0;
// 	this.restitution = 1;
// 	this.density = 0.1;
// 	this.renderer = null;
// 	this.rendererUpdate = function(e) {};
// };

/** Setters */
// Entity.prototype.setMass = function(m) { this.mass = m; };
// Entity.prototype.setPosition = function(x, y) { this.position = createVector(x,y); };
// Entity.prototype.setVelocity = function(x, y) { this.velocity = createVector(x,y); };
// Entity.prototype.setAcceleration = function(x, y) { this.acceleration = createVector(x,y); };
// Entity.prototype.setDragCoefficient = function(c) { this.dragCoefficient = c; };
// Entity.prototype.setRestitution = function(e) { this.restitution = e; };
// Entity.prototype.setDensity = function(rho) { this.density = rho; };
// Entity.prototype.setRenderer = function(r, update) { 
// 	this.renderer = r; 
// 	this.rendererUpdate = update;
// };

// Entity.prototype.direction = function() {
// 	let direction = this.velocity.copy();
// 	direction.normalize();
// 	return direction;
// }

// Entity.prototype.radius = function() {
// 	let area = this.mass/this.density;
// 	return Math.sqrt(area/0.5);
// }

// /** Force: F = ma */
// Entity.prototype.applyForce = function(f) {
// 	let da = p5.Vector.div(f, this.mass);
//   this.acceleration.add(da);
// }

// /** Impulse: dp = mdv */
// Entity.prototype.applyImpulse = function(j) {
// 	let dv = p5.Vector.div(j, this.mass);
// 	this.velocity.add(dv);
// }

// /** Drag */
// Entity.prototype.applyDrag = function() {
// 	let drag = this.direction();
// 	drag.mult(-this.dragCoefficient*this.velocity.magSq());
// 	this.applyForce(drag);
// }

// Entity.prototype.update = function() {
//   this.velocity.add(this.acceleration);
// 	this.position.add(this.velocity);
	
// 	// Clear acceleration
// 	this.acceleration.mult(0);

// 	// Apply drag force
// 	this.applyDrag();

// 	this.rendererUpdate(this);
// };

// Entity.prototype.render = function() {
// 	if(this.renderer != null) this.renderer.render();
// };