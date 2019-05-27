let initialScene: TestScene;

function setup() {
	initialScene = new TestScene();
	initialScene.setup();
}

function draw() {
	initialScene.update();
	initialScene.render();
}