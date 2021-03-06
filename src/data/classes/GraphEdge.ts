import GraphNode from "./GraphNode";
import Node from "./Node";

export default class GraphEdge{
    private _cost: number|undefined = undefined;
    private readonly _destination: GraphNode;
    private readonly _source: GraphNode;


    constructor(destination: GraphNode, source: GraphNode) {
        this._destination = destination;
        this._source = source;
    }

    get cost(): number|undefined {
        return this._cost;
    }

    set cost(value: number|undefined) {
        this._cost = value;
    }

    get destination(): GraphNode {
        return this._destination;
    }

    get source(): GraphNode {
        return this._source;
    }
}