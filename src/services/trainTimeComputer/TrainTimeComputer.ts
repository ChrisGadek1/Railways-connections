import {DistanceComputer} from "./DistanceComputer";
import Station from "../../data/classes/Station";

type location = {
    lon: number,
    lat: number
}

export default class TrainTimeComputer{
    public static computeTime(point1: location, point2:location, speed: number):number{
        return Math.trunc(DistanceComputer.computeDistance(point1, point2)*this.kmhToMs(speed));
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