import axios from "axios";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";
import WeekDateConverter from "../WeekDateConverter/WeekDateConverter";
import {StationJson} from "../../data/types/StationJson";
import {LinesJson} from "../../data/types/LinesJson";
import {LineJsonElement} from "../../data/types/LineJsonElement";

export default class DataProvider{
    private static instance: DataProvider;
    private _stations: Station[] = [];
    private _lines: Line[] = [];

    private constructor() {}


    get stations(): Station[] {
        return this._stations;
    }

    get lines(): Line[] {
        return this._lines;
    }

    public static getInstance(){
        if(!DataProvider.instance){
            DataProvider.instance = new DataProvider();
        }

        return DataProvider.instance
    }

    public fetchData(){
        return axios.all([axios.get('/jsons/stations.json'), axios.get('/jsons/lines.json')]).then((responses) => {
            const {data: {stations}}:StationJson = responses[0];
            const {data: {lines} }:LinesJson = responses[1];
            DataProvider.instance._stations = stations.map(station => {
                return new Station(station.id, station.name, station.location);
            })
            DataProvider.instance._lines = lines.map(line => {
                return DataProvider.createLineObject(line, stations);
            })
            return {stations: DataProvider.instance.stations, lines: DataProvider.instance.lines }
        }).catch(() => {
            console.error('error with Internet Connection!');
            return {stations: [], lines: [] }
        });
    }

    private static createLineObject(line: LineJsonElement, stations: Station[]){
        const weekDateConverter = new WeekDateConverter()
        const lineStations = line.stations.map(stationID => {
            const foundStation = stations.find(stationToFind => {
                return stationToFind.id === stationID
            })
            if(foundStation !== undefined){
                return foundStation
            }
            else{
                throw 'cannot find station with ID '+stationID
            }
        })
        const beginStation = stations.find(station => {
            return station.id === line.begin
        })
        const endStation = stations.find(station => {
            return station.id === line.end
        })
        const weekDays = line.time.map(departureTime => {
            return weekDateConverter.convert(departureTime)
        })
        if(beginStation === undefined){
            throw `Line ${line.name} has wrong begin station id`
        }
        if(endStation === undefined){
            throw `Line ${line.name} has wrong end station id`
        }
        return new Line(line.name, lineStations, beginStation, endStation, weekDays);
    }

}