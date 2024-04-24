import {FaEllipsisV, FaPlus} from "react-icons/fa";
import React from "react";

function ModulesHeader() {
    return (
        <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-secondary me-1 color-change">Collapse All</button>
            <button className="btn btn-secondary me-1 color-change">View Progress</button>
            <div className="dropdown me-2 ">
                <button className="btn btn-secondary dropdown-toggle color-change" type="button">
                    <i className="fas fa-check-circle text-success"></i> Publish All
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Publish</a></li>
                </ul>
            </div>
            <button className="btn btn-danger me-1"><i className="icon-space2"><FaPlus/></i> Module
            </button>
            <button className="btn btn-secondary me-1 color-change"><i className="float-end"><FaEllipsisV/></i></button>
        </div>
    )
}

export default ModulesHeader;