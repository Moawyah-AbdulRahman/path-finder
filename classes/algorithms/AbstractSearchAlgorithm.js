//each subclass must implement a method: iterateOnce
class AbstractSearchAlgorithm{

    static DIRECTIONS = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    constructor(grid){
        
        this.grid = grid;
        let s = grid.start;
        this.parent = {};
        this.parent[s] = null;
        this.foundPath = false;
        
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