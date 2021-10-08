import axios from "axios";
import '@testing-library/jest-dom'
import DataProvider from "../../dataProvider/DataProvider";
import Station from "../../../data/classes/Station";
import Line from "../../../data/classes/Line";
import {LinesFilter} from "./LinesFilter";
import {StationsFilter} from "../StationsFilter";

const validStations = require('../../../__mocks__/stations.json')
const validLines = require('../../../__mocks__/lines.json')

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

it("returns valid lines list if chosen line", async () => {
    mockedAxios.all.mockRejectedValue('Network error: Something went wrong');
    mockedAxios.all.mockResolvedValue([{data: {"stations":validStations.stations}}, {data: {"lines":validLines.lines}}]);

    const dataProvider = DataProvider.getInstance();

    const data:{stations: Station[], lines: Line[]} = await dataProvider.fetchData();

    const line: Line|undefined = data.lines.find((line: Line) => line.name === 'AWK');
    if(line === undefined){
        throw 'station didn\' found!'
    }
    const filteredLines = LinesFilter.filter(data.lines, [], [line]);
    expect(filteredLines.length).toEqual(1)
    expect(filteredLines.find(line => line.name === 'AWK')).not.toEqual(undefined)

})

it("returns valid lines list if chosen stations", async () => {

    mockedAxios.all.mockRejectedValue('Network error: Something went wrong');
    mockedAxios.all.mockResolvedValue([{data: {"stations":validStations.stations}}, {data: {"lines":validLines.lines}}]);

    const dataProvider = DataProvider.getInstance();

    const data:{stations: Station[], lines: Line[]} = await dataProvider.fetchData();

    const stations: Station[] = data.stations.filter(station => station.id === 9 || station.id === 8 || station.id === 16)
    const filteredLines = LinesFilter.filter(data.lines, stations, []);
    expect(filteredLines.length).toEqual(2);
    expect(filteredLines.map(line => line.name).sort()).toEqual(['AWK','BRS'])
})