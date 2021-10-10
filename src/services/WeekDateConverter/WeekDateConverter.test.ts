import '@testing-library/jest-dom'
import Day from "../../data/enums/Day";
import WeekDateConverter from "./WeekDateConverter";

const testData = [
    {
        seconds: 360300,
        day: Day.FRIDAY,
        hours: 4,
        minutes: 5,
        sec: 0
    },
    {
        seconds: 236161,
        day: Day.WEDNESDAY,
        hours: 17,
        minutes: 36,
        sec: 1
    },
    {
        seconds: 128966,
        day: Day.TUESDAY,
        hours: 11,
        minutes: 49,
        sec: 26
    },
    {
        seconds: 0,
        day: Day.MONDAY,
        hours: 0,
        minutes: 0,
        sec: 0
    },
    {
        seconds: 82547,
        day: Day.MONDAY,
        hours: 22,
        minutes: 55,
        sec: 47
    },
    {
        seconds: 604799,
        day: Day.SUNDAY,
        hours: 23,
        minutes: 59,
        sec: 59
    },
    {
        seconds: 709599,
        day: Day.TUESDAY,
        hours: 5,
        minutes: 6,
        sec: 39
    }
]

it("converts correctly seconds to WeekDate object", async () => {
    const weekDateConverter = new WeekDateConverter();
    testData.forEach((data:{seconds: number, day: Day, hours: number, minutes: number, sec: number}) => {
        const convertedDate = weekDateConverter.convert(data.seconds);
        expect(convertedDate.minutes).toEqual(data.minutes)
        expect(convertedDate.hours).toEqual(data.hours)
        expect(convertedDate.weekDay).toEqual(data.day)
        expect(convertedDate.seconds).toEqual(data.sec)
    })
})

it("converts correctly WeekDate object to seconds", async () => {
    const weekDateConverter = new WeekDateConverter();
    testData.forEach((data:{seconds: number, day: Day, hours: number, minutes: number}) => {
        const convertedDate = weekDateConverter.convert(data.seconds);
        const convertedDateToSeconds = weekDateConverter.convertToSeconds(convertedDate);
        data.seconds %= 604800
        expect(convertedDateToSeconds).toEqual(data.seconds);
    })
})