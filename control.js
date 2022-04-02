
let started=false;

//flow control
function start(){
    setPutButtonsDisability(true);
    myGrid.clean();
    algorithm=getSelectedAlgorithm(myGrid);
    isPaused=false;
    started=true;
}
function pauseResume(){
    setPutButtonsDisability(isPaused);
    if(started){
        isPaused=!isPaused;
    }
}

//init grid
function beginIntialization(){
    let initGridDiv = document.getElementById('init_grid_div');
    initGridDiv.style.display='inline';
    document.getElementById('defaultCanvas0').style.visibility='hidden';
    setPutButtonsDisability(true);
    
}
function endInitialization(){
    let initGridDiv = document.getElementById('init_grid_div');
    initGridDiv.style.display='none';

    numOfRows = document.getElementById("rows").value;
    numOfColumns = document.getElementById("cols").value;
    cellLength = document.getElementById("length").value;
    setup();
    document.getElementById('defaultCanvas0').style.visibility='visible';
    setPutButtonsDisability(false);
}

function changeSpeed(){
    let x=document.getElementById('frame_rate').value;
    frameRate(parseInt(x));
}


//Put buttons
function setPutButtonsDisability(val){
    gridIsClickable=false;
    document.getElementById('put_start').disabled = val;
    document.getElementById('put_goal').disabled = val;
    document.getElementById('put_blocks').disabled = val;
}
function putStart(){
    gridClickMode=PUT_START;
    gridIsClickable=true;
}
function putGoal(){
    gridClickMode=PUT_GOAL;
    gridIsClickable=true;
}
function putBlocks(){
    if(!gridIsClickable){
        gridClickMode = PUT_BLOCKS;

    }
    gridIsClickable=!gridIsClickable;
}

//choose algorithm
function getSelectedAlgorithm(grid){
    let algorithm = document.getElementById('algorithm').value;
    switch(algorithm){
        case 'a_star':
            return new AStar(grid);
        case 'bfs':
            return new BFS(grid);
        case 'dfs':
            return new DFS(grid);
    }
}

