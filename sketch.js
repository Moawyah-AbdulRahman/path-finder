let numOfRows = 25;
let numOfColumns = 40;
let cellLength = 20;
let myGrid;
let algorithm;
let canvasHeight;
let canvasWidth;
function setup() {
  canvasHeight = numOfRows * cellLength + 2 + 40;
  canvasWidth = numOfColumns * cellLength + 2;
  createCanvas(canvasWidth, canvasHeight);

  let framesSpeed=document.getElementById('frame_rate').value;
  frameRate(parseInt(framesSpeed));

  myGrid = new Grid(numOfRows, numOfColumns, cellLength);
}

let isPaused = true;
function draw() {

  myGrid.draw();
  if (!isPaused) {
    if (algorithm.iterateOnce()) {
      myGrid.setPath(algorithm.getPath());
      isPaused = true;
    }
  }
}

let gridIsClickable = false;
const PUT_START = 1;
const PUT_GOAL = 2;
const PUT_BLOCKS = 3;
let gridClickMode = PUT_START;

function mouseClicked() {
  if (!gridIsClickable || mouseX<0 || mouseY<0) {
    return;
  }

  let col = parseInt(mouseX / cellLength);
  let row = parseInt(mouseY / cellLength);
  if (myGrid.inRange(row, col)) {
    if (gridClickMode == PUT_START) {
      myGrid.setStartingPoint([row, col]);
      gridIsClickable = false;
    }else if(gridClickMode == PUT_GOAL){
      myGrid.setGoalPoint([row, col]);
      gridIsClickable = false;
    }
  }

}
/**
 * This function is called when the mouse is dragged.
 * @param {MouseEvent} event - The `MouseEvent` that is passed as an argument.
 */
function mouseDragged(event) {
    
  if (!gridIsClickable || mouseX<0 || mouseY<0) {
    return;
  }

  let col = parseInt(mouseX / cellLength);
  let row = parseInt(mouseY / cellLength);
  if(myGrid.inRange(row, col) && gridClickMode == PUT_BLOCKS){
    myGrid.setBlocked([row, col]);
  }
}
