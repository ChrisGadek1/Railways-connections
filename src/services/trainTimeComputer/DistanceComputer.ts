type location = {
    lon: number,
    lat: number
}


export class DistanceComputer{
    public static computeDistance(point1:location, point2: location): number{
        const planetR = 6371000;
        const result =  Math.trunc(Math.acos(
            Math.sin(this.degreesToRadians(point1.lat))*
            Math.sin(this.degreesToRadians(point2.lat))+
            Math.cos(this.degreesToRadians(point1.lat))*
            Math.cos(this.degreesToRadians(point2.lat))*
            Math.cos(this.degreesToRadians(point1.lon - point2.lon))
        )*planetR)
        return result
    }

    private static degreesToRadians(degrees:number){
        let pi = Math.PI;
        return degrees * (pi/180);
    }
}