import L from 'leaflet'
import $ from "jquery";

export default class MainPageMapProvider{
    private map;

    constructor() {
        let div = $('#mapid');
        let width:number | undefined = div.width();

        div.css('height', width+"px");

        this.map = L.map('mapid').setView([50.265951,  19.616134], 12.1);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

    }
}