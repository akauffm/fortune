var sketch = function(p) {

  var x = 0; 
  var y = 80;
  var lines, markov, data;
  var animating = false;
  var countdown = 1000;
  var alpha = 0;

  p.preload = function() {
  	data = p.loadStrings('strings/hba.txt');
  };

  p.setup = function() {
    var canvas = p.createCanvas(400, 200);
    lines = [" "];
    markov = new RiMarkov(6);
    markov.loadText(data.join(' '));
    canvas.class("displayed");
    canvas.parent('p5sketch');
    p.select('canvas').style("visibility","visible");
    p.textSize(20);
    p.fill(255);
    p.textAlign(p.CENTER);
    p.noStroke();
    lines = markov.generateSentences(1);
    drawText();
  };

  p.draw = function() {
  	animate(countdown, alpha);
  	drawText();
  };

  var animate = function(_time,_alpha){
  	if (countdown > 0 && alpha < 255) {
  		countdown--;
  		alpha += p.random(-2,5);
  		p.fill(255,alpha);
  		animating = true;
  	}
  	else {
  		countdown = 0;
  		alpha = 255;
  		animating = false;
  	}
  };

  var drawText = function() {  	
  	p.background(0);
  	p.text(lines.join(' '), x, y, 400, 400);
  };

  p.mouseReleased = function() {
    if (!animating){
		countdown = 1000;
	  	alpha = 0;
	  	lines = markov.generateSentences(1);
    	drawText();
  	}
};

 p.touchEnded = function() {
  if (!p.fullscreen()) p.fullscreen(true);
  // prevent default
  return false;
}

  p.deviceTurned = function() {
  	if (!animating){
		countdown = 1000;
	  	alpha = 0;
	  	lines = markov.generateSentences(1);
    	drawText();
  	}
};
};

var myp5 = new p5(sketch);