export default class Station {
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