// Kacper Tucholski 2019 //


const colors = [{ 
  r: 51,
  g: 51,
  b: 51
},
{
  r: 125,
  g: 125,
  b: 125 
}];



function setup() {
  createCanvas( 700, 700 );
  background(0);
  createSliders();
  prepare();
}

function draw() {

  push();

  translate(width / 2, height / 2);
  drawBG();
  GameLoop();

  pop();

  fill(200);
  textSize(24);
  textAlign(RIGHT);
  text("Kacper Tucholski 2019", 690, 690);
}

function drawBG() {
  push();
  noStroke();

  let angle = TWO_PI;
  let c = 0;

  for(let i = 1; i <= 6; i++)
  {
    fill( colors[c].r, colors[c].g, colors[c].b );
    triangle(0, 0, cos(angle) * 700, sin(angle) * 700, cos(angle + PI/3) * 700, sin(angle + PI/3) * 700 );
    angle += PI/3;
    if(c != 0) { c = 0; }
    else { c = 1; }
  }
  pop();
}