export default class Station {

    get location(): { lat: number; lon: number } {
        return this._location;
    }

    get name(): string {
        return this._name;
    }

    constructor(name: string, location: {lat: number, lon: number}) {
        this._name = name;
        this._location = location
    }

    private readonly _name: string;

    private readonly _location: {
        lat: number,
        lon: number
    }
}