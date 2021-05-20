let centerSize = 30;        // Hexagon
let space = 10;
let spaceInSpace = 200;
let baseSpeed = 2;
let startSize = 600;
let speedMultipler = 0.001;

let playerSpeed = 0.1;      // Player
let playerDistance = 100;
let playerSize = 20;
let startAngle = 4.71238898038;

let baseScore = 100;        // Score


let cSS, sS, sISS, bSS, sSS, sMS;
let pSS, pDS, psS, sAS;
let BSS;
let button, resetS;

function createSliders() {

    createSpan('Center hexagon size: ').position(710, 15);
    cSS = createSlider(1, 100, 30, 1).position(950,15);

    createSpan('Hexagons thickness: ').position(710, 40);
    sS = createSlider(1, 30, 10, 1).position(950,40);

    createSpan('Space bettwen hexagons: ').position(710, 65);
    sISS = createSlider(100, 500, 200, 50).position(950,65);

    temp = createSpan('Hexagons speed: ').position(710, 90);
    bSS = createSlider(0.1, 5, 2, 0.01).position(950, 90);

    temp = createSpan('Hexagons start distance from center: ').position(710, 115);
    sSS = createSlider(400, 1000, 600, 25).position(950, 115);

    temp = createSpan('Speed multipler: ').position(710, 140);
    sMS = createSlider(0.0001, 0.005, 0.001, 0.001).position(950, 140);


    temp = createSpan('Player speed: ').position(710, 165);
    pSS = createSlider(0.01, 0.5, 0.1, 0.01).position(950, 165);

    temp = createSpan('Player distance from center: ').position(710, 190);
    pDS = createSlider(50, 300, 100, 10).position(950, 190);

    temp = createSpan('Player size: ').position(710, 215);
    psS = createSlider(10, 40, 20, 1).position(950, 215);

    temp = createSpan('Player start angle: ').position(710, 240);
    sAS = createSlider(0, TWO_PI, (3*PI)/2, 0.1).position(950, 240);



    temp = createSpan('Score multipler: ').position(710, 265);
    BSS = createSlider(100, 1000, 100, 100).position(950, 265);

    button = createButton('Apply settings').position(750, 300);
    button.mousePressed(restartNewSettings);

    resetS = createButton('Reset to default').position(950, 300);
    resetS.mousePressed(resetToDefault);
}

function resetToDefault() {
    cSS.value(30);
    sS.value(10);
    sISS.value(200);
    bSS.value(2);
    sSS.value(600);
    sMS.value(0.001);
    pSS.value(0.1);
    pDS.value(100);
    psS.value(20);
    sAS.value(4.7);
    BSS.value(100);
}

function restartNewSettings() {
    hiScore = 0;
    centerSize = cSS.value();
    space = sS.value();
    spaceInSpace = sISS.value();
    baseSpeed = bSS.value();
    startSize = sSS.value();
    speedMultipler = sMS.value();
    playerSpeed = pSS.value();
    playerDistance = pDS.value();
    playerSize = psS.value();
    startAngle = sAS.value();
    baseScore = BSS.value();
    restart();
}