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
            DataProvider.fetchData()
        }

        return DataProvider.instance
    }

    private static fetchData(){
        axios("/jsons/stations.json").then(({ data: {stations} }:StationJson) => {
            DataProvider.instance._stations = stations.map(station => {
                return new Station(station.id, station.name, station.location);
            })
        }).then(() => {
            axios("/jsons/lines.json").then( ( {data: {lines} }:LinesJson ) => {
                DataProvider.instance._lines = lines.map(line => {
                    return DataProvider.createLineObject(line);
                })
            })
        });
    }

    private static createLineObject(line: LineJsonElement){
        const weekDateConverter = new WeekDateConverter()
        const lineStations = DataProvider.instance._stations.filter(station => {
            return line.stations.includes(station.id)
        })
        const beginStation = DataProvider.instance._stations.find(station => {
            return station.id === line.begin
        })
        const endStation = DataProvider.instance._stations.find(station => {
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