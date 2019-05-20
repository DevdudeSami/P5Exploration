let collection;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(127);
		
	collection = new EntityCollection();
	collection.setG(50);

	let bigEntity = new Entity(50, 700, 400);
	let smallEntity = new Entity(5, 1000, 400);
	// bigEntity.setDragCoefficient(0.1);
	// smallEntity.setDragCoefficient(0.1);
	smallEntity.applyImpulse(createVector(0, 10));
	collection.addEntities([bigEntity, smallEntity]);

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