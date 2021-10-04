import React from "react";
import {Route, Switch} from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import TrainStationWrapper from "../TrainStationWrapper/TrainStationWrapper";
import TrainChoosingWrapper from "../TrainChoosingWrapper/TrainChoosingWrapper";
import ConnectionChoosingWrapper from "../ConnectionChoosingWrapper/ConnectionChoosingWrapper";

const Content = () => {
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