/// <reference path="./Entity.ts" />

class CircleEntity extends Entity {
	fill = [255,255,255];

	constructor(mass: number, x: number, y: number, public radius: number) {
		super(mass, x, y);
		
		let area = 0.5*radius^2;
	}

	get density() {
		let area = 0.5*this.radius^2;
		return this.mass/area;
	}

	get collisionMetric(): number {
		return this.radius;
	}

	update() {
		super.update();	
	}

	render() {
		// let opacity = 15+255*(this.density/0.1)

		stroke(0);
		strokeWeight(2);
		fill(this.fill[0], this.fill[1], this.fill[2]);
		ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2);
	}
}
