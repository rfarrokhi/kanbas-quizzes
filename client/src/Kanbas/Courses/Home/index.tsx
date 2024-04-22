import ModulesHeader from "../Modules/Header";
import ModuleList from "../Modules/List";
import HomeStatus from "./Status";
function CourseHome() {
    return (
        <>
            <div className="col-lg-8 right-content second-div">
                <ModulesHeader/>
                <hr/>
                <ModuleList/>
                <hr/>
            </div>
            <HomeStatus/>
        </>
    );
}

export default CourseHome;