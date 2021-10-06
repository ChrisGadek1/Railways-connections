import React, {useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import TrainStationWrapper from "../TrainStationWrapper/TrainStationWrapper";
import TrainChoosingWrapper from "../TrainChoosingWrapper/TrainChoosingWrapper";
import ConnectionChoosingWrapper from "../ConnectionChoosingWrapper/ConnectionChoosingWrapper";
import {useDispatch} from "react-redux";
import DataProvider from "../../services/dataProvider/DataProvider";
import {loadData} from "../../actions/dataProviderActions";

const Content = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const dataProvider = DataProvider.getInstance();
        const stations = dataProvider.stations;
        const lines = dataProvider.lines;

        dispatch(loadData({stations, lines}))
    }, [])

    return(
        <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/przystanki" component={TrainStationWrapper} />
            <Route path="/linie" component={TrainChoosingWrapper} />
            <Route path="/znajdz-trase" component={ConnectionChoosingWrapper} />
        </Switch>
    )
}

export default Content;