import React from "react";
import Station from "../../data/classes/Station";
import Line from "../../data/classes/Line";
import WeekDateConverter from "../../services/WeekDateConverter/WeekDateConverter";
import TrainTimeComputer from "../../services/trainTimeComputer/TrainTimeComputer";
import {useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import WeekDate from "../../data/classes/WeekDate";
import './StationDeparturesTimes.css'

type propsType = {
    station: Station,
    line: Line,
    reversed: boolean
}

type groupedTimes = {
    0: WeekDate[],
    1: WeekDate[],
    2: WeekDate[],
    3: WeekDate[],
    4: WeekDate[],
    5: WeekDate[],
    6: WeekDate[],
    7: WeekDate[]
}

const StationDeparturesTimes = (props:propsType) => {

    const trainsSpeed = useSelector((state:RootState) => state.data.data.speed);
    const stationIndex = props.line.stations.indexOf(props.station);
    const weekDateConverter = new WeekDateConverter();
    const stationToCurrentStation = props.reversed ?
        props.line.stations.concat(props.line.stations.slice(stationIndex, props.line.stations.length - 1).reverse()) :
        props.line.stations.slice(0, stationIndex + 1)

    const departuresTime = props.line.time.map(time => {
        return weekDateConverter.convert( weekDateConverter.convertToSeconds(time) +
            TrainTimeComputer.computeTimeBetweenStationsChain(stationToCurrentStation, trainsSpeed))
    })

    const result:groupedTimes = departuresTime.reduce(function (r, a) {
        r[a.weekDay] = r[a.weekDay] || [];
        r[a.weekDay].push(a);
        return r;
    }, Object.create(null));

    for (const [key, value] of Object.entries(result)) {
        // @ts-ignore
        result[key] = value.sort((a, b) => {
            return a.seconds - b.seconds
        }).sort((a, b) => {
            return a.minutes - b.minutes
        }).sort((a, b) => {
            return a.hours - b.hours
        })
    }

    const components = Object.entries(result).map(([key, value]) => {
        const hours = value.map(weekDate => {
            return <span key={weekDate.hoursString()+":"+weekDate.minutesString()} className="hours-for-station">{weekDate.hoursString()}:{weekDate.minutesString()}</span>
        })

        const polishWeekDayName = weekDateConverter.getPolishNameOfTheWeekDay(parseInt(key));

        return(
            <div key={polishWeekDayName+"day-component"} className="day-hours-component">
                <div>{polishWeekDayName}</div>
                <div className="hours-container">
                    {hours}
                </div>

            </div>
        )
    })


    return(
        <div>
            {components}
        </div>
    )
}

export default StationDeparturesTimes;