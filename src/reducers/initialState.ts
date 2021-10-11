import Station from "../data/classes/Station";
import WeekDate from "../data/classes/WeekDate";

const initialState = {
    data: {
        stations: [],
        lines: []
    },
    mobileAnimation: false,
    selectedStations: [],
    selectedLines: [],
    beginStation: null,
    endStation: null,
    departureTime: null

}
export default initialState;