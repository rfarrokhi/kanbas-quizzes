import ModuleList from "./List";

import ModulesHeader from "./Header";
import React from "react";

function Modules() {

    return (
        <div className="col-lg-8 right-content second-div">
            <ModulesHeader/>
            <hr/>
            <ModuleList/>
        </div>
    );
}

export default Modules;