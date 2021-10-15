import Line from "./Line";

export default class Station {
    public stationNumber(line: Line){
        const result = line.stations.indexOf(this);
        //console.log(result+" "+line.name+" "+this._name);
        return result;
    }

    get id(): number {
        return this._id;
    }

    get location(): { lat: number; lon: number } {
        return this._location;
    }

    get name(): string {
        return this._name;
    }

    constructor(id: number, name: string, location: {lat: number, lon: number}) {
        this._name = name;
        this._location = location
        this._id = id;
    }

    private readonly _name: string;

    private readonly _id: number;

    private readonly _location: {
        lat: number,
        lon: number
    }
}