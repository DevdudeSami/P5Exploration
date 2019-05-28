class Rod implements Renderable {
	constructor(public e1: Entity, public e2: Entity, public length: number) {}
	
	update() {
		
	}

	render() {
		stroke(127);
		line(this.e1.position.x, this.e1.position.y, this.e2.position.x, this.e2.position.y);
	}
}