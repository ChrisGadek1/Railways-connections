import React, {useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import TrainStationWrapper from "../TrainStationWrapper/TrainStationWrapper";
import TrainChoosingWrapper from "../TrainChoosingWrapper/TrainChoosingWrapper";
import ConnectionChoosingWrapper from "../ConnectionChoosingWrapper/ConnectionChoosingWrapper";
import {useDispatch} from "react-redux";
import DataProvider from "../../services/dataProvider/DataProvider";
import {loadData} from "../../actions/dataProviderActions";
import StationDetails from "../StationDetails/StationDetails";

const Content = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const dataProvider = DataProvider.getInstance();
        dataProvider.fetchData().then((data:any) => {
            const stations = data.stations;
            const lines = data.lines;
            const speed = data.speed;

            dispatch(loadData({stations, lines, speed}))
        })



    }, [])

    return(
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/przystanki" component={TrainStationWrapper} />
            <Route exact path="/linie" component={TrainChoosingWrapper} />
            <Route exact path="/znajdz-trase" component={ConnectionChoosingWrapper} />
        </Switch>
    )
}

export default Content;