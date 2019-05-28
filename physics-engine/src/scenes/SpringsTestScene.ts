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

		let e5 = new CircleEntity(50, 1000, 200, 30);
		let e6 = new CircleEntity(50, 1000, 700, 30);

		let a1 = new Anchor(800,200);
		let a2 = new Anchor(300,200);

		collection.addEntity(ground);
		collection.addEntities([e1,e2,e3,e4]);
		collection.addEntity(e5);
		collection.addEntity(e6);
		collection.addEntity(a1);
		collection.addEntity(a2);

		let s1 = new Spring(e1, e2, 200, 5);
		let s2 = new Spring(e2, e3, 200, 5);
		let s3 = new Spring(e3, e4, 200, 5);
		let s4 = new Spring(e4, e1, 200, 5);

		let sa2 = new Spring(e5,e6,200,20);
		let sa1 = new Spring(e5,a1,200,20);
		let sa3 = new Spring(e6,a1,200,20);
		let sa4 = new Spring(e6,e1,200,20);
		let sa5 = new Spring(e6,e2,200,20);
		let sa6 = new Spring(e5,a2,200,20);
		let sa7 = new Spring(e3,a2,200,20);

		this.addChild(collection);
		this.addChildren([s1,s2,s3,s4]);
		this.addChildren([sa1,sa2,sa3,sa4,sa5,sa6,sa7]);
	}

}