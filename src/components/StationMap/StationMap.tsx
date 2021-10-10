import React, {useEffect} from "react";
import Station from "../../data/classes/Station";
import StationDetailsMapProvider from "../../services/mapProviders/StationDetailsMapProvider";

type propsType = {
    station: Station
}

const StationMap = (props: propsType) => {

    useEffect(() => {
        if(props.station !== undefined){
            const mapProvider = StationDetailsMapProvider.getInstance(props.station)
            mapProvider.addMap()
            mapProvider.addStationToTheMap()
            return () => {
                mapProvider.removeMap()
            }
        }

    },[])

    return(
        <div id="station-details-map"></div>
    )
}

export default StationMap;