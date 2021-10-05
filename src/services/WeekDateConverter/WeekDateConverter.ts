import Day from "../../data/enums/Day";
import WeekDate from "../../data/classes/WeekDate";

export default class WeekDateConverter{

    convert(seconds: number): WeekDate{
        let day:Day;
        switch (Math.trunc(seconds / 86400)){
            case 0:
                day = Day.MONDAY;
                break;
            case 1:
                day = Day.TUESDAY
                break;
            case 2:
                day = Day.WEDNESDAY
                break;
            case 3:
                day = Day.THURSDAY
                break;
            case 4:
                day = Day.FRIDAY
                break;
            case 5:
                day = Day.SATURDAY
                break;
            case 6:
                day = Day.SUNDAY
                break;
            default:
                day = Day.MONDAY
        }
        const hours: number = Math.trunc(( seconds % 86400 ) / 3600);
        const minutes: number = Math.trunc((( seconds % 86400 ) % 3600 ) / 60)

        return new WeekDate(day, hours, minutes)
    }

}