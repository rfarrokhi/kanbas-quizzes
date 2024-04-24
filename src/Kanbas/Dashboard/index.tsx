import React, {MouseEventHandler} from "react";
import CourseItem, {Course} from "./CourseItem";

function Dashboard({courses, course, setCourse, addNewCourse, deleteCourse, updateCourse}:
                       {
                           courses: Course[],
                           course: Course,
                           setCourse: Function,
                           deleteCourse: Function,
                           addNewCourse: MouseEventHandler<HTMLButtonElement>,
                           updateCourse: MouseEventHandler<HTMLButtonElement>
                       }) {

    return (
        <div className="p-4 content-wrapper">
            <h1>Dashboard</h1>
            <h5>Course</h5>
            <div className="add-course-form">
                <input
                    value={course.name}
                    onChange={(e) => setCourse({...course, name: e.target.value})}
                    placeholder="Course Name"
                />
                <input
                    value={course.number}
                    onChange={(e) => setCourse({...course, number: e.target.value})}
                    placeholder="Course Number"
                />
                <input
                    type="date"
                    value={course.startDate}
                    onChange={(e) =>
                        setCourse({...course, startDate: e.target.value})
                    }
                    placeholder="Start Date"
                />
                <input
                    type="date"
                    value={course.endDate}
                    onChange={(e) =>
                        setCourse({...course, endDate: e.target.value})
                    }
                    placeholder="End Date"
                />
                <button className={"btn btn-secondary"} onClick={updateCourse}>
                    Update
                </button>
                <button onClick={addNewCourse} className="btn btn-primary">
                    Add
                </button>
            </div>
            <hr/>
            <h2>Published Courses ({courses.length})</h2>
            <div className="row">
            <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses?.map((course: any) => (
                        <CourseItem course={course} setCourse={setCourse} deleteCourse={deleteCourse} key={course._id}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;