import {useEffect, useState} from "react";
import {Navigate, Route, Routes, useLocation, useParams} from "react-router-dom";
import { FaBars, FaGlasses } from "react-icons/fa";
import CourseNavigation from "./Navigation";
import {courseNavigationItems} from "../../Kanbas/Database";
import './index.css';
import Modules from "./Modules";
import CourseHome from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Grades from "./Grades";
import * as client from "../services/client";

function Courses() {

    const { courseId } = useParams();
    const location = useLocation();

    const [course, setCourse] = useState<any>({ _id: "" });


    useEffect(() => {
        client.fetchCourseById(courseId)
            .then((course) => {
                setCourse(course);
            });
    }, [courseId]);


    const activeNavigationItem = courseNavigationItems.find((item) => location.pathname.includes(item));
    const [currentBreadcrumb, setCurrentBreadcrumb] = useState(activeNavigationItem);

    useEffect(() => {
        setCurrentBreadcrumb(activeNavigationItem);
    }, [activeNavigationItem]);


    return (
        <main role="main" className="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div className="content-wrapper">
                <nav aria-label="breadcrumb" className="d-flex justify-content-between align-items-center old-navbar"
                     style={{marginTop: '20px'}}>
                    <ol className="breadcrumb">
                        <li><a href="#" className="text-danger" style={{textDecoration: 'none'}}><i
                            className="icon-space"><FaBars/></i></a></li>
                        <li className="breadcrumb-item"><a href="#" className="text-danger"
                                                           style={{textDecoration: 'none'}}>{course?.name}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{currentBreadcrumb}</li>
                    </ol>
                    <button className="btn btn-secondary float-end color-change"><i
                        className='icon-space2'><FaGlasses/></i> Student View
                    </button>
                </nav>
                <hr/>
                <div className="row">
                    <CourseNavigation activeCourseId={courseId} />
                    <Routes>
                        <Route path="/" element={<Navigate to="Home"/>}/>
                        <Route path="Home" element={<CourseHome/>}/>
                        <Route path="Modules" element={<Modules/>}/>
                        <Route path="Piazza" element={<h1>Piazza</h1>}/>
                        <Route path="Assignments" element={<Assignments/>}/>
                        <Route path="Assignments/:assignmentId" element={<AssignmentEditor setBreadcrumb={setCurrentBreadcrumb}/>}/>
                        <Route path="Grades" element={<Grades/>}/>
                    </Routes>
                </div>
            </div>
        </main>
    );
}

export default Courses;

