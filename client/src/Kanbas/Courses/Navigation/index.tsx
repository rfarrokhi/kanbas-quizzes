import { Link, useLocation } from "react-router-dom";
import {courseNavigationItems as links} from "../../Database";
import "./index.css";
function CourseNavigation({activeCourseId} : {activeCourseId?: string }) {
    const { pathname } = useLocation();
    return (
        <nav className="col-md-3 d-md-block left-navigation">
            <ul>
                {links.map((link, index) => (
                    <li key={index} className={pathname.includes(link) ? "selected" : ""}>
                        <Link to={`/Kanbas/Courses/${activeCourseId}/${link}`}
                              className={`list-group-item ${pathname.includes(link) ? "active" : ""}`}>
                            {link}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
export default CourseNavigation;