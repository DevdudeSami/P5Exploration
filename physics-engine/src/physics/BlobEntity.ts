/// <reference path="./CircleEntity.ts" />

class BlobEntity extends CircleEntity {
	detail: number = 0.1;
	private yOffset: number = 0;

	update() {
		super.update();

		this.yOffset += 1;
	}

	render() {
		push();
		translate(this.position.x,this.position.y);
		beginShape();
		var xoffset = 0;
		for (var i = 0; i < TWO_PI; i+= this.detail) {
			var radius = this.radius + map(noise(xoffset, this.yOffset), 0, 1, -25, 25);
			var x = radius * cos(i);
			var y = radius * sin(i);
			vertex(x, y);
			xoffset += 0.1;
		}
		endShape();
		pop();
	}
}