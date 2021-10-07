import '@testing-library/jest-dom'
import DataProvider from "./DataProvider";
import Station from "../../data/classes/Station";
import axios from "axios";
import Line from "../../data/classes/Line";
import WeekDateConverter from "../WeekDateConverter/WeekDateConverter";
const validStations = require('../../__mocks__/stations.json')
const validLines = require('../../__mocks__/lines.json')

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;


it("creates valid stations objects", async () => {
    mockedAxios.all.mockRejectedValue('Network error: Something went wrong');
    mockedAxios.all.mockResolvedValue([{data: {"stations":validStations.stations}}, {data: {"lines":validLines.lines}}]);

    const dataProvider = DataProvider.getInstance();

    const data:{stations: Station[], lines: Line[]} = await dataProvider.fetchData();

    const stationsTest: Station[] = data.stations
    const stations = validStations.stations
    for(let i = 0; i < stations.length; i++){
        expect(stationsTest[i].id).toEqual(stations[i].id);
        expect(stationsTest[i].name).toEqual(stations[i].name)
        expect(stationsTest[i].location).toEqual(stations[i].location)
    }

})

it("creates valid lines objects", async () => {
    mockedAxios.all.mockRejectedValue('Network error: Something went wrong');
    mockedAxios.all.mockResolvedValue([{data: {"stations":validStations.stations}}, {data: {"lines":validLines.lines}}]);
    const dataProvider = DataProvider.getInstance();

    const data:{stations: Station[], lines: Line[]} = await dataProvider.fetchData();
    const lines = validLines.lines
    const linesTest: Line[] = data.lines
    const weekDateConverter = new WeekDateConverter();
    for(let i = 0; i < lines.length; i++){
        expect(linesTest[i].begin.id).toEqual(lines[i].begin)
        expect(linesTest[i].end.id).toEqual(lines[i].end)
        expect(linesTest[i].time.map((weekDate) =>{
            return weekDateConverter.convertToSeconds(weekDate);
        })).toEqual(lines[i].time);
        expect(linesTest[i].stations.map((station: Station) => {
            return station.id
        })).toEqual(lines[i].stations)
    }
})
