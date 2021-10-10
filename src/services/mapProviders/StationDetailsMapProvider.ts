import $ from "jquery";
import L from "leaflet";
import Station from "../../data/classes/Station";

export default class StationDetailsMapProvider{
    public static set station(value: Station) {
        this._station = value;
    }
    private static instance: StationDetailsMapProvider;
    private static _station:Station;
    private static isLayerAdded: boolean = false;
    public map: any;

    public static getInstance(station: Station){
        let div = $('#station-details-map');
        let width:number | undefined = div.width();
        div.css('height', width+"px");
        if(!StationDetailsMapProvider.instance){
            StationDetailsMapProvider.instance = new StationDetailsMapProvider();
        }
        StationDetailsMapProvider.station = station;
        return StationDetailsMapProvider.instance
    }

    public removeMap(){
        StationDetailsMapProvider.instance.map.remove()
        StationDetailsMapProvider.instance.map = undefined
        StationDetailsMapProvider.isLayerAdded = false
    }

    public addStationToTheMap(){
        const {location, name} = StationDetailsMapProvider._station
        L.marker([location.lat, location.lon]).addTo(StationDetailsMapProvider.instance.map).bindPopup(name)
    }

    public addMap(){
        if(StationDetailsMapProvider.instance.map === undefined){
            const loc = StationDetailsMapProvider._station.location
            StationDetailsMapProvider.instance.map = L.map('station-details-map').setView([loc.lat,  loc.lon], 13.1);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            }).addTo(StationDetailsMapProvider.instance.map);
        }
    }

    private constructor() {}


}