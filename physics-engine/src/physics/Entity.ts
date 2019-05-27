class Entity implements Renderable {
	position: p5.Vector;
	velocity: p5.Vector = createVector(0,0);
	acceleration: p5.Vector = createVector(0,0);
	dragCoefficient: number = 0;
	restitution: number = 1;
	isStatic = false;

	constructor(public mass: number, x: number, y: number) {
		this.position = createVector(x,y);
	}

	get direction(): p5.Vector {
		let direction = this.velocity.copy();
		direction.normalize();
		return direction;
	}

	get collisionMetric(): number {
		throw new Error("Override this property.");
	}

	/** Force: F = ma */
	applyForce(f: p5.Vector) {
		if(this.isStatic) return;
		let da = p5.Vector.div(f, this.mass);
		this.acceleration.add(da);
	}

	/** Impulse: dp = mdv */
	applyImpulse(j: p5.Vector) {
		if(this.isStatic) return;
		let dv = p5.Vector.div(j, this.mass);
		this.velocity.add(dv);
	}

	/** Drag */
	applyDrag() {
		if(this.isStatic) return;
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
	}

	render() {
	}

}