import Station from "./Station";
import WeekDate from "./WeekDate";

export default class Line{

    constructor(name: string, stations: Station[], begin: Station, end: Station, time: WeekDate[]) {
        this._name = name;
        this._stations = stations;
        this._begin = begin;
        this._end = end;
        this._time = time;
    }


    get name(): string {
        return this._name;
    }

    get stations(): Station[] {
        return this._stations;
    }

    get begin(): Station {
        return this._begin;
    }

    get end(): Station {
        return this._end;
    }

    get time(): WeekDate[] {
        return this._time;
    }

    private readonly _name: string;
    private readonly _stations: Station[];
    private readonly _begin: Station;
    private readonly _end: Station;
    private readonly _time: WeekDate[];

}