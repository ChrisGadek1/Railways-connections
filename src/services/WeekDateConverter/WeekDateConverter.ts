import Day from "../../data/enums/Day";
import WeekDate from "../../data/classes/WeekDate";

export default class WeekDateConverter{

    convert(seconds: number): WeekDate{
        seconds %= 604800
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

    convertFromDate(date: Date): WeekDate{
        const seconds = date.getSeconds();
        const minutes = date.getMinutes();
        const hours = date.getHours();
        const weekDay = (date.getDay() - 1) % 7;
        return new WeekDate(weekDay,hours,minutes,seconds);
    }

    convertToSeconds(weekDate: WeekDate|undefined){
        if(weekDate === undefined){
            return Infinity;
        }
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

    getPolishNameOfTheWeekDay(day: Day){
        switch (day) {
            case Day.MONDAY:
                return 'Poniedziałek'
            case Day.TUESDAY:
                return 'Wtorek'
            case Day.WEDNESDAY:
                return 'Środa'
            case Day.THURSDAY:
                return 'Czwartek'
            case Day.FRIDAY:
                return 'Piątek'
            case Day.SATURDAY:
                return 'Sobota'
            case Day.SUNDAY:
                return 'Niedziela'
        }
    }

}