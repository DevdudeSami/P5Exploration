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
			let Dr = e1.mass + e2.mass // Sum of radii
			
			if(dr <= Dr) {
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
	let dv = p5.Vector.mult(du,-restitution);

	j1 = p5.Vector.sub(dv,du);
	j1.mult(e1.mass);
	j2 = p5.Vector.sub(dv,du);
	j2.mult(-e2.mass);

	e1.applyImpulse(j1);
	e2.applyImpulse(j2);
}