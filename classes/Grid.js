
class Grid {
    static OPEN = 0;
    static START = 1;
    static BLOCKED = 2;
    static GOAL = 3;
    static CLOSED = 4;
    static IN_QUEUE = 5;
    static PATH = 6;
    static COLOR = {
        0: 'rgb(200,200,200)', //grey
        1: 'rgb(255,255,0)',   // yellow
        2: 'rgb(255,0,0)',     // red
        3: 'rgb(180,0,255)',   // purple
        4: 'rgb(20,20,20)',    // black
        5: 'rgb(0,0,255)',     // blue
        6: 'rgb(0,255,0)',     // green
    };

    constructor(numberOfRows, numberOfColumns, cellLength) {
        this.matrix = [];
        this.updatedCells=[]
        for (let i = 0; i < numberOfRows; i++) {
            this.matrix[i] = [];
            for (let j = 0; j < numberOfColumns; j++) {
                this.matrix[i][j] = Grid.OPEN;
                this.updatedCells.push([i,j]);
            }
        }
        this.cellLength = cellLength;

        this.setStartingPoint([0,0]);
        this.setGoalPoint([numberOfRows-1, numberOfColumns-1]);

    }

    clean(){
        for(let i=0;i<this.matrix.length;i++){
            for(let j=0;j<this.matrix[0].length;j++){
                if(this.matrix[i][j]!=Grid.START &&this.matrix[i][j]!=Grid.GOAL
                    && this.matrix[i][j]!=Grid.BLOCKED){
                        this.matrix[i][j]=Grid.OPEN;
                        this.updatedCells.push([i,j]);
                    }
            }
        }
    }


    //public
    setStartingPoint(cell) {
        
        if(this.start!=null){
            this.matrix[this.start[0]][this.start[1]]=Grid.OPEN;
            this.updatedCells.push(this.start);
        }
        this.matrix[cell[0]][cell[1]] = Grid.START;
        this.start = [cell[0], cell[1]];
        this.updatedCells.push([cell[0], cell[1]]);
    }

    //public
    setGoalPoint(cell) {

        if(this.goal!=null){
            this.matrix[this.goal[0]][this.goal[1]]=Grid.OPEN;
            this.updatedCells.push(this.goal);
        }
        this.matrix[cell[0]][cell[1]] = Grid.GOAL;
        this.goal = [cell[0], cell[1]];
        this.updatedCells.push([cell[0], cell[1]]);
    }

    //public
    setPath(points){
        for(const point of points){
            this.matrix[point[0]][point[1]]=Grid.PATH;
            this.updatedCells.push([point[0],point[1]]);
        }
        this.setStartingPoint(this.start);
        this.setGoalPoint(this.goal);
    }
    //public 
    setBlocked(cell) {
        this.matrix[cell[0]][cell[1]] = Grid.BLOCKED;
        this.updatedCells.push([cell[0],cell[1]]);
    }

    //public
    isInQueue(cell){
        return this.matrix[cell[0]][cell[1]] == Grid.IN_QUEUE;
    }
    //public 
    setClosed(cell) {
        if (this.inRange(cell[0], cell[1]))
            this.matrix[cell[0]][cell[1]] = Grid.CLOSED;
        this.updatedCells.push([cell[0],cell[1]]);
    }
    
    //public
    isOpen(cell) {
        return this.matrix[cell[0]][cell[1]] == Grid.OPEN;
    }

    //public
    setInQueue(cell) {
        if (this.inRange(cell[0], cell[1]))
            this.matrix[cell[0]][cell[1]] = Grid.IN_QUEUE;
        this.updatedCells.push([cell[0],cell[1]]);
    }
    
    //public
    isGoal(cell) {
        return this.matrix[cell[0]][cell[1]] == Grid.GOAL;
    }

    //public
    draw() {
        for(const cell of this.updatedCells){
            this.drawCell(cell[0],cell[1]);
        }
        this.updatedCells=[];
    }

    //private
    drawCell(i, j) {
        let x = j * this.cellLength;
        let y = i * this.cellLength;
        stroke(0, 0, 0);
        strokeWeight(this.cellLength / 13);
        fill(Grid.COLOR[this.matrix[i][j]]);
        square(x, y, this.cellLength);

    }

    inRange(i, j) {
        return i >= 0 && j >= 0 && i < this.matrix.length && j < this.matrix[0].length;
    }
}