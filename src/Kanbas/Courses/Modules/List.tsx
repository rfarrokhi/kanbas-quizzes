import React, {useState, useEffect} from "react";
import "./index.css";
import {FaCheckCircle, FaEllipsisV, FaPlus, FaCaretDown} from "react-icons/fa";
import {RxDragHandleDots2} from "react-icons/rx";
import {BsFillInfoCircleFill} from "react-icons/bs";
import {useParams} from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules
} from "./modulesReducer";
import {defaultModule} from "./modulesReducer";
import {KanbasState} from "../../store";
import * as client from "../../services/client";
import {useSnackbar} from "notistack";

function ModuleList() {
    const {courseId} = useParams();
    const moduleList = useSelector((state: KanbasState) =>
        state.modulesReducer.modules.filter((module) => module.course === courseId));
    const module = useSelector((state: KanbasState) =>
        state.modulesReducer.module);
    const dispatch = useDispatch();
    const [selectedModule, setSelectedModule] = useState(moduleList[0]);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        client.findModulesForCourse(courseId)
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId]);


    const handleAddModule = () => {
        if (module === defaultModule) {
            enqueueSnackbar("Please enter module name and description.", {variant: "error"});
            return;
        }
        client.createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
            enqueueSnackbar("Module added successfully.", {variant: "success"});
        });
    };

    const handleDeleteModule = (moduleId: string) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };

    const handleUpdateModule = async () => {
        if (module === defaultModule) {
            enqueueSnackbar("Please select a module first.", {variant: "error"});
            return;
        }
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
        enqueueSnackbar("Module updated successfully.", {variant: "success"});
    };

    return (
        <div className="mb-3">
            <div className="module-form">
                <button
                    className={"btn btn-success"}
                    onClick={handleAddModule}
                >
                    Add
                </button>
                <button
                    className={"btn btn-primary"}
                    onClick={handleUpdateModule}>Update</button>
                <input
                    value={module.name}
                    onChange={(e) =>
                        dispatch(setModule({...module, name: e.target.value}))
                    }
                />
                <textarea
                    value={module.description}
                    onChange={(e) =>
                        dispatch(setModule({...module, description: e.target.value}))
                    }
                />
            </div>
            {
                moduleList
                    .map((module, index) => (
                        <React.Fragment key={index}>
                            <ul onClick={() => setSelectedModule(module)} className="list-group module-groups">
                                <li className="list-group-item list-group-item-secondary">
                                    <button className={"btn btn-danger btn-sm float-end"}
                                            onClick={() => handleDeleteModule((module._id))}>
                                        Delete
                                    </button>
                                    <button style={{marginRight: 5}} className={"btn btn-success btn-sm float-end"}
                                            onClick={() => dispatch(setModule(module))}>
                                        Edit
                                    </button>
                                    <RxDragHandleDots2 className="ellipse-color"/>
                                    <FaCaretDown className="icon-space2"/>
                                    {module.name}
                                    <div className="float-end">
                                        <div className="btn-group">
                                            <FaCheckCircle className="text-success icon-space dropdown-toggle"/>
                                            <ul className="dropdown-menu">
                                                {/* Dropdown items */}
                                            </ul>
                                        </div>
                                        <FaPlus className="icon-space ellipse-color"/>
                                        <FaEllipsisV className="ellipse-color"/>
                                    </div>
                                </li>
                                {selectedModule === module &&
                                    <>
                                        <li className="list-group-item left-border-line">
                                            <BsFillInfoCircleFill className="ellipse-color icon-space-head"/>
                                            {module.description}
                                        </li>
                                        {module.lessons?.map((lesson: {name: string, description: string}) => (
                                            <li className="list-group-item left-border-line">
                                                <RxDragHandleDots2 className="ellipse-color icon-space-head"/>
                                                {lesson.name}
                                                <i className="ellipse-color float-end"><FaEllipsisV/></i>
                                                <i className="text-success float-end icon-space"><FaCheckCircle/></i>
                                                <br/>
                                                <span className={"lesson-description"}> {lesson.description}</span>
                                            </li>
                                        ))}
                                    </>
                                }
                            </ul>
                        </React.Fragment>
                    ))
            }
        </div>
    );
}

export default ModuleList;