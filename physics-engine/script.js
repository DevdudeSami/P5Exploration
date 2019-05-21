let collection;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(127);
		
	collection = new EntityCollection();
	collection.setG(40);

	let biggerEntity = new Entity(50, 100, 400);
	let bigEntity = new Entity(50, 500, 400);
	let smallEntity = new Entity(50, 900, 400);
	let smallerEntity = new Entity(15, 1000, 400);

	let rendererUpdate = function(e) {
		e.renderer.update(e.position, e.radius(), 15+255*(e.density/0.1));
	}

	biggerEntity.setRestitution(0.01);
	bigEntity.setRestitution(0.01);
	smallEntity.setRestitution(0.01);

	biggerEntity.setRenderer(new CircleRenderer(), rendererUpdate);
	bigEntity.setRenderer(new CircleRenderer(), rendererUpdate);
	smallEntity.setRenderer(new CircleRenderer(), rendererUpdate);
	smallerEntity.setRenderer(new CircleRenderer(), rendererUpdate);

	biggerEntity.applyImpulse(createVector(0, 50));
	// bigEntity.applyImpulse(createVector(0, 100));
	smallEntity.applyImpulse(createVector(0,-50));
	// smallerEntity.applyImpulse(createVector(0, 50));
	collection.addEntities([biggerEntity, bigEntity, smallEntity]);

	// for(let i = 0; i < 10; i++) {
	// 	let testEntity = new Entity(5, 0, 0);
	// 	testEntity.setDragCoefficient(0.1);
	// 	testEntity.applyImpulse(p5.Vector.random2D().mult(5));
	
	// 	collection.addEntity(testEntity);
	// }
}

function draw() {
  background(127);

	collection.update();
	collection.render();
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }