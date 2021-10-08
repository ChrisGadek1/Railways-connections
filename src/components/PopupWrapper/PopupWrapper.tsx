import React from "react";
import {Route, Switch} from "react-router-dom";
import StationDetails from "../StationDetails/StationDetails";

const PopupWrapper = () => {
    return(
        <Switch>
            <Route path="/przystanki/:id" component={StationDetails}/>
        </Switch>
    )
}

export default PopupWrapper;