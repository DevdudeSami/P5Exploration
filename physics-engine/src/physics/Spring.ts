class Spring implements Renderable {

	constructor(public e1: Entity, public e2: Entity, public length: number, public k: number) {

	}

	get extension() {
		let currentLength = this.e1.position.dist(this.e2.position);
		return currentLength - this.length;
	}

	update(): void {
		let f = p5.Vector.sub(this.e1.position, this.e2.position);
		let currentLength = f.mag();
		let x = currentLength - this.length;
		f.normalize();

		this.e1.applyForce(p5.Vector.mult(f,-this.k));
		this.e2.applyForce(p5.Vector.mult(f,this.k));
	}
	
	render(): void {
		let x = this.extension;
		if(x > 0) stroke(this.k*x,0,0);
		else stroke(0,0,-this.k*x);
		line(this.e1.position.x, this.e1.position.y, this.e2.position.x, this.e2.position.y);
	}
}