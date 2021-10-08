import Line from "../../../data/classes/Line";
import Station from "../../../data/classes/Station";

export class LinesFilter{
    public static filter(allLines: Line[], selectedStations: Station[], selectedLines: Line[]): Line[]{
        return allLines.filter(line => {
            let foundLine = false

            if(selectedLines.length === 1){
                if(selectedLines[0].name === line.name){
                    foundLine = true;
                }
            }
            else{
                foundLine = true
            }

            let stationsMatch = true;

            selectedStations.forEach(station => {
                if(line.stations.find(stationToFind => stationToFind.id === station.id) === undefined){
                    stationsMatch = false
                }
            })

            if(selectedStations.length === 0){
                stationsMatch = true
            }

            return !(!foundLine || !stationsMatch)

        })
    }
}