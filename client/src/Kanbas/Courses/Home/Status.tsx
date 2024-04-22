import React from "react";
import './index.css';
import {homeStatusTodoItems} from "../../Database";
import {
    FaFileCode,
    FaPencilAlt,
    FaBullseye,
    FaChartBar,
    FaBullhorn,
    FaBell,
    FaTimes,
    FaCircle,
} from 'react-icons/fa';

function StatusTodoItem(props: { name: string, description: string }) {
    return (
        <div className="grade-info">
            <i className="close-icon ellipse-color"><FaTimes/></i>
            <div className="table">
                <div className="table-row">
                    <div className="icon-cell">
                        <i><FaCircle style={{color:"red"}}/></i>
                    </div>
                    <div className="text-cell">
                        <a href="#" className="grade">{props.name}</a>
                        <br/>
                        <small className="grade-small">{props.description}</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

function HomeStatus() {
    return (
        <div className="col-lg-2 far-right-content">
            <div className="button-group-2">
                <button className="btn btn-secondary color-change"><i><FaFileCode/></i> Import Existing Content</button>
                <button className="btn btn-secondary color-change"><i><FaPencilAlt/></i> Import from Commons</button>
                <button className="btn btn-secondary color-change"><i><FaBullseye/></i> Choose Home Page</button>
                <button className="btn btn-secondary color-change"><i><FaChartBar/></i> View Course Stream</button>
                <button className="btn btn-secondary color-change"><i><FaBullhorn/></i> New Announcement</button>
                <button className="btn btn-secondary color-change"><i><FaChartBar/></i> New Analytics</button>
                <button className="btn btn-secondary color-change"><i><FaBell/></i> View Course Notifications</button>
            </div>
            <div className="todo">
                <span>To-Do</span>
                <hr className="todo-hr"/>

                {homeStatusTodoItems.map((item, index) =>
                    <StatusTodoItem key={index} name={item.name} description={item.description}/>
                )}
            </div>
        </div>
    );
}

export default HomeStatus;
