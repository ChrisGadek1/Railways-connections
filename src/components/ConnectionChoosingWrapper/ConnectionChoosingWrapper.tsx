import React from "react";
import './ConnectionChoosingWrapper.css'
import ConnectionsDataChoosing from "../ConnectionsDataChoosing/ConnectionsDataChoosing";
import ConnectionsWrapper from "../ConnectionsWrapper/ConnectionsWrapper";


const ConnectionChoosingWrapper = () => {
    return(
        <div data-testid="connection-choosing-wrapper" className="connection-choosing-wrapper">
            <ConnectionsDataChoosing />
            <ConnectionsWrapper/>
        </div>
    )
}

export default ConnectionChoosingWrapper;