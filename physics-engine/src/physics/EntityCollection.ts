class EntityCollection implements Renderable {
	entities: Entity[] = [];
	entityIDs: { [id: string]: number } = {};
	G: number = 0.00001;

	addEntity(e: Entity, id?: string) { 
		this.entities.push(e); 
		if(id !== undefined) this.entityIDs[id] = this.entities.length-1;
	};
	addEntities(es: Entity[]) { this.entities = this.entities.concat(es); }
	removeEntity(index: number) { this.entities.splice(index, 1); }
	removeEntityByID(id: string) { 
		if(id in this.entityIDs) this.removeEntity(this.entityIDs[id]);
		else console.error("Entity ID does not exist.");
	};
	
	get count(): number { return this.entities.length; };
	
	update() {
		this.applyGravitationalForces();
		this.checkCollisions();
		this.camera();
		this.entities.forEach(e => { e.update() });
	};
	
	render() {
		// Display all children
		this.entities.forEach(e => { e.render() });
	};
	
	applyGravitationalForces() {
		for(let i = 0; i < this.count-1; i++) {
			for(let j = i+1; j < this.count; j++) {
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
	
	checkCollisions() {
		for(let i = 0; i < this.count-1; i++) {
			for(let j = i+1; j < this.count; j++) {
				let e1 = this.entities[i];
				let e2 = this.entities[j];
	
				let dr = e1.position.dist(e2.position); // Distance between
				let Dr = e1.collisionMetric + e2.collisionMetric; // Sum of radii
				
				if(Dr-dr >= 0) {
					this.collision(e1,e2,Dr-dr);
				}
			}
		}
	}
	
	collision(e1: Entity, e2: Entity, d: number) {
		let contactNormal = p5.Vector.sub(e1.velocity, e2.velocity);
		contactNormal.normalize();
		
		let totalMass = e1.mass + e2.mass;
		let restitution = e1.restitution*e2.restitution;
		
		if(!e1.isStatic) {
			let ds1 = contactNormal.copy();
			ds1.mult(d*e2.mass/totalMass);
			e1.position.sub(ds1);
		}
		
		if(!e2.isStatic) {
			let ds2 = contactNormal.copy();
			ds2.mult(-d*e1.mass/totalMass);
			e2.position.sub(ds2);
		}
	
		let du = p5.Vector.sub(e1.velocity, e2.velocity);
	
		let p1 = p5.Vector.mult(e1.velocity, e1.mass);
		let p2 = p5.Vector.mult(e2.velocity, e2.mass);
		let totalMomentum = p5.Vector.add(p1, p2);
	
		let v1 = p5.Vector.add(totalMomentum, p5.Vector.mult(du, -e2.mass*restitution));
		v1.div(totalMass);
		let v2 = p5.Vector.add(totalMomentum, p5.Vector.mult(du, e1.mass*restitution));
		v2.div(totalMass);
	
		if(!e1.isStatic) e1.velocity = v1;
		if(!e2.isStatic) e2.velocity = v2;
	}
	
	camera() {
		let v = -10;
		
		let ds = createVector(0, 0);
		if(keyIsDown(37)) { // LEFT
			ds.add(createVector(-v,0));
		}
		if(keyIsDown(39)) { // RIGHT
			ds.add(createVector(v,0));
		}
		if(keyIsDown(38)) { // UP
			ds.add(createVector(0,-v));
		}
		if(keyIsDown(40)) { // DOWN
			ds.add(createVector(0,v));
		}
	
		this.entities.forEach(e => {
			e.position.add(ds);
		})
	}
}