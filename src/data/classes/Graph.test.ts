import '@testing-library/react'
import Graph from "./Graph";
import axios from "axios";
import DataProvider from "../../services/dataProvider/DataProvider";
import Station from "./Station";
import Line from "./Line";
import WeekDateConverter from "../../services/WeekDateConverter/WeekDateConverter";
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
    const graph = new Graph(testLines, weekDateConverter.convert(123456));
    graph.nodes.forEach((node, index) => {
        node.neighbours.forEach((neighbour, neighbourIndex) => {
            expect(neighbour.source.station.id).toEqual(testLines[0].stations[Math.trunc(index/2)].id)
        })
        expect(node.neighbours.length === 2)
        if(Math.trunc(index/2) > 0){
            const foundNode = node.neighbours.find(neighbour => neighbour.destination.station.id === testLines[0].stations[Math.trunc(index/2)].id && neighbour.destination.reversed)
            expect(foundNode).not.toEqual(undefined)
            if(foundNode !== undefined){
                expect(foundNode.destination.reversed).toEqual(true)
            }
        }
        if(Math.trunc(index/2) < testLines[0].stations.length - 1 && node.reversed){
            const foundNode = node.neighbours.find(neighbour => neighbour.destination.station.id === testLines[0].stations[Math.trunc(index/2) + 1].id && !neighbour.destination.reversed)
            expect(foundNode).not.toEqual(undefined)
            if(foundNode !== undefined){
                expect(foundNode.destination.reversed).toEqual(false)
            }
        }
    })
})