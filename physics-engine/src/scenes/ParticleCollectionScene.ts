class ParticleCollectionScene {
	collection = new EntityCollection();
	nX = 10;
	nY = 10;

	setup() {
		createCanvas(windowWidth, windowHeight);
		background(127);
			
		this.collection = new EntityCollection();
		this.collection.G = 3;
	
		let xOffset = 100;
		let yOffset = 100;
		let padding = 150;
	
		let rendererUpdate = function(e: Entity) {
			e.renderer.update(e.position, e.radius, 15+255*(e.density/0.1));
		}
	
		for(let i = 0; i < this.nX; i++) {
			for(let j = 0; j < this.nY; j++) {
				let e = new Entity(10, xOffset+padding*i, yOffset+padding*j);
				e.density = 0.05;
				e.restitution = 0;
				e.setRenderer(new CircleRenderer(), rendererUpdate);
				this.collection.addEntity(e);
			}
		}
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

