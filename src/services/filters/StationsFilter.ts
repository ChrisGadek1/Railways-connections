import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";

export class StationsFilter{
    public static filter(allStations: Station[] ,selectedStations: Station[], selectedLines: Line[]): Station[]{
        return allStations.filter(station => {

            let foundStation = false

            if(selectedStations.length === 1){
                if(selectedStations[0].id === station.id){
                    foundStation = true;
                }
            }
            else{
                foundStation = true
            }


            let flag = true;
            selectedLines.forEach((line: Line) => {
                if(line.stations.find(stationToFind => stationToFind.id === station.id) === undefined){
                    flag = false
                }
            })
            if(selectedLines.length === 0){
                flag = true
            }

            return !(!foundStation || !flag)


        })
    }
}