import { render } from '@testing-library/react'
import App from "../App/App";

it("renders the map without crash", async () => {
    render(<App/>)
    const mapElement = document.getElementById("mapid");
    expect(mapElement).not.toBeNull()
})

it("renders the map with valid classes", async () => {
    render(<App/>)
    const mapElement = document.getElementById("mapid");
    if(mapElement !== null){
        expect(mapElement.className).toEqual("leaflet-container leaflet-grab leaflet-touch-drag")
    }
})

it("renders the map with valid div children", async () => {
    render(<App/>)
    const mapElement = document.getElementById("mapid");
    if(mapElement !== null){
        expect(mapElement.children[0].className).toEqual("leaflet-pane leaflet-map-pane")
        expect(mapElement.children[1].className).toEqual("leaflet-control-container")
    }
})