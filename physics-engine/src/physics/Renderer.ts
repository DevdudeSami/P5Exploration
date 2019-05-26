// interface Renderer {
// 	position: p5.Vector;

// 	update(): void;
// 	render(): void;
// }

class CircleRenderer {
	position: p5.Vector = createVector(0,0);
	radius: number = 0;
	opacity: number = 0;

	update(position: p5.Vector, radius: number, opacity: number) {
		this.position = position;
		this.radius = radius;
		this.opacity = opacity;
	}
	
	render() {
		stroke(0);
		strokeWeight(2);
		fill(255,this.opacity);
		ellipse(this.position.x, this.position.y, this.radius*2, this.radius*2);
	}
}

// let BlobRenderer = function(detail) {
// 	CircleRenderer.call(this);

// 	this.detail = detail || 0.1; // Between 0 and 2pi
// 	this.yOffset = 0;
// }

// BlobRenderer.prototype.update = function(position, radius) {
// 	CircleRenderer.prototype.update.call(this, position, radius); // Super call

// 	this.yOffset += 0.1;
// }

// BlobRenderer.prototype.render = function() {
// 	push();
//   translate(this.position.x,this.position.y);
// 	beginShape();
//   var xoffset = 0;
//   for (var i = 0; i < TWO_PI; i+= this.detail) {
//     var radius = this.radius + map(noise(xoffset, this.yOffset), 0, 1, -25, 25);
//     var x = radius * cos(i);
//     var y = radius * sin(i);
//     vertex(x, y);
//     xoffset += 0.1;
//   }
//   endShape();
//   pop();
// }