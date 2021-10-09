import {DistanceComputer} from "./DistanceComputer";

type location = {
    lon: number,
    lat: number
}

export default class TrainTimeComputer{
    public static computeTime(point1: location, point2:location, speed: number):number{
        return DistanceComputer.computeDistance(point1, point2)*this.kmhToMs(speed);
    }

    private static kmhToMs(speed: number){
        return speed / 3.6
    }

}