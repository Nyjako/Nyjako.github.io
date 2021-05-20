let center;
let player;
let hex = [];

let hiScore = 0;
let s = 0;
let score = 1;

function prepare() {
    center = new Hexagon( centerSize, space, true );
    player = new Player(playerDistance, playerSize, startAngle);
    hex = [];
    hex.push(new Hexagon(startSize, space, false));
}

function GameLoop() {
    
    for(let i = 0; i < hex.length; i++) { 
        hex[i].update(baseSpeed + speedMultipler * score);
        if( checkSize(hex[i]) ) { hex.splice(i,1); score++;}
        hex[i].draw(); 
        if(hex[i].colision( player.getEndPoint() )) { 
          if( (score-1) * baseScore > hiScore) { hiScore = (score-1)*baseScore; }
          restart();
         }
      }
      s += baseSpeed + speedMultipler * score;
    
      if(s >= spaceInSpace){ hex.push( new Hexagon(startSize, space, false) ); s = 0; }
    
      if ( keyIsDown(LEFT_ARROW) ) {
        player.update( 0-playerSpeed );
      } else if ( keyIsDown(RIGHT_ARROW) ) {
        player.update( playerSpeed );
      }
    
      center.draw();
      player.draw();

    fill(200);
    textSize(24);
    textAlign(LEFT);
    text("Score: " + (score-1)*baseScore, -340 , -330);
    text("High Score: " + hiScore, -340, -300);
}


function checkSize(item){
    if(item.size <= centerSize){ return true; }
    return false;
  }
  
  function restart(){
    s = 0;
    score = 1;
    center = new Hexagon( centerSize, space, true );
    player = new Player(playerDistance, playerSize, startAngle);
    hex = [];
    hex.push(new Hexagon(startSize, space, false));
  }