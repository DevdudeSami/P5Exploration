/// <reference path="./Scene.ts" />

class FallingObjectsScene extends Scene {
	collection = new EntityCollection();

	setup() {
		super.setup();

		this.backgroundColor = [0,0,80];
		
		this.collection = new EntityCollection();
		this.collection.G = 3;

		let ground = new CircleEntity(1000000000, 750, 100950, 100000);
		// ground.isStatic = false;
		ground.restitution = 0.5;
		ground.fill = [165,42,42];

		let object1 = new CircleEntity(100, 100, 100, 75);
		let object2 = new CircleEntity(25, 400, 100, 50);
		let object3 = new CircleEntity(10, 600, 100, 20);
		let object4 = new CircleEntity(500, 1000, 100, 200);
		let object5 = new CircleEntity(400, 1600, 100, 100);

		this.collection.addEntity(ground);
		this.collection.addEntity(object1);
		this.collection.addEntity(object2);
		this.collection.addEntity(object3);
		this.collection.addEntity(object4);
		this.collection.addEntity(object5);

		this.addChild(this.collection);
	}	
}

