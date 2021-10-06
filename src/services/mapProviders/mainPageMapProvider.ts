import L, {Control, LatLngExpression, Polyline} from 'leaflet'
import $ from "jquery";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";
import {addFunctionsToLegend, makeLegendDropDown} from "./helpers";

type linePolyLine = {
    lineName: string,
    polyLine: Polyline
}

export default class MainPageMapProvider{
    private static instance: MainPageMapProvider;
    private static isLayerAdded: boolean = false;
    public static polyLines: linePolyLine[] = [];

    public map: any;

    private constructor() {

    }

    public static getInstance(){
        let div = $('#mapid');
        let width:number | undefined = div.width();
        div.css('height', width+"px");

        if(!MainPageMapProvider.instance){
            MainPageMapProvider.instance = new MainPageMapProvider();
        }

        return MainPageMapProvider.instance
    }

    public removeMap(){
        MainPageMapProvider.instance.map.remove()
        MainPageMapProvider.instance.map = undefined
        MainPageMapProvider.isLayerAdded = false
    }

    public addMap(){
        if(MainPageMapProvider.instance.map === undefined){
            MainPageMapProvider.instance.map = L.map('mapid').setView([50.265951,  19.616134], 12.1);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
            }).addTo(MainPageMapProvider.instance.map);
        }
    }


    public addPointsToTheMap(stations: Station[]){
        stations.forEach(station => {
            L.marker([station.location.lat, station.location.lon]).addTo(MainPageMapProvider.instance.map)
        })
    }

    public drawLineOfStations(line: Line, color: string){
        const points:LatLngExpression[] = line.stations.map(station => {
            return [station.location.lat, station.location.lon]
        })
        let polyline = L.polyline(points).addTo(MainPageMapProvider.instance.map)
        polyline.setStyle({
            color,
            weight: 6
        })
        MainPageMapProvider.polyLines.push({lineName: line.name, polyLine: polyline})
    }

    public createLegend(lines: Line[], colors: string[]){
        // @ts-ignore
        let legend = L.control({position: 'bottomleft'});
        legend.onAdd = function(map:any) {

            let div = L.DomUtil.create('div', 'info legend');
            let labels:string[] = []
            let upperLaber = '<strong id="upper-label">Linie <i class="icon-down-open rotate-icon"></i></strong>'
            lines.forEach((line, index) => {
                labels.push(`
                    <span class="legend-fragment">
                        <div class="circle-legend" style="background-color: ${colors[index]}"></div><span>${line.name}: ${line.begin.name} - ${line.end.name}</span>
                    </span>
                `)

            })

            div.innerHTML = upperLaber + '<div id="labels-container" class="hide-legend">'+labels.join('<br>')+'</div>' ;
            return div;
        };
        legend.addTo(MainPageMapProvider.instance.map);
        addFunctionsToLegend()
        makeLegendDropDown()
    }


}