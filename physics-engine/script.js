let initialScene = new TestScene();

function setup() {
	initialScene.setup();
}

function draw() {
	initialScene.update();
	initialScene.render();
}