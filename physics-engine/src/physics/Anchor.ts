/// <reference path="./CircleEntity.ts" />

class Anchor extends CircleEntity {
	isStatic = true;
	restitution = 1;
	fill = [0,0,0];

	constructor(x: number, y: number) {
		super(0,x,y,5);
	}
}
