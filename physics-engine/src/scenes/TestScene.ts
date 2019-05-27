class TestScene {
	collection: EntityCollection = new EntityCollection();


	setup() {
		createCanvas(windowWidth, windowHeight);
		background(127);
			
		this.collection = new EntityCollection();
		this.collection.G = 30;
		
		let entity1 = new CircleEntity(1100, 30, 400, 100); // sun
		let entity2 = new CircleEntity(100, 700, 400, 30); // earth
		let entity3 = new CircleEntity(25, 770, 400, 15); // moon
		let entity4 = new CircleEntity(100, 200, 400, 30); // planet 1 (mercury)
		let entity5 = new CircleEntity(100, 400, 400, 30); // planet 2 (venus)

		entity1.fill = [255,255,0];
		entity2.fill = [0,0,200];
		entity3.fill = [120,120,120];
		entity4.fill = [50,50,50];

		entity1.restitution = 1;
		entity2.restitution = 1;
		entity3.restitution = 1;
		entity4.restitution = 1;

		entity1.applyImpulse(createVector(0, 0));
		entity2.applyImpulse(createVector(0, 700));
		entity3.applyImpulse(createVector(0, 350));
		entity4.applyImpulse(createVector(0, 1500));
		entity5.applyImpulse(createVector(0, 1300));
		this.collection.addEntities([entity1, entity2, entity3, entity4]);
	}

	update() {
		this.collection.update();
	}

	render() {
		background(0);

		this.collection.render();

		let fps = frameRate();
		fill(255);
		stroke(0);
		text("FPS: " + fps.toFixed(2), 10, height - 10);
	}

}