let ParticleCollectionScene = function() {
	this.collection = new EntityCollection();
	this.nX = 10;
	this.nY = 10;
}

ParticleCollectionScene.prototype.setup = function() {
	createCanvas(windowWidth, windowHeight);
	background(127);
		
	this.collection = new EntityCollection();
	this.collection.setG(10);

	let xOffset = 100;
	let yOffset = 100;
	let padding = 100;

	let rendererUpdate = function(e) {
		e.renderer.update(e.position, e.radius(), 15+255*(e.density/0.1));
	}

	for(let i = 0; i < this.nX; i++) {
		for(let j = 0; j < this.nY; j++) {
			let e = new Entity(5, xOffset+padding*i, yOffset+padding*j);
			e.setDensity(0.01);
			e.setRestitution(0);
			e.setRenderer(new CircleRenderer(), rendererUpdate);
			this.collection.addEntity(e);
		}
	}
}

ParticleCollectionScene.prototype.update = function() {
	this.collection.update();
}

ParticleCollectionScene.prototype.render = function() {
	background(127);

	this.collection.render();

	let fps = frameRate();
	fill(255);
	stroke(0);
	text("FPS: " + fps.toFixed(2), 10, height - 10);
}
