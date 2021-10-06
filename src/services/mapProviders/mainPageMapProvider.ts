import L from 'leaflet'
import $ from "jquery";
import Station from "../../data/classes/Station";

export default class MainPageMapProvider{
    private static instance: MainPageMapProvider;
    private static isLayerAdded: boolean = false;

    private map: any;

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
}