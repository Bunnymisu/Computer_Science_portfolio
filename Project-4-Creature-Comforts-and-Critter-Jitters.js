
var drawScene = function() {
    noStroke();
    background(196, 253, 255);

    //the sun
    fill(255, 213, 0);
    ellipse(width, 0, 200, 200);

    //the water
    fill(102, 127, 227);
    rect(0, height - 200, width, 200);
    for (var x = 0; x < width; x += 65) {
        arc(x, height - 197, 100, 100, 182, 360);
    }
};

noStroke();
var Animal = function() {
    this.position = new PVector(300, 300);
    this.h = random(50, 100);
    this.w = random(50, 100);
    this.length = random(50, 75);
    this.col = color(random(0, 255), random(0, 255), random(0, 255));
    
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(-0.1, 0);
    this.mass = 20;
    this.G = 1;
};

Animal.prototype.draw = function() {
    fill(this.col);
    ellipse(this.position.x, this.position.y, this.w, this.h);
    triangle(this.position.x, this.position.y, this.position.x + this.length, this.position.y - this.length, this.position.x + this.length, this.position.y + this.length);
};

Animal.prototype.updateMouse = function() {
    var mouse = new PVector(mouseX, mouseY);
    var dir = PVector.sub(mouse, this.position);
    //Biggest possible PVector that fits in the canvas
    var maxDir = new PVector(width, height);
    //Magnitude of that vector
    var maxMag = maxDir.mag();
    
    var closeness = (maxMag - dir.mag())/maxMag;
    dir.normalize();
    dir.mult(closeness);
    
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(10);
    this.position.add(this.velocity);
};

Animal.prototype.move = function() {
    this.acceleration.set = (-0.5, 0);
    this.velocity.set = (0, 0);
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
};

Animal.prototype.checkEdges = function() {

    if (this.position.x > width) {
        this.position.x = 0;
    } else if (this.position.x < 0) {
        this.position.x = width;
    }
    
    if (this.position.y > height) {
        this.position.y = height - 197;
    } else if (this.position.y < height - 197) {
        this.position.y = height;
    }
};

Animal.prototype.applyForce = function(force) {
    var f = PVector.div(force,this.mass);
    this.acceleration.add(f);
};

var Fish = function(position, h, w, length, col, velocity, acceleration, G) {
    Animal.call(this, position, h, w, length, col, velocity, acceleration, G);
};

Fish.prototype = Object.create(Animal.prototype);

Fish.prototype.calculateAttraction = function(mover) {
    // Calculate direction of force
    var force = PVector.sub(this.position, mover.position);
    // Distance between objects       
    var distance = force.mag();
    // Limiting the distance to eliminate "extreme" results
    // for very close or very far objects                            
    distance = constrain(distance, 5, 25);
    // Normalize vector                    
    force.normalize();
    // Calculate gravitional force magnitude  
    var strength = (this.G * this.mass * mover.mass) / (distance * distance);
    // Get force vector --> magnitude * direction
    force.mult(strength);
    return force;
};

var Pretador = function(position, h, w, length, col, velocity, acceleration, mass, G) {
    Fish.call(this, position, h, w, length, col, velocity, acceleration, mass, G);
    this.col = color(255, 0, 0);
    this.h = random(100, 200);
    this.w = random(100, 200);
    this.show = false;
    this.mass = 10;
};

Pretador.prototype = Object.create(Animal.prototype);

Pretador.prototype.move = function() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(10);
    this.position.add(this.velocity);
};

var Food = function() {
    this.position = new PVector(0, 0);
};

Food.prototype.draw = function() {
    fill(82, 70, 51);
    this.position.set(mouseX, mouseY);
    rect(this.position.x, this.position.y, 10, 10, 10);
};

var fish = new Fish();
var food = new Food();
var pretador = new Pretador();

draw = function() {
    drawScene();
    
    if (keyIsPressed & keyCode === 0) {
        fish.updateMouse();
        pretador.draw();
        food.draw();
        pretador.show = true;
        pretador.updateMouse();
    } else {
        fish.move();
    }
    
    if (pretador.show) {
        pretador.move();
        pretador.draw();
        var Force = fish.calculateAttraction(pretador);
        pretador.applyForce(Force);
    }
    
    fish.draw();
    fish.checkEdges(); 
    pretador.checkEdges();
    
}; 

