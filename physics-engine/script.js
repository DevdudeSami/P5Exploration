let collection;

function setup() {
	createCanvas(1024, 768);
	background(127);
		
	collection = new EntityCollection();

	let testEntity = new Entity(2, 50, 50);
	testEntity.applyImpulse(createVector(5,5));

	collection.addEntity(testEntity);
}

function draw() {
  background(127);

	collection.update();
	collection.render();
}

// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }