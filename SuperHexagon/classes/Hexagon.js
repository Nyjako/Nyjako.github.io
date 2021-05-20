class Hexagon {

  constructor( size_, space_, full_ ) {
    this.size = size_;
    this.space = space_;
    this.full = full_;

    if(!full_) { this.empty = floor(random(0,5)); }
  }

  calculatePoints(size){
    let points = [{x:0,y:0}];
    let h = (size*sqrt(3)) / 2;

    points[0].x = size;
    points[0].y = 0;

    points.push({x:0,y:0});
    points[1].x = size/2;
    points[1].y = h;

    points.push({x:0,y:0});
    points[2].x = 0-(size/2);
    points[2].y = h;
    
    points.push({x:0,y:0});
    points[3].x = 0-size;
    points[3].y = 0;
    
    points.push({x:0,y:0});
    points[4].x = 0-(size/2);
    points[4].y = 0-h;
    
    points.push({x:0,y:0});
    points[5].x = size/2;
    points[5].y = 0-h;

    return points;
  }

  draw() {

    let bigger = this.calculatePoints(this.size + this.space);
    let smaller;

    if (!this.full) {
      smaller = this.calculatePoints(this.size - this.space);
    }

    stroke(255);
    fill(255);

    if (!this.full) {
      beginShape();
      let bD = false;
      let sD = false;
      let i = this.empty;
      let n = this.empty + 1;
      if (n == 6) {
        n = 0;
      }
      while (!bD || !sD) {
        if (!sD) {
          i++;
          if (i == 6) {
            i = 0;
          }
          vertex(smaller[i].x, smaller[i].y);
          if (i == this.empty) {
            sD = true;
            i = this.empty;
            vertex(bigger[i].x, bigger[i].y);
          }
        } else if (!bD) {
          i--;
          if (i == -1) {
            i = 5;
          }
          vertex(bigger[i].x, bigger[i].y);
          if (i == n) {
            bD = true;
            vertex(smaller[i].x, smaller[i].y);
          }
        }
      }
      endShape(CLOSE);
    }
    else
    {
      push();
      fill(90);
      stroke(255);
      strokeWeight(8);
      beginShape();
      for(let i = 0; i < 6; i++){vertex(bigger[i].x, bigger[i].y);}
      endShape(CLOSE);
      pop();
    }
  }

  update(r) { this.size -= r; }

// Colision //    Circle Intersects Edge: http://www.phatcode.net/articles.php?id=459

  colision(pos) {
      let r = pos.size / 2;
      let pX = pos.x;
      let pY = pos.y;

      let big = this.calculatePoints(this.size + this.space);
      let small = this.calculatePoints(this.size - this.space);

      for (let i = 0; i < 6; i++) {
        if (this.empty != i) {
          let j = i + 1;
          if( j > 5) { j = 0; }
        
          if( this.hexCol(r, pX, pY, small[i].x, small[i].y, small[j].x, small[j].y, big[j].x, big[j].y) ) { return true; }
          if( this.hexCol(r, pX, pY, big[j].x, big[j].y, big[i].x, big[i].y, small[i].x, small[i].y) ) { return true; }
        }
    }
    return false;
  }

  hexCol(radius, centrex, centrey, v1x, v1y, v2x, v2y, v3x, v3y) {

    if ( this.sign(radius, centrex, centrey, v1x, v1y, v2x, v2y) ) { return true; }
    if ( this.sign(radius, centrex, centrey, v2x, v2y, v3x, v3y) ) { return true; }
    if ( this.sign(radius, centrex, centrey, v3x, v3y, v1x, v1y) ) { return true; }

    return false;
  }

  sign(radius, centrex, centrey, v1x, v1y, v2x, v2y) {
    let cx = centrex - v1x;
    let cy = centrey - v1y;
    let ex = v2x - v1x;
    let ey = v2y - v1y;

    let k = cx * ex + cy * ey;

    if (k > 0) {
      let len = sqrt(ex * ex + ey * ey);
      k = k / len;

      if (k < len) {
        if (sqrt(cx * cx + cy * cy - k * k) <= radius) { return true; }
      }
    }
    return false;
  }


  };