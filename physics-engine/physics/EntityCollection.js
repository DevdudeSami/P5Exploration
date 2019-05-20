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
	this.entities.forEach(e => { e.update() });
	this.computeGravitationalForces();
};

EntityCollection.prototype.render = function() {
	// Display all children
	this.entities.forEach(e => { e.render() });
};

EntityCollection.prototype.computeGravitationalForces = function() {
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
