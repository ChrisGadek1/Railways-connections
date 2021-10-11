import React from "react";
import './ConnectionChoosingWrapper.css'
import ConnectionsDataChoosing from "../ConnectionsDataChoosing/ConnectionsDataChoosing";


const ConnectionChoosingWrapper = () => {
    return(
        <div data-testid="connection-choosing-wrapper" className="connection-choosing-wrapper">
            <ConnectionsDataChoosing />
        </div>
    )
}

export default ConnectionChoosingWrapper;