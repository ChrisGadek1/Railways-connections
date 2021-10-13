import '@testing-library/react'
import DataProvider from "../dataProvider/DataProvider";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";
import axios from "axios";
import TrainTimeComputer from "./TrainTimeComputer";
import WeekDateConverter from "../WeekDateConverter/WeekDateConverter";
const validStations = require('../../__mocks__/stations.json')
const validLines = require('../../__mocks__/lines.json')

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testData = [
    {
        currentTime: 122400,
        stationID: 27,
        lineName: 'AWK',
        reversed: false,
        speed: 20,
        nextTrainTime: 127200
    },
    {
        currentTime: 311400,
        stationID: 23,
        lineName: 'ML',
        reversed: true,
        speed: 20,
        nextTrainTime: 314160
    },
    {
        currentTime: 602400,
        stationID: 23,
        lineName: 'ML',
        reversed: true,
        speed: 20,
        nextTrainTime: 5400
    }
]

it("computes time of the next train on the line", async () => {
    mockedAxios.all.mockRejectedValue('Network error: Something went wrong');
    mockedAxios.all.mockResolvedValue([{data: {"stations":validStations.stations}}, {data: {"lines":validLines.lines}}]);
    const dataProvider = DataProvider.getInstance();
    const weekDateConverter = new WeekDateConverter()

    const data:{stations: Station[], lines: Line[]} = await dataProvider.fetchData();

    testData.forEach(oneTest => {
        const station = data.stations.find(stationToFind => stationToFind.id === oneTest.stationID);
        const line = data.lines.find(lineToFind => lineToFind.name === oneTest.lineName);
        if(line !== undefined && station != undefined){
            let computedTime = TrainTimeComputer.getTimeOfTheNextTrain(weekDateConverter.convert(oneTest.currentTime),station,line,oneTest.reversed,oneTest.speed);
            computedTime = computedTime - (computedTime % 60)
            expect(computedTime).toEqual(oneTest.nextTrainTime)
        }
        else{
            throw 'wrong line name or station ID'
        }

    })

})