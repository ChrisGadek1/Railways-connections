import '@testing-library/jest-dom'
import Day from "../../data/enums/Day";
import WeekDateConverter from "./WeekDateConverter";

const testData = [
    {
        seconds: 360300,
        day: Day.FRIDAY,
        hours: 4,
        minutes: 5
    },
    {
        seconds: 236160,
        day: Day.WEDNESDAY,
        hours: 17,
        minutes: 36
    },
    {
        seconds: 128940,
        day: Day.TUESDAY,
        hours: 11,
        minutes: 49
    },
    {
        seconds: 0,
        day: Day.MONDAY,
        hours: 0,
        minutes: 0
    },
    {
        seconds: 82500,
        day: Day.MONDAY,
        hours: 22,
        minutes: 55
    },
    {
        seconds: 604799,
        day: Day.SUNDAY,
        hours: 23,
        minutes: 59
    }
]

it("converts correctly seconds to WeekDate object", async () => {
    const weekDateConverter = new WeekDateConverter();
    testData.forEach((data:{seconds: number, day: Day, hours: number, minutes: number}) => {
        const convertedDate = weekDateConverter.convert(data.seconds);
        expect(convertedDate.minutes).toEqual(data.minutes)
        expect(convertedDate.hours).toEqual(data.hours)
        expect(convertedDate.weekDay).toEqual(data.day)
    })
})