/// <reference path="./Entity.ts" />

class CircleEntity extends Entity {
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
		let opacity = 15+255*(this.density/0.1)

		stroke(0);
		strokeWeight(2);
		fill(255,opacity);
		ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2);
	}
}
