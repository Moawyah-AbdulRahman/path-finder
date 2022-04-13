class BFS extends AbstractSearchAlgorithm{

    constructor(grid) {
        super(grid);

        this.queue = new Queue();
        let s = grid.start;
        this.queue.enqueue([s[0], s[1], 0]);
    }

    //public
    iterateOnce() {
        if (!this.queue.isEmpty()) {
            let curr = this.queue.dequeue();
            for (const dir of AbstractSearchAlgorithm.DIRECTIONS) {
                let neighbor = [curr[0] + dir[0], curr[1] + dir[1], curr[2] + 1];
                if (this.inRange(neighbor)) {
                    if (this.grid.isGoal(neighbor)) {
                        this.parent[[neighbor[0], neighbor[1]]] = [curr[0], curr[1]];
                        this.queue.clear();
                        return this.foundPath = true;
                    }
                    if (this.grid.isOpen(neighbor)) {
                        this.parent[[neighbor[0], neighbor[1]]] = [curr[0], curr[1]];
                        this.grid.setInQueue(neighbor);
                        this.queue.enqueue(neighbor);
                    }
                }
            }
            if (this.grid.isInQueue(curr))
                this.grid.setClosed(curr);
        }
        return this.foundPath;
    }

}