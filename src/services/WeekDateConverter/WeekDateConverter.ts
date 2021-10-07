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
        const secondsComputed: number = Math.trunc(((( seconds % 86400 ) % 3600 ) % 60))

        return new WeekDate(day, hours, minutes, secondsComputed)
    }

    convertToSeconds(weekDate: WeekDate){
        switch (weekDate.weekDay){
            case Day.MONDAY:
                return 86400*0 + weekDate.hours * 3600 + weekDate.minutes * 60 + weekDate.seconds
            case Day.TUESDAY:
                return 86400*1 + weekDate.hours * 3600 + weekDate.minutes * 60 + weekDate.seconds
            case Day.WEDNESDAY:
                return 86400*2 + weekDate.hours * 3600 + weekDate.minutes * 60 + weekDate.seconds
            case Day.THURSDAY:
                return 86400*3 + weekDate.hours * 3600 + weekDate.minutes * 60 + weekDate.seconds
            case Day.FRIDAY:
                return 86400*4 + weekDate.hours * 3600 + weekDate.minutes * 60 + weekDate.seconds
            case Day.SATURDAY:
                return 86400*5 + weekDate.hours * 3600 + weekDate.minutes * 60 + weekDate.seconds
            case Day.SUNDAY:
                return 86400*6 + weekDate.hours * 3600 + weekDate.minutes * 60 + weekDate.seconds
            default:
                return -1
        }
    }

}