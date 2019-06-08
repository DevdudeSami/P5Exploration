/// <reference path="./Scene.ts" />

class SpringMassScene extends Scene {

	setup() {
		super.setup();

		this.backgroundColor = [0,80,190];

		let collection = new EntityCollection();
		collection.G = 0;

		let phi = 1.61803398875

		let springLength = 200;
		let n = 20;
		let seperation = 80;

		let startAnchor = new Anchor(0,200);
		let endAnchor = new Anchor(100+(n-1)*seperation+100,200);
		collection.addEntity(startAnchor);
		collection.addEntity(endAnchor);

		let k = 0.001

		let entities = []
		for(let i = 0; i < n; i++) {
			let e = new CircleEntity(400, 100+i*seperation, 200, 30);
			e.restitution = 1;
			entities.push(e);

			if(i==0) {
				this.addChild(new Spring(startAnchor, e, springLength, k))
			}
			else {
				this.addChild(new Spring(e, entities[i-1], springLength, k))
			}

			if(i==n-1) {
				this.addChild(new Spring(endAnchor, entities[n-1], springLength, k))
			}

			k *= phi
		}
		
		collection.addEntities(entities);
		this.addChild(collection);
	}

}


function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}