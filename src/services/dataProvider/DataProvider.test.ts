import '@testing-library/jest-dom'
import DataProvider from "./DataProvider";
import Station from "../../data/classes/Station";
import axios from "axios";
import {StationJson} from "../../data/types/StationJson";
import {LinesJson} from "../../data/types/LinesJson";
import Line from "../../data/classes/Line";
import WeekDateConverter from "../WeekDateConverter/WeekDateConverter";

it("creates valid stations objects", async () => {
    const dataProvider = DataProvider.getInstance();
    axios('/jsons/stations.json').then(({ data: {stations} }:StationJson) => {
        const stationsTest: Station[] = dataProvider.stations
        for(let i = 0; i < stations.length; i++){
            expect(stationsTest[i].id).toEqual(stations[i].id);
            expect(stationsTest[i].name).toEqual(stations[i].name)
            expect(stationsTest[i].location).toEqual(stations[i].location)
        }
    }).catch(() => {
        throw 'fetching data caused an error'
    })
})

it("creates valid lines objects", async () => {
    const dataProvider = DataProvider.getInstance();
    axios('/jsons/lines.json').then(({ data: {lines} }:LinesJson) => {
        const linesTest: Line[] = dataProvider.lines
        const weekDateConverter = new WeekDateConverter();
        for(let i = 0; i < lines.length; i++){
            expect(lines[i].begin).toEqual(linesTest[i].begin.id)
            expect(lines[i].end).toEqual(linesTest[i].end.id)
            expect(lines[i].time).toEqual(linesTest[i].time.map((weekDate) =>{
                return weekDateConverter.convertToSeconds(weekDate);
            }));
            expect(lines[i].stations).toEqual(linesTest[i].stations.map((station: Station) => {
                return station.id
            }))
        }
    }).catch(() => {
        throw 'fetching data caused an error'
    })
})
