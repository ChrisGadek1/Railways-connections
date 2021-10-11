import Line from "./Line";
import WeekDate from "./WeekDate";
import GraphNode from "./GraphNode";

export default class Graph{
    private readonly _lines: Line[];
    private readonly _time: WeekDate;
    private _nodes: GraphNode[] = [];


    get lines(): Line[] {
        return this._lines;
    }

    get time(): WeekDate {
        return this._time;
    }

    get nodes(): GraphNode[] {
        return this._nodes;
    }

    constructor(lines: Line[], time: WeekDate) {
        this._lines = lines;
        this._time = time;
    }

    public createNodes(){

    }
}