import '@testing-library/react'
import Graph from "./Graph";
import axios from "axios";
import DataProvider from "../../services/dataProvider/DataProvider";
import Station from "./Station";
import Line from "./Line";
import WeekDateConverter from "../../services/WeekDateConverter/WeekDateConverter";
import WeekDate from "./WeekDate";
const validStations = require('../../__mocks__/stations.json')
const validLines = require('../../__mocks__/lines.json')

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

it("creates valid graph based on one line", async () => {
    mockedAxios.all.mockRejectedValue('Network error: Something went wrong');
    mockedAxios.all.mockResolvedValue([{data: {"stations":validStations.stations}}, {data: {"lines":validLines.lines}}]);

    const dataProvider = DataProvider.getInstance();
    const weekDateConverter = new WeekDateConverter()
    const data:{stations: Station[], lines: Line[]} = await dataProvider.fetchData();
    const testLines: Line[] = data.lines.filter(line => line.name === 'AWK');
    const graph = new Graph(testLines, weekDateConverter.convert(123456), validLines.speed);
    graph.nodes.forEach((node, index) => {
        if(index > 1 && index < graph.nodes.length - 2){
            expect(node.neighbours.length).toEqual(2)
        }
        else{
            if(node.station.name === 'Jaroszowiec' && node.reversed || node.station.name == 'Gorenice Wschód' && !node.reversed){
                expect(node.neighbours.length).toEqual(1)
                expect(node.neighbours[0].destination.station.id).toEqual(node.neighbours[0].source.station.id)
            }

        }

    })
})

const crossingStations = [
    {
        stationID: 8,
        lines: ['AWK', 'WK']
    },
    {
        stationID: 6,
        lines: ['AWK', 'WK']
    },
    {
        stationID: 21,
        lines: ['AWK', 'WK']
    },
    {
        stationID: 14,
        lines:['AWK', 'XML']
    },
    {
        stationID: 26,
        lines:['AWK', 'XML']
    }
]


it("creates valid graph based on three lines", async () => {
    mockedAxios.all.mockRejectedValue('Network error: Something went wrong');
    mockedAxios.all.mockResolvedValue([{data: {"stations":validStations.stations}}, {data: {"lines":validLines.lines}}]);

    const dataProvider = DataProvider.getInstance();
    const weekDateConverter = new WeekDateConverter()
    const data:{stations: Station[], lines: Line[]} = await dataProvider.fetchData();
    const testLines: Line[] = data.lines.filter(line => line.name === 'AWK' || line.name === 'XML' || line.name === 'WK');
    const graph = new Graph(testLines, weekDateConverter.convert(123456), validLines.speed);
    for(let index = 0; index < graph.nodes.length; index++){
        let crossingStation = crossingStations.find(obj => obj.stationID === graph.nodes[index].station.id);
        if(crossingStation !== undefined){
            //station isn't first or last station in the line
            if((index > 1 && graph.nodes[index].line.name === graph.nodes[index - 2].line.name) &&
                (index < graph.nodes.length - 2 && graph.nodes[index].line.name === graph.nodes[index + 2].line.name)){
                expect(graph.nodes[index].neighbours.length).toEqual(crossingStation.lines.length*2)
            }
            //station is first or last on the line
            else{
                //station is last in the line
                if((index < graph.nodes.length - 2 && graph.nodes[index].line.name !== graph.nodes[index + 2].line.name) || index >= graph.nodes.length - 2){
                    if(graph.nodes[index].reversed){
                        expect(graph.nodes[index].neighbours.length).toEqual(crossingStation.lines.length*2)
                    }
                    else{
                        expect(graph.nodes[index].neighbours.length).toEqual(crossingStation.lines.length*2 - 1)
                    }
                }
                //station is first in the line
                else if((index > 1 && graph.nodes[index - 2].line.name !== graph.nodes[index].line.name) || index <= 1){
                    if(!graph.nodes[index].reversed){
                        expect(graph.nodes[index].neighbours.length).toEqual(crossingStation.lines.length*2)
                    }
                    else{
                        expect(graph.nodes[index].neighbours.length).toEqual(crossingStation.lines.length*2 - 1)
                    }
                }
            }
        }
        else{
            //station is last in the line
            if((index < graph.nodes.length - 2 && graph.nodes[index].line.name !== graph.nodes[index + 2].line.name) || index >= graph.nodes.length - 2){
                if(graph.nodes[index].reversed){
                    expect(graph.nodes[index].neighbours.length).toEqual(2)
                }
                else{
                    expect(graph.nodes[index].neighbours.length).toEqual(1)
                }
            }
            //station is first in the line
            else if((index > 1 && graph.nodes[index - 2].line.name !== graph.nodes[index].line.name) || index <= 1){
                if(!graph.nodes[index].reversed){
                    expect(graph.nodes[index].neighbours.length).toEqual(2)
                }
                else{
                    expect(graph.nodes[index].neighbours.length).toEqual(1)
                }
            }
            else{
                expect(graph.nodes[index].neighbours.length).toEqual(2)
            }
        }
    }
})

it("computes fastest connection between stations", async () => {
    mockedAxios.all.mockRejectedValue('Network error: Something went wrong');
    mockedAxios.all.mockResolvedValue([{data: {"stations":validStations.stations}}, {data: {"lines":validLines.lines}}]);

    const dataProvider = DataProvider.getInstance();
    const weekDateConverter = new WeekDateConverter()
    const data:{stations: Station[], lines: Line[]} = await dataProvider.fetchData();

    const graph = new Graph(data.lines, weekDateConverter.convert(123456), validLines.speed);
    const beginStation = data.stations.find(station => station.id === 23);
    const endStation = data.stations.find(station => station.id === 22)
    if(beginStation !== undefined && endStation !== undefined){
        console.log(graph.nodes.map(node => node.neighbours.map(nei => {
            return nei.source.station.name+" "+nei.destination.station.name+" "+nei.destination.line.name
        })))

    }

})
