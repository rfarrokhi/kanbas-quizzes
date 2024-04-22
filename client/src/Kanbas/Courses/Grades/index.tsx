import {assignments, enrollments, grades, users} from "../../Database";
import { useParams } from "react-router-dom";
import { FaCog, FaFileExport, FaFileImport, FaFilter } from "react-icons/fa";
import './index.css';

const Toolbar = () => {
    return (
        <div className="col-12 mb-5">
            <button className="btn btn-secondary float-end btn-danger" type="button">
                <FaCog color="#FFFFFF" />
            </button>

            <span className="dropdown">
        <button
            className="btn btn-danger btn-secondary dropdown-toggle float-end me-2"
            type="button"
            id="export"
            data-bs-toggle="dropdown"
            aria-expanded="false"
        >
          <FaFileExport className={"button-icon"} color="#FFFFFF" style={{ transform: "scaleX(-1)" }} />
          Export
        </button>
        <ul className="dropdown-menu" aria-labelledby="export">
          <li>
            <a className="dropdown-item" href="#">
              Export
            </a>
          </li>
        </ul>
      </span>

            <button className="btn btn-danger btn-secondary float-end me-2" type="button">
                <FaFileImport className={"button-icon"} color="#FFFFFF" />
                Import
            </button>

            <select
                className="form-select w-25 d-inline float-end me-2"
                aria-label="Gradebook"
            >
                <option value="Gradebook" selected>
                    Gradebook
                </option>
            </select>
        </div>
    );
};

const SearchBar = () => {
    return (
        <div className="col-12 mb-3">
            <div className="row">
                <div className="col-6">
                    <h5>Student Names</h5>
                </div>
                <div className="col-6">
                    <h5>Assignment Names</h5>
                </div>
                <div className="col-6">
                    <input
                        className="form-control"
                        type="text"
                        name="StudentName"
                        placeholder="Search Students"
                        title="Search using name of the students"
                    />
                </div>
                <div className="col-6">
                    <input
                        className="form-control"
                        type="text"
                        name="AssignmentName"
                        placeholder="Search Assignments"
                        title="Search using name of the assignments"
                    />
                </div>
            </div>
        </div>
    );
};

const FilterButton = () => {
    return (
        <div className="col-12 mb-3">
            <button className="btn btn-secondary btn-danger" type="button">
                <FaFilter className={"button-icon"} color="#FFFFFF" aria-hidden="true" />
                Apply Filters
            </button>
        </div>
    );
};


function Grades() {
    const { courseId } = useParams();

    const courseAssignments = assignments.filter((assignment) => assignment.course === courseId);
    const courseEnrollments = enrollments.filter((enrollment) => enrollment.course === courseId);
    const usersInCourse = courseEnrollments.map((enrollment) => enrollment.user);
    const gradesInCourse = grades.filter((grade) => usersInCourse.includes(grade.student));

    return (
        <div className={"col-lg-10 right-content second-div"}>
            <div className="mb-3">
        <div className="row me-5">
            <Toolbar />
            <SearchBar />
            <FilterButton />
            <div className="table-responsive">
                <table className="table table-striped table-bordered align-middle text-center fixed-width-table">
                    <thead>
                    <tr className="align-middle">
                        <th>Student Name</th>
                        {courseAssignments.map((assignment) => (
                            <th>{assignment.title}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {courseEnrollments.map((enrollment) => {
                        const user = users.find((user) => user._id === enrollment.user);
                        return (
                            <tr>
                                <td>{user?.firstName} {user?.lastName}</td>
                                {courseAssignments.map((assignment) => {
                                    const grade = gradesInCourse.find((grade) => grade.assignment === assignment._id && grade.student === user?._id);
                                    return (
                                        <td>{grade?.grade || "Not entered yet"}</td>
                                    );
                                })}
                            </tr>);
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
        </div>
    );
}
export default Grades;
