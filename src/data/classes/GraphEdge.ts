import GraphNode from "./GraphNode";

export default class GraphEdge{
    private _cost: number;
    private readonly _destination: GraphNode;
    private readonly _source: GraphNode;


    constructor(cost: number, destination: GraphNode, source: GraphNode) {
        this._cost = cost;
        this._destination = destination;
        this._source = source;
    }


    get cost(): number {
        return this._cost;
    }

    set cost(value: number) {
        this._cost = value;
    }

    get destination(): GraphNode {
        return this._destination;
    }

    get source(): GraphNode {
        return this._source;
    }
}