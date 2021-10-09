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

    public hoursString():string{
        return this._hours < 10 ? "0"+this._hours : this._hours.toString()
    }

    public minutesString():string{
        return this._minutes < 10 ? "0"+this._minutes : this._minutes.toString()
    }

    public secondsString():string{
        return this._seconds < 10 ? "0"+this._seconds : this._seconds.toString()
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