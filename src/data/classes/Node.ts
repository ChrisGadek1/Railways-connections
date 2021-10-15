import GraphEdge from "./GraphEdge";
import Station from "./Station";

export default class Node{
    private _visited: boolean;
    protected _neighbours:GraphEdge[] = [];
    private _station: Station;


    get station(): Station {
        return this._station;
    }

    set station(value: Station) {
        this._station = value;
    }

    get visited(): boolean {
        return this._visited;
    }

    set visited(value: boolean) {
        this._visited = value;
    }

    get neighbours(): GraphEdge[] {
        return this._neighbours;
    }

    set neighbours(value: GraphEdge[]) {
        this._neighbours = value;
    }

    constructor(visited: boolean, station: Station) {
        this._visited = visited;
        this._station = station;
    }
}