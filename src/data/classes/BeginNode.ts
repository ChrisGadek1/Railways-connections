import GraphEdge from "./GraphEdge";
import WeekDate from "./WeekDate";
import Station from "./Station";
import GraphNode from "./GraphNode";
import Node from "./Node";

export default class BeginNode extends Node{
    private _weekDate: WeekDate|undefined;

    constructor(station: Station, weekDate: WeekDate | undefined, visited: boolean) {
        super(visited, station);
        this._weekDate = weekDate;
        this.station = station;
    }


    get weekDate(): WeekDate | undefined {
        return this._weekDate;
    }

    set weekDate(value: WeekDate | undefined) {
        this._weekDate = value;
    }

}