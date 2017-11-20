/* backup

// display size
var gridWidth = 8;
var gridHeight = 5;

// sliders
var rSlider, gSlider, bSlider, fSlider; // control sliders
var h, s, b; // hue saturation brightness
var faderVal; // fader Channel 1 and Channel 2

// dropdowns
var imageSelect;

// image
var testImg;
var testGif;
var imageMask;

// buffers
var ouputBuffer;

// scale
var vScale = 20;

function setup() {
  createCanvas(800,600);
  testImg = loadImage("gradient.png"); // Load the image
  imageMask = loadImage("half.png")
  //testGif = loadGif('colors1.gif');
  //testGif.play();
  // HSB is the right way to work with LEDs
  // hue, saturation, and brightness
 //colorMode(HSB, 255);
 

  rSlider = createSlider(0, 255, 127);
  gSlider = createSlider(0, 255, 127);
  bSlider = createSlider(0, 255, 127);
  fSlider = createSlider(0, 255, 127);

  rSlider.position(10, 230);
  gSlider.position(10, 250);
  bSlider.position(10, 270);
  fSlider.position(210, 230);

  rSlider.style('width', '80px');
  gSlider.style('width', '80px');
  bSlider.style('width', '80px');
  fSlider.style('width', '80px');

  // buffers
  ouputBuffer = createGraphics(160,100);

  // dropdown
  imageSelect = createSelect();
  imageSelect.position(390, 250);
  imageSelect.option('gradient.png');
  imageSelect.option('gradient2.png');
  imageSelect.option('cat.jpg');
  imageSelect.option('tiger.jpg');
  imageSelect.option('tanook.jpg');
  imageSelect.option('half.png');
  //imageSelect.option('colors1.gif');
  //imageSelect.option('colors2.gif');
  imageSelect.changed(imageEvent);

 updateFromUI();
}

function imageEvent() {
  var item = imageSelect.value();
  testImg = loadImage(item); // Load the image
  testImg.resize(160,100);
}

function draw() {
  background(60);

  //background(h, s, b);
  updateFromUI();

  // channel 1 controls
  fill(255);
  text("red (" + str(h) + ")", 100, 245);
  text("green (" + str(s) + ")", 100, 265);
  text("blue (" + str(b) + ")", 100, 285);
  text("channel 1 (HSB)", 10, 220);

  fill(h,s,b);
  rect(10,100,160,100);

  // channel 2 controls
  fill(255);
  text("channel 2 (image picker)", 390, 220);

  fill(127,127,127);
  rect(390,100,160,100);
  image(testImg,390,100,160,100)

  // output controls
  fill(255);
  text("output preview (ch1 + ch2)", 200, 220);

  fill(127,127,127);
  rect(200,100,160,100);
  image(testImg,200,100,160,100);

  fill(h,s,b, 255-faderVal); // this could be better
  rect(200,100,160,100);

  fill(255);
  text("fader", 300, 245);


  // draw to buffers
  ouputBuffer.background(0);
  ouputBuffer.noStroke();
  //ouputBuffer.blendMode(BLEND);

  ouputBuffer.fill(127,127,127);
  ouputBuffer.rect(0,0,160,100);
  ouputBuffer.image(testImg,0,0, 160/2, 100/2);

  ouputBuffer.fill(h,s,b, 255-faderVal);
  ouputBuffer.rect(0,0,160,100);


  image(ouputBuffer, 10, 400);

  calculateDownsample();

  fill(255);
  text("frame buffer", 10, 520);
  text("LED downsample", 200, 520);

  // labels
  fill(0,255,255);
  text("mixer", 10, 80);

  fill(0,255,255);
  text("results", 10, 380);

  testImg.mask(imageMask);
  //image(testGif, 560, 100, 160,100);
}

function updateFromUI() {
  // process UI elements and update values
  h = rSlider.value();
  s = gSlider.value();
  b = bSlider.value();
  faderVal = fSlider.value();
}

function calculateDownsample() {

  ouputBuffer.loadPixels();
  loadPixels();
  for (var y = 0; y < 5; y++) {
    for (var x = 0; x < 8; x++) {
      var index = (x*vScale + 1 + (y*vScale * 160))*4;
      var r = ouputBuffer.pixels[index+0];
      var g = ouputBuffer.pixels[index+1];
      var b = ouputBuffer.pixels[index+2];

      noStroke();
      fill(r,g,b);
      rect(200 + x*vScale, 400 + y*vScale, 20, 20);

    }
  }
}


*/

