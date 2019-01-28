//generates background colour
background(0, 0, 0);

//controls cloud height
var Cloudheight = 55;

//calls a function to generate clouds using noise
var drawRange = function(num, range) {
    var incAmount = 0.01;
    for (var t = range; t < incAmount*width + range; t += incAmount) {
        var y = map(noise(t), 0, 1, 0, num);
        rect((t - range)*100, height-y, 1, y);
    }
};

//stroke and draw commands to draw the clouds on screen
stroke(10, 56, 64);
drawRange(241, Cloudheight+227);
stroke(28, 92, 102);
drawRange(285, Cloudheight+233);
stroke(72, 149, 163);
drawRange(230, Cloudheight+94);

//colours and draw command to create the moon
stroke(253, 255, 201);
fill(253, 255, 201);
ellipse(328,69,100,100);
