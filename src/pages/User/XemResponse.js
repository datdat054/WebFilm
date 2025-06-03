import React from "react";

import Notification from "../../components/Notification";
import UserXemResponse from "../../components/UserXemResponse";

function XemResponse(){
    return(
        <div className="content">
            <Notification/>
            <UserXemResponse/>
        </div>
    )
}
export default XemResponse;