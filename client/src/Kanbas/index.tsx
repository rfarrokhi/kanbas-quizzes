import KanbasNavigation from "./Navigation";
import {Navigate, Route, Routes} from "react-router";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import Account from "./Account";
import {useEffect, useState} from "react";
import store from "./store";
import {Provider} from "react-redux";
import axios from "axios";
import {Course} from "./Dashboard/CourseItem";
import {fetchAllCourses} from "./services/client";
import {COURSES_API} from "./services/client";

function Kanbas() {

    const [courses, setCourses] = useState<Course[]>([]);
    const [course, setCourse] = useState({
        _id: "0", id:"", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "reactjs.png"
    });
    useEffect(() => {
        fetchAllCourses()
            .then((courses) => setCourses(courses));
    }, []);

    const addNewCourse = async () => {
        const response = await axios.post(COURSES_API, course);
        setCourses([ ...courses, response.data ]);
    };

    const deleteCourse = async (courseId: string) => {
        const response = await axios.delete(
            `${COURSES_API}/${courseId}`
        );
        setCourses(courses.filter(
            (c) => c.id !== courseId));
    };

    const updateCourse = async () => {
        const response = await axios.put(
            `${COURSES_API}/${course.id}`,
            course
        );
        setCourses(
            courses.map((c) => {
                if (c._id === course._id) {
                    return course;
                }
                return c;
            })
        );
    };

    return (
        <Provider store={store}>
            <div className="d-flex">
                <KanbasNavigation/>
                <div style={{flexGrow: 1}}>
                    <Routes>
                        <Route path="/" element={<Navigate to="Dashboard"/>}/>
                        <Route path="Account/*" element={<Account/>}/>
                        <Route path="Dashboard" element={
                            <Dashboard
                                courses={courses}
                                course={course}
                                setCourse={setCourse}
                                addNewCourse={addNewCourse}
                                deleteCourse={deleteCourse}
                                updateCourse={updateCourse}/>
                        }/>
                        <Route path="Courses/:courseId/*" element={
                            <Courses/>
                        }/>
                    </Routes>
                </div>
            </div>
        </Provider>
    );
}

export default Kanbas;