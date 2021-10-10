import Line from "../../data/classes/Line";
import $ from "jquery";
import L, {LatLngExpression} from "leaflet";

export default class LineDetailsMapProvider{
    public static set line(value: Line) {
        this._line = value;
    }
    private static instance: LineDetailsMapProvider;
    private static _line:Line;
    private static isLayerAdded: boolean = false;
    public map: any;

    public static getInstance(line: Line){
        let div = $('#line-details-map');
        let width:number | undefined = div.width();
        div.css('height', width+"px");
        if(!LineDetailsMapProvider.instance){
            LineDetailsMapProvider.instance = new LineDetailsMapProvider();
        }
        LineDetailsMapProvider.line = line;
        return LineDetailsMapProvider.instance
    }

    public removeMap(){
        LineDetailsMapProvider.instance.map.remove()
        LineDetailsMapProvider.instance.map = undefined
        LineDetailsMapProvider.isLayerAdded = false
    }

    public addMap(){
        if(LineDetailsMapProvider.instance.map === undefined){
            LineDetailsMapProvider.instance.map = L.map('station-details-map').setView([50.265951,  19.616134], 12.1);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            }).addTo(LineDetailsMapProvider.instance.map);
        }
    }

    public drawLine(line: Line) {
        const points: LatLngExpression[] = line.stations.map(station => {
            return [station.location.lat, station.location.lon]
        })
        let polyline = L.polyline(points).addTo(LineDetailsMapProvider.instance.map)
        polyline.setStyle({
            color: "blue",
            weight: 6
        })
    }

    private constructor() {}
}