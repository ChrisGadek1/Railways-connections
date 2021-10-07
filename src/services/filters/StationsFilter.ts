import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";

export class StationsFilter{
    public static filter(allStations: Station[] ,selectedStations: Station[], selectedLines: Line[]): Station[]{
        return allStations.filter(station => {
            if(selectedStations.length === 1){
                if(selectedStations[0].id === station.id){
                    return true;
                }
                else {
                    return false
                }
            }

            let flag = true;
            selectedLines.forEach((line: Line) => {
                if(line.stations.find(stationToFind => stationToFind.id === station.id) === undefined){
                    flag = false
                }
            })
            return flag;

        })
    }
}