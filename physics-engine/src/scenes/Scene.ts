class Scene implements Renderable {

	children: Renderable[] = [];
	childrenIDs: { [id: string]: number } = {};
	
	backgroundColor = [255,255,255];
	showFPS = true;

	addChild(e: Renderable, id?: string) { 
		this.children.push(e); 
		if(id !== undefined) this.childrenIDs[id] = this.children.length-1;
	};
	addChildren(es: Renderable[]) { this.children = this.children.concat(es); }
	removeChild(index: number) { this.children.splice(index, 1); }
	removeChildByID(id: string) { 
		if(id in this.childrenIDs) this.removeChild(this.childrenIDs[id]);
		else console.error("Entity ID does not exist.");
	};

	get childCount(): number { return this.children.length; };

	setup() {
		createCanvas(windowWidth, windowHeight);
	}

	update(): void {
		background(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);

		this.children.forEach(e => { e.update() });
	}	
	
	render(): void {
		// Display all children
		this.children.forEach(e => { e.render() });

		if(this.showFPS) {
			let fps = frameRate();
			fill(255);
			stroke(0);
			text("FPS: " + fps.toFixed(2), 10, height - 10);
		}
	}

}