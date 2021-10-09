import Day from "../enums/Day";
import WeekDateConverter from "../../services/WeekDateConverter/WeekDateConverter";

export default class WeekDate {
    get seconds(): number {
        return this._seconds;
    }

    get weekDay(): Day {
        return this._weekDay;
    }

    get hours(): number {
        return this._hours;
    }

    get minutes(): number {
        return this._minutes;
    }

    addTime(seconds: number){
        const weekDateConverter = new WeekDateConverter();
        const newWeekDate = weekDateConverter.convert(weekDateConverter.convertToSeconds(this) + seconds);
        this._hours = newWeekDate.hours;
        this._seconds = newWeekDate.seconds;
        this._weekDay = newWeekDate.weekDay;
        this._minutes = newWeekDate.minutes
    }

    constructor(weekDay: Day, hours: number, minutes: number, seconds: number) {
        this._weekDay = weekDay;
        this._hours = hours;
        this._minutes = minutes;
        this._seconds = seconds;
    }

    private _seconds: number;
    private _weekDay: Day;
    private _hours: number;
    private _minutes: number;
}