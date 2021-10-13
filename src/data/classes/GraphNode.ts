import Station from "./Station";
import Line from "./Line";
import GraphEdge from "./GraphEdge";
import WeekDate from "./WeekDate";

export default class GraphNode{
    private _station: Station;
    private _line: Line;
    private _neighbours: GraphEdge[] = [];
    private _weekDate: WeekDate = new WeekDate(0,0,0,0);
    private _visited: boolean;
    private readonly _reversed: boolean


    constructor(station: Station, line: Line, visited: boolean, reversed: boolean) {
        this._station = station;
        this._line = line;
        this._visited = visited;
        this._reversed = reversed;
    }

    get weekDate(): WeekDate {
        return this._weekDate;
    }

    set weekDate(value: WeekDate) {
        this._weekDate = value;
    }

    get reversed(): boolean{
        return this._reversed
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