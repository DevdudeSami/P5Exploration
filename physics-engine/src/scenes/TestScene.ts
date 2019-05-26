class TestScene {
	collection: EntityCollection = new EntityCollection();


	setup() {
		createCanvas(windowWidth, windowHeight);
		background(127);
			
		this.collection = new EntityCollection();
		this.collection.G = 0;

		let biggerEntity = new Entity(50, 100, 400);
		let bigEntity = new Entity(100, 300, 400);
		let smallEntity = new Entity(100, 600, 400);
		let smallerEntity = new Entity(100, 1000, 400);

		let rendererUpdate = function(e: Entity) {
			e.renderer.update(e.position, e.radius, 15+255*(e.density/0.1));
		}

		biggerEntity.restitution = 0;
		bigEntity.restitution = 0;
		smallEntity.restitution = 0;
		smallerEntity.restitution = 0;

		// bigEntity.setDensity(1);
		// smallerEntity.setDensity(0.05);

		// biggerEntity.setRenderer(new CircleRenderer(), rendererUpdate);
		// bigEntity.setRenderer(new CircleRenderer(), rendererUpdate);
		smallEntity.setRenderer(new CircleRenderer(), rendererUpdate);
		smallerEntity.setRenderer(new CircleRenderer(), rendererUpdate);

		// biggerEntity.applyImpulse(createVector(0, 100));
		bigEntity.applyImpulse(createVector(0, -100));
		smallEntity.applyImpulse(createVector(100, 0));
		smallerEntity.applyImpulse(createVector(-100, 0));
		this.collection.addEntities([smallEntity, smallerEntity]);
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