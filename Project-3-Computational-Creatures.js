var xPositions = [];
var yPositions = [0];
var dropNum = 5; //number of drops falling
var dropLimit = 10; //drop limit to prevent crashing

var Mover = function() {
  this.position = new PVector(random(width), random(height));
  this.velocity = new PVector(0, 0);
  this.acceleration = new PVector(0, 0);
};
for(var dropcount = 0; dropcount < dropNum; dropcount++){ 
    xPositions.push(random(0, 400));
    yPositions.push(random(0,400));
}

Mover.prototype.update = function() {
    var mouse = new PVector(mouseX, mouseY);
    var dir = PVector.sub(mouse, this.position);
    dir.normalize();
    dir.mult(0.2);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(2);
    this.position.add(this.velocity);
};

Mover.prototype.display = function() {
  stroke(0);
  strokeWeight(2);
  fill(219, 212, 219);
  image(getImage("seasonal/gingerbread-man"), this.position.x, this.position.y, 50, 50);
};

Mover.prototype.checkEdges = function() {

  if (this.position.x > width) {
    this.position.x = 0;
  } 
  else if (this.position.x < 0) {
    this.position.x = width;
  }

  if (this.position.y > height) {
    this.position.y = 0;
  } 
  else if (this.position.y < 0) {
    this.position.y = height;
  }
};

var movers = [];

for (var i = 0; i < 8; i++) {
    movers[i] = new Mover(); 
}

draw = function() {
    background(0, 0, 0);
    for (var i = 0; i < xPositions.length; i++) {
        noStroke();
        fill(255, 0, 0);
        ellipse(xPositions[i], yPositions[i], random(5,10),random(5,10));
        yPositions[i] += random(0, 5);
        if(yPositions[i] > 400){
            yPositions[i] = 0;
            xPositions[i] = random(0, 400);
            if(dropNum < dropLimit){
                xPositions.push(random(0,400));
                yPositions.push(0);
                dropNum ++;
            }
        }
        
    }
     noStroke();
    fill(255, 255, 255);
    rect(0,350,400,0);
    //makes the creature follow the mouse mouse
    for (var i = 0; i < movers.length; i++) {
        movers[i].update();
        movers[i].display(); 
    }
   
};
