import React from "react";
import {Route, Switch} from "react-router-dom";
import StationDetails from "../StationDetails/StationDetails";
import LineDetails from "../LineDetails/LineDetails";

const PopupWrapper = () => {
    return(
        <Switch>
            <Route path="/linie/:name" component={LineDetails} />
            <Route path="/przystanki/:id" component={StationDetails}/>
        </Switch>
    )
}

export default PopupWrapper;