import '@testing-library/react'
import WeekDateConverter from "../../services/WeekDateConverter/WeekDateConverter";
import Day from "../enums/Day";

it("adds time to the WeekDate object with correct result", async () => {
    const weekDateConverter = new WeekDateConverter();
    const weekDate = weekDateConverter.convert(128966);
    weekDate.addTime(360300);
    expect(weekDate.weekDay).toEqual(Day.SATURDAY);
    expect(weekDate.hours).toEqual(15);
    expect(weekDate.minutes).toEqual(54)
    expect(weekDate.seconds).toEqual(26)

})