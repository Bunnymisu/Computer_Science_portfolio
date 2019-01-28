//declares variables
var generator = new Random(1);
var standardDeviation = 75;
var mean = 190;

//calls the draw function for the paint splatter
draw = function() {
    //creates coordinates for paint splatter using normal distribution 
    var x = standardDeviation * generator.nextGaussian() + mean;
    var y = standardDeviation * generator.nextGaussian() + mean;
    
    //uses normal distribution to randomize colour
    var Paint1 = standardDeviation * generator.nextGaussian() + 142;
    var Paint2 = standardDeviation * generator.nextGaussian() + 65;
    var Paint3 = standardDeviation * generator.nextGaussian() + 31;
    noStroke();
    //draws the paint splatter on screen
    fill(Paint1, Paint2, Paint3);
    ellipse(x,y,5,5);
};
