/// <reference path="./Scene.ts" />

class ParticleCollectionScene extends Scene {
	collection = new EntityCollection();
	nX = 10;
	nY = 10;

	setup() {
		super.setup();

		this.backgroundColor = [120,120,120];
		
		this.collection = new EntityCollection();
		this.collection.G = 3;
	
		let xOffset = 100;
		let yOffset = 100;
		let padding = 150;
	
		for(let i = 0; i < this.nX; i++) {
			for(let j = 0; j < this.nY; j++) {
				let e = new CircleEntity(10, xOffset+padding*i, yOffset+padding*j, 20);
				e.restitution = 1;
				this.collection.addEntity(e);
			}
		}

		this.addChild(this.collection);
	}	
}

