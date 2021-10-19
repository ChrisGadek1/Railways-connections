import $ from "jquery";
import L, {LatLngExpression} from "leaflet";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";
import WeekDateConverter from "../WeekDateConverter/WeekDateConverter";

type path = {
    path: [
        {
            station: Station,
            line: Line,
            time: number
        }
    ]
}

export default class ConnectionMapProvider{
    private static instance: ConnectionMapProvider;
    private static isLayerAdded: boolean = false;

    public map: any;

    private constructor() {

    }

    public static getInstance(){
        let div = $('#mapdiv-connection');
        let width:number | undefined = div.width();
        div.css('height', width+"px");

        if(!ConnectionMapProvider.instance){
            ConnectionMapProvider.instance = new ConnectionMapProvider();
        }

        return ConnectionMapProvider.instance
    }

    public removeMap(){
        ConnectionMapProvider.instance.map.remove()
        ConnectionMapProvider.instance.map = undefined
        ConnectionMapProvider.isLayerAdded = false
    }

    public addMap(){
        if(ConnectionMapProvider.instance.map === undefined){
            ConnectionMapProvider.instance.map = L.map('mapdiv-connection').setView([50.265951,  19.616134], 12.1);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            }).addTo(ConnectionMapProvider.instance.map);
        }
    }

    public addConnections(path: path, colors: string){
        const weekDateConverter = new WeekDateConverter()
        let colorIndex = 0;
        path.path.forEach((p, i) => {
            const date = weekDateConverter.convert(p.time);
            const stringDate = date.hoursString()+":"+date.minutesString()
            L.marker([p.station.location.lat, p.station.location.lon]).addTo(ConnectionMapProvider.instance.map).bindPopup(p.station.name+"<br>"+p.line.name+"<br>"+stringDate);
            if(i > 0){
                const points:LatLngExpression[] = [[p.station.location.lat, p.station.location.lon], [path.path[i-1].station.location.lat, path.path[i-1].station.location.lon]]
                let poly = L.polyline(points).addTo(this.map);
                if(p.line.name !== path.path[i - 1].line.name){
                    colorIndex++
                }
                poly.setStyle({
                    color: colors[colorIndex],
                    weight: 6
                })
            }
        })
    }
}