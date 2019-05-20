let EntityCollection = function() {
	this.entities = [];
	this.entityIDs = {}; // Entities may have optional IDs.
}

EntityCollection.prototype.addEntity = function(e, id) { 
	this.entities.push(e); 
	if(id !== undefined) this.entityIDs[id] = e.length-1;
};
EntityCollection.prototype.removeEntity = function(index) { this.entities.splice(index, 1); }
EntityCollection.prototype.removeEntityByID = function(id) { 
	if(id in this.entityIDs) this.removeEntity(this.entityIDs[id]);
	else console.error("Entity ID does not exist.");
};

EntityCollection.prototype.update = function() {
	//  Update all children
	this.entities.forEach(e => {
		e.update()
	});
};

EntityCollection.prototype.render = function() {
	this.entities.forEach(e => {
		e.render()
	});
};