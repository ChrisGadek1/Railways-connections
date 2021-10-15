import Station from "./Station";
import Line from "./Line";
import GraphEdge from "./GraphEdge";
import WeekDate from "./WeekDate";
import Node from "./Node";

export default class GraphNode extends Node{
    private _line: Line|undefined;
    private _weekDate: WeekDate|undefined;
    private _previous_node: GraphNode|undefined;
    private readonly _reversed: boolean


    constructor(station: Station, line: Line|undefined, visited: boolean, reversed: boolean) {
        super(visited, station);
        this._line = line;
        this._reversed = reversed;
    }

    getTime(): number{
        if(this.weekDate === undefined){
            return Infinity
        }
        else{
            return this.weekDate.convertToSeconds()
        }
    }

    get previous_node(): GraphNode | undefined {
        return this._previous_node;
    }

    set previous_node(value: GraphNode | undefined) {
        this._previous_node = value;
    }

    get weekDate(): WeekDate|undefined {
        return this._weekDate;
    }

    set weekDate(value: WeekDate|undefined) {
        this._weekDate = value;
    }

    get reversed(): boolean{
        return this._reversed
    }

    get line(): Line {
        if(this._line === undefined){
            throw 'line is undefined'
        }
        else{
            return this._line;
        }

    }

    set line(value: Line) {
        this._line = value;
    }

    public addNeighbour(edge: GraphEdge){
        this._neighbours.push(edge);
    }

}