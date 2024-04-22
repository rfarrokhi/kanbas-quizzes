import {Link} from "react-router-dom";
import {HiDotsVertical} from "react-icons/hi";
import {FiEdit} from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import './index.css';
import {useEffect, useRef} from "react";
import defaultImage from "../../Images/reactjs.png";

function CourseItem({course, setCourse, deleteCourse}: { course: Course, setCourse: Function, deleteCourse: Function }) {

    const courseImage = useRef();

    useEffect(() => {
        try {
            courseImage.current = require(`../../Images/${course.image}`);
        } catch (error) {
            console.log("Image require failed ",error);
        }
    }, []);

    return (
        <div key={course._id} className="course-card col-md-3 col-lg-3">
            <div className="card">
                <div className={`upper-half back-dblue`}>
                    <i className="dots"><HiDotsVertical/></i>
                    <img width={254} height={146} src={courseImage.current || defaultImage} alt={course.name}/>
                </div>
                <div className="lower-half">
                    <Link to={`/Kanbas/Courses/${course.id}`}>
                        <div className={`font-dblue`}>{course.name}</div>
                        <div className="course-number">{course.number}</div>
                        <div className="course-term">{course.startDate.substring(0, 10)} - {course.endDate.substring(0, 10)}</div>
                        <button className={"btn btn-sm btn-danger float-end"} onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course.id);
                        }}>
                            <MdDelete />
                        </button>
                    </Link>
                    <button className={"btn btn-sm btn-primary"} onClick={(event)=> {
                        event.preventDefault();
                        setCourse(course);
                    }}>
                        <FiEdit/>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CourseItem;

export type Course = {
    _id: string;
    id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    image: string;
}