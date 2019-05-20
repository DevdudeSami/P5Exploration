let collection;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(127);
		
	collection = new EntityCollection();
	collection.setG(50);

	// let biggerEntity = new Entity(50, 100, 400);
	let bigEntity = new Entity(500, 100, 400);
	let smallEntity = new Entity(50, 700, 400);
	let smallerEntity = new Entity(10, 1000, 400);
	// bigEntity.setDragCoefficient(0.1);
	// smallEntity.setDragCoefficient(0.1);
	// biggerEntity.applyImpulse(createVector(0, -100));
	bigEntity.applyImpulse(createVector(0, 50));
	smallEntity.applyImpulse(createVector(0, -100));
	smallerEntity.applyImpulse(createVector(0, 50));
	collection.addEntities([bigEntity, smallEntity, smallerEntity]);

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