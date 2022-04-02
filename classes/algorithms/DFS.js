class DFS {
    static DIRECTIONS = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    constructor(grid) {
        this.grid = grid;
        this.stack = [];
        let s = grid.start;
        this.parent = {};
        this.parent[s] = null;
        this.stack.push([s[0], s[1], 0]);
        this.foundPath = false;
    }

    //public
    iterateOnce() {
        if (this.stack.length>0) {
            let curr = this.stack.pop();
            for (const dir of AStar.DIRECTIONS) {
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
    getPath() {
        if (!this.foundPath) {
            return [];
        }
        let curr = this.grid.goal;
        let ans = []
        while (curr != null) {
            ans.push(curr);
            curr = this.parent[curr];
        }
        return ans;
    }
    //private
    inRange(cell) {
        return (cell[0] >= 0) && (cell[1] >= 0) &&
            (cell[0] < this.grid.matrix.length) &&
            (cell[1] < this.grid.matrix[0].length);
    }

}