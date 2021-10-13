import {DistanceComputer} from "./DistanceComputer";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";
import WeekDate from "../../data/classes/WeekDate";
import WeekDateConverter from "../WeekDateConverter/WeekDateConverter";

type location = {
    lon: number,
    lat: number
}

export default class TrainTimeComputer{

    public static getTimeOfTheNextTrain(currentTime: WeekDate,station: Station, line: Line, reversed: boolean, speed: number){
        const weekDateConverter = new WeekDateConverter();
        const stationIndex = line.stations.indexOf(station);
        const stationToCurrentStation = reversed ?
            line.stations.concat(line.stations.slice(stationIndex, line.stations.length - 1).reverse()) :
            line.stations.slice(0, stationIndex + 1)
        const departuresTime = line.time.map(time => {
            return weekDateConverter.convertToSeconds(time) + TrainTimeComputer.computeTimeBetweenStationsChain(stationToCurrentStation, speed)
        })
        departuresTime.sort()
        const currentTimeInSeconds = weekDateConverter.convertToSeconds(currentTime)
        const biggerTime = departuresTime.find(time => time > currentTimeInSeconds);
        if(biggerTime === undefined){
            return departuresTime[0]
        }
        else return biggerTime % 604800

    }

    public static computeTime(point1: location, point2:location, speed: number):number{
        const result =  Math.trunc(DistanceComputer.computeDistance(point1, point2)/this.kmhToMs(speed));
        return result
    }

    public static computeTimeBetweenStationsChain(stations: Station[], speed: number): number{
        let result = 0;
        for(let i = 0; i < stations.length - 1; i++){
            result += this.computeTime(stations[i].location, stations[i+1].location, speed) + 30;
        }
        return result;
    }

    private static kmhToMs(speed: number){
        return speed / 3.6
    }

}