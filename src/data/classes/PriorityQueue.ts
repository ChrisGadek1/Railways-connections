export class PriorityQueue<T>{

    // (a: child, b: parent)
    private readonly _comparator: (a: T, b: T) => boolean;
    private _queue: T[] = [];

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
        let index = this.size() - 1;
        while(index > 0 && this._comparator(this._queue[index],this._queue[this.parent(index)])){
            [this._queue[this.parent(index)], this._queue[index]] = [this._queue[index], this._queue[this.parent(index)]];
            index = this.parent(index);
        }
    }

    public pop(){
        if(this.size() === 0){
            throw 'the queue is empty'
        }
        const result = this._queue[0];
        this._queue[0] = this._queue[this.size() - 1];
        this._queue.pop();
        let index = 0;
        let biggest = this.heapCondition(index)
        while(!this.isLeaf(index) && biggest !== index){
            [this._queue[biggest], this._queue[index]] = [this._queue[index], this._queue[biggest]];
            index = biggest;
            biggest = this.heapCondition(index);
        }
        return result;
    }


}