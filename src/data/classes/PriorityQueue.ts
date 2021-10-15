export class PriorityQueue<T extends Object>{

    // (a: child, b: parent)
    private readonly _comparator: (a: T, b: T) => boolean;
    private _queue: T[] = [];
    private heapMap: any = {}
    
    public indexOf(n: T){
        const result = this.heapMap[n.toString()];
        return result
    }

    public size(){
        return this._queue.length;
    }

    public getQueueCopy(){
        const copy:T[] = []
        this._queue.forEach(e => {
            copy.push(e)
        })
        return copy
    }

    public isHeap(i: number): boolean{
        if(!this.isLeaf(i)){
            if(this._comparator(this._queue[this.left(i)], this._queue[i])){
                return false;
            }
            if(this._comparator(this._queue[this.right(i)], this._queue[i])){
                return false;
            }
            return this.isHeap(this.right(i)) && this.isHeap(this.left(i));
        }
        else{
            return true
        }

    }

    private left(index: number){
        return index * 2 + 1
    }

    private right(index: number){
        return index * 2 + 2;
    }

    private parent(index: number){
        return Math.trunc((index - 1) / 2)
    }

    private hasLeft(index: number){
        return 2 * index + 1 < this._queue.length;
    }

    private hasRight(index: number){
        return 2 * index + 2 < this._queue.length;
    }

    private isLeaf(index: number){
        return 2 * index + 2 > this._queue.length;
    }

    private heapCondition(i: number){
        let result = i;
        if(this.hasLeft(i) && this._comparator(this._queue[this.left(i)], this._queue[result])){
            result = this.left(i);
        }
        if(this.hasRight(i) && this._comparator(this._queue[this.right(i)], this._queue[result])){
            result = this.right(i);
        }
        return result;
    }

    constructor(comparator: (a: T, b: T) => boolean) {
        this._comparator = comparator;
    }

    public push(n: T){
        this._queue.push(n);
        this.heapMap[n.toString()] = this._queue.length - 1
        this.repairHeap(this._queue.length - 1)
    }

    public repairHeap(index: number) {
        let biggest = this.heapCondition(index)
        while(!this.isLeaf(index) && biggest !== index){
            [this._queue[biggest], this._queue[index]] = [this._queue[index], this._queue[biggest]];
            this.heapMap[this._queue[biggest].toString()] = index;
            this.heapMap[this._queue[index].toString()] = biggest;
            index = biggest;
            biggest = this.heapCondition(index);
        }
        while(index > 0 && index < this._queue.length && this._comparator(this._queue[index],this._queue[this.parent(index)])){
            [this._queue[this.parent(index)], this._queue[index]] = [this._queue[index], this._queue[this.parent(index)]];
            this.heapMap[this._queue[this.parent(index)].toString()] = index;
            this.heapMap[this._queue[index].toString()] = this.parent(index);
            index = this.parent(index);
        }
    }



    public pop(){
        if(this.size() === 0){
            throw 'the queue is empty'
        }
        const result = this._queue[0];
        this._queue[0] = this._queue[this.size() - 1];
        this.heapMap[this._queue[0].toString()] = 0
        delete this.heapMap[this._queue.length - 1]
        this._queue.pop();
        this.repairHeap(0)
        return result;
    }


}