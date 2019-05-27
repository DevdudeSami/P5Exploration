class TestScene {
	collection: EntityCollection = new EntityCollection();


	setup() {
		createCanvas(windowWidth, windowHeight);
		background(127);
			
		this.collection = new EntityCollection();
		this.collection.G = 30;
		
		let entity1 = new CircleEntity(25, 900, 400, 20);
		let entity2 = new CircleEntity(25, 800, 400, 20);
		let entity3 = new CircleEntity(1100, 100, 400, 200);
		let entity4 = new CircleEntity(100, 700, 400, 50);

		entity1.restitution = 0;
		entity2.restitution = 1;
		entity3.restitution = 1;
		entity4.restitution = 1;

		entity1.applyImpulse(createVector(0, 300));
		entity2.applyImpulse(createVector(0, 250));
		entity3.applyImpulse(createVector(0, 0));
		entity4.applyImpulse(createVector(0, 300));
		this.collection.addEntities([entity1, entity2, entity3, entity4]);
	}

	update() {
		this.collection.update();
	}

	render() {
		background(127);

		this.collection.render();

		let fps = frameRate();
		fill(255);
		stroke(0);
		text("FPS: " + fps.toFixed(2), 10, height - 10);
	}

}