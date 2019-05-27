var Entity = (function () {
    function Entity(mass, x, y) {
        this.mass = mass;
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.dragCoefficient = 0;
        this.restitution = 1;
        this.position = createVector(x, y);
    }
    Object.defineProperty(Entity.prototype, "direction", {
        get: function () {
            var direction = this.velocity.copy();
            direction.normalize();
            return direction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "collisionMetric", {
        get: function () {
            throw new Error("Override this property.");
        },
        enumerable: true,
        configurable: true
    });
    Entity.prototype.applyForce = function (f) {
        var da = p5.Vector.div(f, this.mass);
        this.acceleration.add(da);
    };
    Entity.prototype.applyImpulse = function (j) {
        var dv = p5.Vector.div(j, this.mass);
        this.velocity.add(dv);
    };
    Entity.prototype.applyDrag = function () {
        var drag = this.direction;
        drag.mult(-this.dragCoefficient * this.velocity.magSq());
        this.applyForce(drag);
    };
    Entity.prototype.update = function () {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.applyDrag();
    };
    Entity.prototype.render = function () {
    };
    return Entity;
}());
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CircleEntity = (function (_super) {
    __extends(CircleEntity, _super);
    function CircleEntity(mass, x, y, radius) {
        var _this = _super.call(this, mass, x, y) || this;
        _this.radius = radius;
        _this.fill = [255, 255, 255];
        var area = 0.5 * radius ^ 2;
        return _this;
    }
    Object.defineProperty(CircleEntity.prototype, "density", {
        get: function () {
            var area = 0.5 * this.radius ^ 2;
            return this.mass / area;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CircleEntity.prototype, "collisionMetric", {
        get: function () {
            return this.radius;
        },
        enumerable: true,
        configurable: true
    });
    CircleEntity.prototype.update = function () {
        _super.prototype.update.call(this);
    };
    CircleEntity.prototype.render = function () {
        var opacity = 15 + 255 * (this.density / 0.1);
        stroke(0);
        strokeWeight(2);
        fill(this.fill[0], this.fill[1], this.fill[2], opacity);
        ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
    };
    return CircleEntity;
}(Entity));
var BlobEntity = (function (_super) {
    __extends(BlobEntity, _super);
    function BlobEntity() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.detail = 0.1;
        _this.yOffset = 0;
        return _this;
    }
    BlobEntity.prototype.update = function () {
        _super.prototype.update.call(this);
        this.yOffset += 1;
    };
    BlobEntity.prototype.render = function () {
        push();
        translate(this.position.x, this.position.y);
        beginShape();
        var xoffset = 0;
        for (var i = 0; i < TWO_PI; i += this.detail) {
            var radius = this.radius + map(noise(xoffset, this.yOffset), 0, 1, -25, 25);
            var x = radius * cos(i);
            var y = radius * sin(i);
            vertex(x, y);
            xoffset += 0.1;
        }
        endShape();
        pop();
    };
    return BlobEntity;
}(CircleEntity));
var EntityCollection = (function () {
    function EntityCollection() {
        this.entities = [];
        this.entityIDs = {};
        this.G = 0.00001;
    }
    EntityCollection.prototype.addEntity = function (e, id) {
        this.entities.push(e);
        if (id !== undefined)
            this.entityIDs[id] = this.entities.length - 1;
    };
    ;
    EntityCollection.prototype.addEntities = function (es) { this.entities = this.entities.concat(es); };
    EntityCollection.prototype.removeEntity = function (index) { this.entities.splice(index, 1); };
    EntityCollection.prototype.removeEntityByID = function (id) {
        if (id in this.entityIDs)
            this.removeEntity(this.entityIDs[id]);
        else
            console.error("Entity ID does not exist.");
    };
    ;
    Object.defineProperty(EntityCollection.prototype, "count", {
        get: function () { return this.entities.length; },
        enumerable: true,
        configurable: true
    });
    ;
    EntityCollection.prototype.update = function () {
        this.applyGravitationalForces();
        this.checkCollisions();
        this.camera();
        this.entities.forEach(function (e) { e.update(); });
    };
    ;
    EntityCollection.prototype.render = function () {
        this.entities.forEach(function (e) { e.render(); });
    };
    ;
    EntityCollection.prototype.applyGravitationalForces = function () {
        for (var i = 0; i < this.count - 1; i++) {
            for (var j = i + 1; j < this.count; j++) {
                var r = this.entities[i].position.dist(this.entities[j].position);
                var m1 = this.entities[i].mass;
                var m2 = this.entities[j].mass;
                var f = this.G * m1 * m2 / Math.pow(r, 2);
                var theta = p5.Vector.sub(this.entities[j].position, this.entities[i].position).heading();
                var f_vector = p5.Vector.fromAngle(theta, f);
                this.entities[i].applyForce(f_vector);
                this.entities[j].applyForce(f_vector.mult(-1));
            }
        }
    };
    ;
    EntityCollection.prototype.checkCollisions = function () {
        for (var i = 0; i < this.count - 1; i++) {
            for (var j = i + 1; j < this.count; j++) {
                var e1 = this.entities[i];
                var e2 = this.entities[j];
                var dr = e1.position.dist(e2.position);
                var Dr = e1.collisionMetric + e2.collisionMetric;
                if (Dr - dr >= 0) {
                    this.collision(e1, e2, Dr - dr);
                }
            }
        }
    };
    EntityCollection.prototype.collision = function (e1, e2, d) {
        var contactNormal = p5.Vector.sub(e1.velocity, e2.velocity);
        contactNormal.normalize();
        var totalMass = e1.mass + e2.mass;
        var restitution = e1.restitution * e2.restitution;
        var ds1 = contactNormal.copy();
        ds1.mult(d * e2.mass / totalMass);
        e1.position.sub(ds1);
        var ds2 = contactNormal.copy();
        ds2.mult(-d * e1.mass / totalMass);
        e2.position.sub(ds2);
        var du = p5.Vector.sub(e1.velocity, e2.velocity);
        var p1 = p5.Vector.mult(e1.velocity, e1.mass);
        var p2 = p5.Vector.mult(e2.velocity, e2.mass);
        var totalMomentum = p5.Vector.add(p1, p2);
        var v1 = p5.Vector.add(totalMomentum, p5.Vector.mult(du, -e2.mass * restitution));
        v1.div(totalMass);
        var v2 = p5.Vector.add(totalMomentum, p5.Vector.mult(du, e1.mass * restitution));
        v2.div(totalMass);
        e1.velocity = v1;
        e2.velocity = v2;
    };
    EntityCollection.prototype.camera = function () {
        var v = -10;
        var ds = createVector(0, 0);
        if (keyIsDown(37)) {
            ds.add(createVector(-v, 0));
        }
        if (keyIsDown(39)) {
            ds.add(createVector(v, 0));
        }
        if (keyIsDown(38)) {
            ds.add(createVector(0, -v));
        }
        if (keyIsDown(40)) {
            ds.add(createVector(0, v));
        }
        this.entities.forEach(function (e) {
            e.position.add(ds);
        });
    };
    return EntityCollection;
}());
var Scene = (function () {
    function Scene() {
        this.children = [];
        this.childrenIDs = {};
        this.backgroundColor = [255, 255, 255];
        this.showFPS = true;
    }
    Scene.prototype.addChild = function (e, id) {
        this.children.push(e);
        if (id !== undefined)
            this.childrenIDs[id] = this.children.length - 1;
    };
    ;
    Scene.prototype.addChildren = function (es) { this.children = this.children.concat(es); };
    Scene.prototype.removeChild = function (index) { this.children.splice(index, 1); };
    Scene.prototype.removeChildByID = function (id) {
        if (id in this.childrenIDs)
            this.removeChild(this.childrenIDs[id]);
        else
            console.error("Entity ID does not exist.");
    };
    ;
    Object.defineProperty(Scene.prototype, "childCount", {
        get: function () { return this.children.length; },
        enumerable: true,
        configurable: true
    });
    ;
    Scene.prototype.setup = function () {
        createCanvas(windowWidth, windowHeight);
    };
    Scene.prototype.update = function () {
        background(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        this.children.forEach(function (e) { e.update(); });
    };
    Scene.prototype.render = function () {
        this.children.forEach(function (e) { e.render(); });
        if (this.showFPS) {
            var fps = frameRate();
            fill(255);
            stroke(0);
            text("FPS: " + fps.toFixed(2), 10, height - 10);
        }
    };
    return Scene;
}());
var ParticleCollectionScene = (function (_super) {
    __extends(ParticleCollectionScene, _super);
    function ParticleCollectionScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.collection = new EntityCollection();
        _this.nX = 10;
        _this.nY = 10;
        return _this;
    }
    ParticleCollectionScene.prototype.setup = function () {
        _super.prototype.setup.call(this);
        this.backgroundColor = [120, 120, 120];
        this.collection = new EntityCollection();
        this.collection.G = 3;
        var xOffset = 100;
        var yOffset = 100;
        var padding = 150;
        for (var i = 0; i < this.nX; i++) {
            for (var j = 0; j < this.nY; j++) {
                var e = new CircleEntity(10, xOffset + padding * i, yOffset + padding * j, 20);
                e.restitution = 1;
                this.collection.addEntity(e);
            }
        }
        this.addChild(this.collection);
    };
    return ParticleCollectionScene;
}(Scene));
var PlaneteryMotionScene = (function (_super) {
    __extends(PlaneteryMotionScene, _super);
    function PlaneteryMotionScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.collection = new EntityCollection();
        return _this;
    }
    PlaneteryMotionScene.prototype.setup = function () {
        _super.prototype.setup.call(this);
        this.backgroundColor = [0, 0, 0];
        this.collection = new EntityCollection();
        this.collection.G = 30;
        var entity1 = new CircleEntity(1100, 30, 400, 100);
        var entity2 = new CircleEntity(100, 700, 400, 30);
        var entity3 = new CircleEntity(25, 770, 400, 15);
        var entity4 = new CircleEntity(100, 200, 400, 30);
        var entity5 = new CircleEntity(100, 400, 400, 30);
        entity1.fill = [255, 255, 0];
        entity2.fill = [0, 0, 200];
        entity3.fill = [120, 120, 120];
        entity4.fill = [50, 50, 50];
        entity1.restitution = 1;
        entity2.restitution = 1;
        entity3.restitution = 1;
        entity4.restitution = 1;
        entity1.applyImpulse(createVector(0, 0));
        entity2.applyImpulse(createVector(0, 700));
        entity3.applyImpulse(createVector(0, 350));
        entity4.applyImpulse(createVector(0, 1500));
        entity5.applyImpulse(createVector(0, 1300));
        this.collection.addEntities([entity1, entity2, entity3, entity4]);
        this.addChild(this.collection);
    };
    return PlaneteryMotionScene;
}(Scene));
//# sourceMappingURL=target.js.map