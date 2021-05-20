class Player {

    constructor(distance, size, angle) {
        this.angle = angle;
        this.distance = distance
        this.size = size;
        this.pos = {
            x: 0,
            y: 0
        };
    }

    draw() {
        this.pos.x = cos(this.angle) * this.distance;
        this.pos.y = sin(this.angle) * this.distance;

        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
    }

    getEndPoint() {

        let p = {
            x: cos(this.angle) * (this.distance),
            y: sin(this.angle) * (this.distance),
            size: this.size
        };

        return p;
    }

    update(dir) { this.angle += dir; }

};