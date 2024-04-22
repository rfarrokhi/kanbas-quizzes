import React, {useEffect} from "react";
import {useNavigate, useParams, Link} from "react-router-dom";
import {FaCheckCircle, FaEllipsisV} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {KanbasState} from "../../../store";
import {
    setAssignment,
    updateAssignment,
    addAssignment
} from "../assignmentsReducer";
import * as client from "../../../services/client";

function AssignmentEditor({setBreadcrumb} : any) {
    const {courseId} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const assignment = useSelector((state: KanbasState) => state.assignmentsReducer.assignment);

    const handleSave = () => {
        if (assignment._id) {
            dispatch(updateAssignment(assignment));
            client.updateAssignment(assignment)
        } else {
            dispatch(addAssignment({ ...assignment, course: courseId }));
            client.createAssignment(courseId, assignment)
        }
        navigate(`/Kanbas/Courses/${courseId}/Assignments`);
    };

    useEffect(() => {
        setBreadcrumb(`Assignments > ${assignment?.title}`);

        return () => {
            setBreadcrumb("Assignments");
        }
    },[]);

    return (
        <div className="col-md-9 right-content">
            <div className="row">
                <div className="col-12">
                    <button type="button" className="btn btn-light float-right">
                        <i className="black-color"><FaEllipsisV/></i>
                    </button>
                    <button type="button" className="published-button-setup float-right button-margin">
                        <i className="button-color"><FaCheckCircle/></i>
                        <span className="button-color"><b>Published</b></span>
                    </button>
                </div>
            </div>
            <hr/>
            <div className={"row"}>
                <div className="col-12">
                    <label htmlFor="assignment-name text-align-left">Assignment Name</label>
                    <input
                        id="assignment-name"
                        type="text"
                        value={assignment.title}
                        onChange={(e) => dispatch(setAssignment({ ...assignment, title: e.target.value }))}
                        className="form-control"
                    />
                </div>
                <hr/>
            </div>
            <div className={"row"}>
                <div className="col-12">
                    <label htmlFor="assignment-description text-align-left">Assignment Description</label>
                    <textarea
                        id="assignment-description"
                        cols={155}
                        rows={5}
                        value={assignment.description}
                        onChange={(e) => dispatch(setAssignment({ ...assignment, description: e.target.value }))}
                        className="form-control content-margin"
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-3 set-label content-margin">
                    <label htmlFor="points"> Points </label>
                </div>
                <div className="col-7 content-margin">
                    <input type="text" value={assignment.points}
                           onChange={(e) => dispatch(setAssignment({ ...assignment, points: e.target.value }))}
                           id="points" className="form-control"/>
                </div>
            </div>
            <div className="row" id="assign-table">
                <table width="94%" className="set-table content-margin">
                    <tr>
                        <td className="td-2" valign="top">
                            <label
                                htmlFor="assign"
                                className="content-margin float-right set-table-label"
                            >
                                Assign
                            </label>
                        </td>
                        <td className="set-table table-border padding-left">
                            <br/>
                            <label id="due-id" className="control-label">
                                <b> Due </b>
                            </label>
                            <br/>
                            <input
                                id="due-id"
                                type="date"
                                value={assignment.dueDate}
                                onChange={(e) => dispatch(setAssignment({ ...assignment, dueDate: e.target.value }))}
                                className="form-control set-table-width"
                            />
                            <br/>
                            <table className="set-table-width">
                                <tr>
                                    <td style={{width: 48.5}}>
                                        <label htmlFor="available-id">

                                            <b> Available From </b>
                                        </label>
                                        <input
                                            id="available-id"
                                            type="date"
                                            value={assignment.availableDate}
                                            onChange={(e) => dispatch(setAssignment({ ...assignment, availableDate: e.target.value }))}
                                            className="form-control"
                                        />
                                    </td>
                                    <td style={{width: 48.5}}>
                                        <label htmlFor="until-id">

                                            <b> Until </b>
                                        </label>
                                        <input
                                            id="until-id"
                                            type="date"
                                            value={assignment.untilDate}
                                            onChange={(e) => dispatch(setAssignment({ ...assignment, untilDate: e.target.value }))}
                                            className="form-control"
                                        />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>
            <br/>
            <button onClick={handleSave} className="btn btn-success ms-2 float-end">
                Save
            </button>
            <Link to={`/Kanbas/Courses/${courseId}/Assignments`}
                  className="btn btn-danger float-end">
                <span style={{color: "white"}}>Cancel</span>
            </Link>
        </div>
    );
}

export default AssignmentEditor;