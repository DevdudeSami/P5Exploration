/// <reference path="./Scene.ts" />

class SpringsTestScene extends Scene {

	setup() {
		super.setup();

		this.backgroundColor = [0,80,190];

		let collection = new EntityCollection();
		collection.G = 1;

		let ground = new CircleEntity(3000000000, 750, 100950, 100000);
		// ground.isStatic = false;
		ground.restitution = 1;
		ground.fill = [165,42,42];

		let e1 = new CircleEntity(50, 100, 100, 30);
		let e2 = new CircleEntity(50, 300, 100, 30);
		let e3 = new CircleEntity(50, 100, 300, 30);
		let e4 = new CircleEntity(50, 300, 300, 30);

		collection.addEntity(ground);
		collection.addEntities([e1,e2,e3,e4]);

		let s1 = new Spring(e1, e2, 200, 5);
		let s2 = new Spring(e2, e3, 200, 5);
		let s3 = new Spring(e3, e4, 200, 5);
		let s4 = new Spring(e4, e1, 200, 5);

		this.addChild(collection);
		this.addChildren([s1,s2,s3,s4]);
	}

}