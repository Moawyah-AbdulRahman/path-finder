class AStar {
    static DIRECTIONS = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    //cell, goal:: [i, j ...]
    static manhatinDistance(cell, goal) {
        return Math.abs(cell[0] - goal[0]) + Math.abs(cell[1] - goal[1]);
    }

    //a, b:: [i, j, actual distance from start], goal::[i,j]
    //heuristic:: function(cell, goal)
    static compare(a, b, goal, heuristic) {
        let distA = a[2] + heuristic(a, goal)*0.99;
        let distB = b[2] + heuristic(b, goal)*0.99;
        return distA - distB;
    }

    constructor(grid) {
        this.grid = grid;
        this.pq = new PriorityQueue({
            comparator: (a, b) => AStar.compare(a, b, grid.goal, AStar.manhatinDistance)
        });
        let s = grid.start;
        this.parent = {};
        this.parent[s] = null;
        this.pq.queue([s[0], s[1], 0]);
        this.foundPath = false;
    }

    //public
    iterateOnce() {
        if (this.pq.length > 0) {
            let curr = this.pq.dequeue();
            for (const dir of AStar.DIRECTIONS) {
                let neighbor = [curr[0] + dir[0], curr[1] + dir[1], curr[2] + 1];
                if (this.inRange(neighbor)) {
                    if (this.grid.isGoal(neighbor)) {
                        this.parent[[neighbor[0], neighbor[1]]] = [curr[0], curr[1]];
                        this.pq.clear();
                        return this.foundPath = true;
                    }
                    if (this.grid.isOpen(neighbor)) {
                        this.parent[[neighbor[0], neighbor[1]]] = [curr[0], curr[1]];
                        this.grid.setInQueue(neighbor);
                        this.pq.queue(neighbor);
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