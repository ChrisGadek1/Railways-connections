import React, {useEffect} from "react";
import Station from "../../data/classes/Station";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../reducers/rootReducer";
import Line from "../../data/classes/Line";
import WeekDateConverter from "../../services/WeekDateConverter/WeekDateConverter";
import Graph from "../../data/classes/Graph";
import Connection from "../Connection/Connection";
import {
    addNextConnectionTime,
    addPath,
    increaseMaxPaths,
    removeALLPaths,
    resetMaxPaths, resetNextConnectionTime
} from "../../actions/pathsActions";
import './ConnectionsWrapper.css'
import WeekDate from "../../data/classes/WeekDate";
import $ from 'jquery'

const ConnectionsWrapper = () => {

    const beginStation: Station = useSelector((state: RootState) => state.connection.beginStation);
    const endStation: Station = useSelector((state: RootState) => state.connection.endStation);
    const departureTime: Date = useSelector((state: RootState) => state.connection.departureTime);
    const lines: Line[] = useSelector((state: RootState) => state.data.data.lines);
    const speed: number = useSelector((state: RootState) => state.data.data.speed);
    // @ts-ignore
    const paths: any[] = useSelector((state: RootState) => state.path.paths);
    // @ts-ignore
    const maxPaths: number = useSelector((state: RootState) => state.path.maxPaths);
    // @ts-ignore
    let nextConnectionTime: WeekDate = useSelector((state: RootState) => state.path.nextConnectionTime)
    const dispatcher = useDispatch()

    const weekDateConverter = new WeekDateConverter()

    useEffect(() => {
        $(window).scroll(function() {
            // @ts-ignore
            if($(window).scrollTop() + $(window).height() == $(document).height()) {
                dispatcher(increaseMaxPaths(3));
                handleLoadMore()
            }
        });
        return () => {
            dispatcher(removeALLPaths())
            dispatcher(resetMaxPaths())
            dispatcher(resetNextConnectionTime())
            $(window).off("scroll")
        };
    }, []);


    const handleLoadMore = () => {
        if(departureTime !== null && nextConnectionTime === null){
            dispatcher(addNextConnectionTime(weekDateConverter.convertFromDate(departureTime)))
        }
        if(nextConnectionTime !== null && beginStation !== null && endStation !== null && paths.length < maxPaths){
            for(let i = 0; i < 3; i++){
                const graph: Graph = new Graph(lines, nextConnectionTime , speed)
                graph.setDestinationAndBeginning(beginStation, endStation)
                graph.computeBestTime()
                const result = graph.getFastestPath().reverse();
                const path = {
                    path: result.map(node => ({
                        station: node.station,
                        line: node.line,
                        time: node.getTime(),
                        reverse: node.reversed
                    }))
                }
                //@ts-ignore
                dispatcher(addPath(<Connection key={i+"path"+Math.random()} path={path.path}/>))
                nextConnectionTime = weekDateConverter.convert(path.path[0].time)
                dispatcher(addNextConnectionTime(weekDateConverter.convert(path.path[0].time)))
            }
        }
    }
    handleLoadMore()

    const handleClick = () => {
        dispatcher(increaseMaxPaths(3));
        handleLoadMore()
    }

    const loadMoreButton = paths.length < 3 ? '' :
        <div className="load-more-button-wrapper">
            <button className="load-more-button" onClick={handleClick}>Załaduj więcej</button>
        </div>

    return(
        <div>
            {paths}
            {loadMoreButton}
        </div>
    )
}

export default ConnectionsWrapper;