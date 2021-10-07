import '@testing-library/jest-dom'
import DataProvider from "../dataProvider/DataProvider";
import Station from "../../data/classes/Station";
import {StationsFilter} from "./StationsFilter";
import Line from "../../data/classes/Line";
import axios from "axios";
const validStations = require('../../__mocks__/stations.json')
const validLines = require('../../__mocks__/lines.json')

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

it("returns valid stations list if chosen station", async () => {
    mockedAxios.all.mockRejectedValue('Network error: Something went wrong');
    mockedAxios.all.mockResolvedValue([{data: {"stations":validStations.stations}}, {data: {"lines":validLines.lines}}]);

    const dataProvider = DataProvider.getInstance();

    const data:{stations: Station[], lines: Line[]} = await dataProvider.fetchData();

    const station: Station|undefined = data.stations.find((station: Station) => station.id === 5);
    if(station === undefined){
        throw 'station didn\' found!'
    }
    const filteredStations = StationsFilter.filter(data.stations, [station], []);
    expect(filteredStations.length).toEqual(1)
    expect(filteredStations.find(station => station.id === 5)).not.toEqual(undefined)

})

it("returns valid stations list if chosen lines", async () => {

    mockedAxios.all.mockRejectedValue('Network error: Something went wrong');
    mockedAxios.all.mockResolvedValue([{data: {"stations":validStations.stations}}, {data: {"lines":validLines.lines}}]);

    const dataProvider = DataProvider.getInstance();

    const data:{stations: Station[], lines: Line[]} = await dataProvider.fetchData();

    const lines: Line[] = data.lines.filter((line: Line) => line.name === 'WK' || line.name === 'AWK')
    const filteredStations = StationsFilter.filter(data.stations, [], lines);
    expect(filteredStations.length).toEqual(3);
    expect(filteredStations.map(station => station.name).sort()).toEqual(['Bogucin Mały', 'Osiek Centralny', 'Witeradów'])

})