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

const testConnections = [
    {
        beginStation: "Sieniczno",
        endStation: "Osiek Północny",
        time: 123456,
        path: [
            {
                station: "Jaroszowiec",
                line: "AWK",
                time: 127214
            },
            {
                station: "Bogucin Wielki",
                line: "AWK",
                time: 127547
            },
            {
                station: "Bogucin Mały",
                line: "AWK",
                time: 127941
            },
            {
                station: "Bogucin Mały",
                line: "WK",
                time: 131370
            },
            {
                station: "Olkusz Pomorzany",
                line: "WK",
                time: 131986
            },
            {
                station: "Olkusz Os. Młodych",
                line: "WK",
                time: 132640
            },
            {
                station: "Witeradów",
                line: "WK",
                time: 132961
            },
            {
                station: "Osiek Centralny",
                line: "WK",
                time: 133320
            },
            {
                station: "Zimnodół",
                line: "WK",
                time: 133592
            },
            {
                station: "Zederman Zachodni",
                line: "WK",
                time: 134005
            },
            {
                station: "Zederman Centralny",
                line: "WK",
                time: 134307
            },
            {
                station: "Przeginia",
                line: "WK",
                time: 134654
            },
            {
                station: "Przeginia",
                line: "ML",
                time: 137507
            },
            {
                station: "Zawada",
                line: "ML",
                time: 138216
            }
        ]
    }
]

it("computes fastest connection between stations", async () => {
    mockedAxios.all.mockRejectedValue('Network error: Something went wrong');
    mockedAxios.all.mockResolvedValue([{data: {"stations":validStations.stations}}, {data: {"lines":validLines.lines}}]);

    const dataProvider = DataProvider.getInstance();
    const weekDateConverter = new WeekDateConverter()
    const data:{stations: Station[], lines: Line[]} = await dataProvider.fetchData();

    testConnections.forEach(connection => {
        const graph = new Graph(data.lines, weekDateConverter.convert(connection.time), validLines.speed);
        const beginStation = data.stations.find(station => station.name === connection.beginStation);
        const endStation = data.stations.find(station => station.name === connection.endStation)
        if(beginStation !== undefined && endStation !== undefined){
            graph.setDestinationAndBeginning(beginStation, endStation);
            graph.computeBestTime()
            const fastestPath = graph.getFastestPath()
            connection.path.forEach((node, index) => {
                expect(node.station).toEqual(fastestPath[fastestPath.length - index - 1].station.name)
                expect(node.line).toEqual(fastestPath[fastestPath.length - index - 1].line.name)
                expect(node.time).toEqual(fastestPath[fastestPath.length - index - 1].getTime())
            })
        }
    })


})
