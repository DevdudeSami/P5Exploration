let initialScene: ParticleCollectionScene;

function setup() {
	initialScene = new ParticleCollectionScene();
	initialScene.setup();
}

function draw() {
	initialScene.update();
	initialScene.render();
}