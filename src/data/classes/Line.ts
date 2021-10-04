import Station from "./Station";

export default class Line{
    get name(): string {
        return this._name;
    }

    get stations(): Station[] {
        return this._stations;
    }

    constructor(name: string, stations: Station[]) {
        this._name = name;
        this._stations = stations;
    }

    private readonly _name: string;
    private readonly _stations: Station[];

}