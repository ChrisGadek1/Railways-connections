import Day from "../enums/Day";

export default class WeekDate {

    get weekDay(): Day {
        return this._weekDay;
    }

    get hours(): number {
        return this._hours;
    }

    get minutes(): number {
        return this._minutes;
    }

    constructor(weekDay: Day, hours: number, minutes: number) {
        this._weekDay = weekDay;
        this._hours = hours;
        this._minutes = minutes;
    }

    private readonly _weekDay: Day;
    private readonly _hours: number;
    private readonly _minutes: number;
}