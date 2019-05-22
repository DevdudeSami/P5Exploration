let EntityCollection = function() {
	this.entities = [];
	this.entityIDs = {}; // Entities may have optional IDs.
	this.G = 0.00001;
}

EntityCollection.prototype.addEntity = function(e, id) { 
	this.entities.push(e); 
	if(id !== undefined) this.entityIDs[id] = e.length-1;
};
EntityCollection.prototype.addEntities = function(es) { this.entities = this.entities.concat(es); }
EntityCollection.prototype.removeEntity = function(index) { this.entities.splice(index, 1); }
EntityCollection.prototype.removeEntityByID = function(id) { 
	if(id in this.entityIDs) this.removeEntity(this.entityIDs[id]);
	else console.error("Entity ID does not exist.");
};
EntityCollection.prototype.setG = function(G) { this.G = G; };

EntityCollection.prototype.count = function() { return this.entities.length; };

EntityCollection.prototype.update = function() {
	// Update all children
	this.applyGravitationalForces();
	this.checkCollisions();
	this.camera();
	this.entities.forEach(e => { e.update() });
};

EntityCollection.prototype.render = function() {
	// Display all children
	this.entities.forEach(e => { e.render() });
};

EntityCollection.prototype.applyGravitationalForces = function() {
	for(let i = 0; i < this.count()-1; i++) {
		for(let j = i+1; j < this.count(); j++) {
			// f = G*m1*m2/r^2
			let r = this.entities[i].position.dist(this.entities[j].position);
			let m1 = this.entities[i].mass;
			let m2 = this.entities[j].mass;
			let f = this.G*m1*m2/Math.pow(r,2);
			let theta = p5.Vector.sub(this.entities[j].position, this.entities[i].position).heading();
			let f_vector = p5.Vector.fromAngle(theta, f);

			this.entities[i].applyForce(f_vector);
			this.entities[j].applyForce(f_vector.mult(-1));
		}
	}
};

EntityCollection.prototype.checkCollisions = function() {
	// Assume simple spherical shape whose radius is the mass
	for(let i = 0; i < this.count()-1; i++) {
		for(let j = i+1; j < this.count(); j++) {
			let e1 = this.entities[i];
			let e2 = this.entities[j];

			let dr = e1.position.dist(e2.position); // Distance between
			let Dr = e1.radius() + e2.radius(); // Sum of radii
			
			if(Dr-dr >= 0) {
				this.collision(e1,e2,Dr-dr);
			}
		}
	}
}

EntityCollection.prototype.collision = function(e1, e2, d) {
	let contactNormal = p5.Vector.sub(e1.velocity, e2.velocity);
	contactNormal.normalize();
	
	let totalMass = e1.mass + e2.mass;
	let restitution = e1.restitution*e2.restitution;
	
	let ds1 = contactNormal.copy();
	ds1.mult(d*e2.mass/totalMass);
	e1.position.sub(ds1);
	
	let ds2 = contactNormal.copy();
	ds2.mult(-d*e1.mass/totalMass);
	e2.position.sub(ds2);

	let du = p5.Vector.sub(e1.velocity, e2.velocity);

	let p1 = p5.Vector.mult(e1.velocity, e1.mass);
	let p2 = p5.Vector.mult(e2.velocity, e2.mass);
	let totalMomentum = p5.Vector.add(p1, p2);

	let v1 = p5.Vector.add(totalMomentum, p5.Vector.mult(du, -e2.mass*restitution));
	v1.div(totalMass);
	let v2 = p5.Vector.add(totalMomentum, p5.Vector.mult(du, e1.mass*restitution));
	v2.div(totalMass);

	e1.setVelocity(v1.x, v1.y);
	e2.setVelocity(v2.x, v2.y);
}

EntityCollection.prototype.camera = function() {
	let v = -10;
	
	let ds = createVector(0, 0);
	if(keyIsDown(LEFT_ARROW)) {
		ds.add(createVector(-v,0));
	}
	if(keyIsDown(RIGHT_ARROW)) {
		ds.add(createVector(v,0));
	}
	if(keyIsDown(UP_ARROW)) {
		ds.add(createVector(0,-v));
	}
	if(keyIsDown(DOWN_ARROW)) {
		ds.add(createVector(0,v));
	}

	this.entities.forEach(e => {
		e.position.add(ds);
	})
}