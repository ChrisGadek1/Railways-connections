import Station from "./Station";
import Line from "./Line";
import GraphEdge from "./GraphEdge";

export default class GraphNode{
    private _station: Station;
    private _line: Line;
    private _neighbours: GraphEdge[];
    private _visited: boolean;


    constructor(station: Station, line: Line, neighbours: GraphEdge[], visited: boolean) {
        this._station = station;
        this._line = line;
        this._neighbours = neighbours;
        this._visited = visited;
    }


    get station(): Station {
        return this._station;
    }

    set station(value: Station) {
        this._station = value;
    }

    get line(): Line {
        return this._line;
    }

    set line(value: Line) {
        this._line = value;
    }

    public addNeighbour(edge: GraphEdge){
        this._neighbours.push(edge);
    }

    get neighbours(): GraphEdge[] {
        return this._neighbours;
    }

    get visited(): boolean {
        return this._visited;
    }

    set visited(value: boolean) {
        this._visited = value;
    }
}