// function mouseMoved() {
//   if (testGif.loaded() && !testGif.playing()){
//     var totalFrames = testGif.totalFrames();
//     var frame = int(map(mouseX, 0, width, 0, totalFrames));
//     testGif.frame(frame);
//   }
// }

// function mousePressed() {
//   if (testGif.playing()) {
//     testGif.pause();
//   } else {
//     testGif.play();
//   }
// }
/* sketch mapper */

/*
var rSlider, gSlider, bSlider;
var buffer;
var pixelWidth = 100;
var vScale = 100;

var r = 0;
var g = 0;
var b = 0;

function setup() {
  // create canvas
  createCanvas(800, 500);
  buffer = createGraphics(8,5);

  textSize(15);
  noStroke();

  // create sliders
  rSlider = createSlider(0, 255, 100);
  rSlider.position(20, 20);
  gSlider = createSlider(0, 255, 0);
  gSlider.position(20, 50);
  bSlider = createSlider(0, 255, 255);
  bSlider.position(20, 80);
}

function draw() {
  r = rSlider.value();
  g = gSlider.value();
  b = bSlider.value();
  
  //buffer.background(r, g, b);
  //image(buffer, 0, 0);

  calculateDownsample();

  text("red", rSlider.x * 2 + rSlider.width, 35);
  text("green", gSlider.x * 2 + gSlider.width, 65);
  text("blue", bSlider.x * 2 + bSlider.width, 95);
}

function calculateDownsample() {

  buffer.loadPixels();

  loadPixels();
  
  for (var y = 0; y < buffer.height; y++) {
    for (var x = 0; x < buffer.width; x++) {
      var index = (buffer.width - x + 1 + (y * buffer.width)) * pixelWidth;
      var r1 = buffer.pixels[index+0];
      var g1 = buffer.pixels[index+1];
      var b1 = buffer.pixels[index+2];

      //var bright = (r+g+b)/ 3;
      //var w = map(bright, 0, 255, 0, vScale);
      var w = 100;

      //noStroke();
      fill(r1,g1,b1);
      //rectMode(CENTER);
      rect(x*vScale, y*vScale, w, w);

    }
  }
}

*/

/* image mapper */

/*
var image;

var vScale = 100;
var pixelWidth = 100;

function setup() {
  createCanvas(800, 500);
  //pixelDensity(1);

  image = loadImage("gradient.png");  // Load the image

}

function draw() {
  background(51);

  image.loadPixels();
  loadPixels();
  for (var y = 0; y < image.height; y++) {
    for (var x = 0; x < image.width; x++) {
      var index = (image.width - x + 1 + (y * image.width)) * pixelWidth;
      var r = image.pixels[index+0];
      var g = image.pixels[index+1];
      var b = image.pixels[index+2];

      var bright = (r+g+b)/ 3;
      //var w = map(bright, 0, 255, 0, vScale);
      var w = 100;

      //noStroke();
      fill(r,g,b);
      //rectMode(CENTER);
      rect(x*vScale, y*vScale, w, w);

    }
  }
 
}

*/


/* video mapper */

/*
var video;

var vScale = 10;

function setup() {
  createCanvas(800, 500);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width/vScale, height/vScale);
}

function draw() {
  background(51);

  video.loadPixels();
  loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index = (video.width - x + 1 + (y * video.width))*4;
      var r = video.pixels[index+0];
      var g = video.pixels[index+1];
      var b = video.pixels[index+2];

      var bright = (r+g+b)/ 3;

      var w = map(bright, 0, 255, 0, vScale);

      noStroke();
      fill(r,g,b);
      //rectMode(CENTER);
      rect(x*vScale, y*vScale, w, w);

    }
  }
 
}
*/

/* gif mapper */

/*
var gif;

function setup() {
  createCanvas(700, 300);
  gif = loadGif('waves.gif');
}

function draw() {
  background(0);
  image(gif, 0, 0);
}

function mouseMoved() {
  if (gif.loaded() && !gif.playing()){
    var totalFrames = gif.totalFrames();
    var frame = int(map(mouseX, 0, width, 0, totalFrames));
    gif.frame(frame);
  }
}

function mousePressed() {
  if (gif.playing()) {
    gif.pause();
  } else {
    gif.play();
  }
}
*/