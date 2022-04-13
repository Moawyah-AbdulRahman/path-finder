class DFS extends AbstractSearchAlgorithm{

    constructor(grid) {
        super(grid);

        this.stack = [];
        let s = grid.start;
        this.stack.push([s[0], s[1], 0]);
    }

    //public
    iterateOnce() {
        if (this.stack.length>0) {
            let curr = this.stack.pop();
            for (const dir of AbstractSearchAlgorithm.DIRECTIONS) {
                let neighbor = [curr[0] + dir[0], curr[1] + dir[1], curr[2] + 1];
                if (this.inRange(neighbor)) {
                    if (this.grid.isGoal(neighbor)) {
                        this.parent[[neighbor[0], neighbor[1]]] = [curr[0], curr[1]];
                        this.stack=[];
                        return this.foundPath = true;
                    }
                    if (this.grid.isOpen(neighbor)) {
                        this.parent[[neighbor[0], neighbor[1]]] = [curr[0], curr[1]];
                        this.grid.setInQueue(neighbor);
                        this.stack.push(neighbor);
                    }
                }
            }
            if (this.grid.isInQueue(curr))
                this.grid.setClosed(curr);
        }
        return this.foundPath;
    }

}