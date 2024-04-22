import React, { useState, useEffect } from "react";
import axios from "axios";
import {BASE_API_URL} from "./client";
const ASSIGNMENT_URL = `${BASE_API_URL}/assignment`;
const MODULE_URL = `${BASE_API_URL}/module`;

function WorkingWithObjects() {
    
    const [assignment, setAssignment] = useState({
      _id: 123,
      title: "NodeJS HTTP Server with ExpressJS",
      description: "Create a NodeJS server with ExpressJS",
      due: "2021-10-15", 
      completed: false, 
      score: 0,
    });

    const [module, setModule] = useState({
      id: 5610, 
      name: "Web Development",
      description: " NodeJS on Web Development",
      course: "CS5610 Web Development",
    });

    const fetchAssignment = async () => {
      const response = await axios.get(`${ASSIGNMENT_URL}`);
      setAssignment(response.data);
    };

    const fetchModule = async () => {
        const response = await axios.get(`${MODULE_URL}`);
        setModule(response.data);
    }
    
    const updateAssignmentTitle = async () => {
      const response = await axios
        .get(`${ASSIGNMENT_URL}/title/${assignment.title}`);
    };

    const updateAssignmentScore = async () => {
        const response = await axios
            .get(`${ASSIGNMENT_URL}/score/${assignment.score}`);
    }

    const updateAssignmentCompleted = async () => {
        const response = await axios
            .get(`${ASSIGNMENT_URL}/completed/${assignment.completed}`);
    }

    const updateAssignment = async () => {
        await updateAssignmentTitle();
        await updateAssignmentScore();
        await updateAssignmentCompleted();
        alert("Assignment updated");
    }

    const updateModuleName = async () => {
        const response = await axios
            .get(`${MODULE_URL}/name/${module.name}`);
    }

    const updateModuleDescription = async () => {
        const response = await axios
            .get(`${MODULE_URL}/description/${module.description}`);
    }

    const updateModule = async () => {
        await updateModuleName();
        await updateModuleDescription();
        alert("Module updated");
    }




    useEffect(() => {
      fetchAssignment();
      fetchModule();
    }, []);
  
    
    return (
      <div>
        <h3>Working With Objects</h3>
        <h3>Modifying Properties of assignment</h3>
          <label htmlFor={"assignmentTitle"}>Assignment Title</label>
        <input
            id={"assignmentTitle"}
          onChange={(e) =>
            setAssignment({
              ...assignment,
              title: e.target.value,
            })
          }
          value={assignment.title}
          className="form-control mb-2"
          type="text"
        />
        <label htmlFor={"assignmentScore"}>Assignment Score</label>
        <input
            id={"assignmentScore"}
          onChange={(e) =>
            setAssignment({
              ...assignment,
              score: Number(e.target.value),
            })
          }
          value={assignment.score}
          className="form-control mb-2"
          type="text"
        />
        <label htmlFor={"assignmentCompleted"}>Assignment Completed</label>
        <input
            id={"assignmentCompleted"}
          onChange={(e) =>
            setAssignment({
              ...assignment,
              completed: Boolean(e.target.value),
            })
          }
          checked={assignment.completed}
          type="checkbox"
        />
        <button onClick={updateAssignment} className="w-100 btn btn-primary mb-2">
          Update Assignment
        </button>
  
        <h3>Modifying Properties of Module</h3>

<div className="form-control mb-2">
        <div className="row">
          <div className="col-sm-2">
              <label htmlFor={"moduleName"}>Module Name</label>
          <input id={"moduleName"} type="text" className="form-control mb-2"
            onChange={(e) => setModule({ ...module,
                name: e.target.value })}
            value={module.name}/>
          </div>
            <label htmlFor={"moduleDescription"}>Module Description</label>
            <input id={"moduleDescription"} type="text" className="form-control mb-2"
            onChange={(e) => setModule({ ...module,
                description: e.target.value })}
            value={module.description}/>
          <div className="w-100 btn btn-primary mb-2">
          <button onClick={updateModule} className="btn btn-primary">
            Update Module
            </button>
          </div>
        </div>
      </div>
  
        <h4>Retrieving Objects</h4>
        <a
          href={`${BASE_API_URL}/assignment`}
          className="btn btn-primary me-2"
        >
          Get Assignment
        </a>

        <a
          href={`${BASE_API_URL}/module`}
          className="btn btn-danger"
        >
            Get Module
        </a>
        <h4>Retrieving Properties</h4>
        <a
          className="btn btn-primary me-2"
          href={`${BASE_API_URL}/assignment/title`}
        >
          Get Assignment Title
        </a>
        <a href={`${BASE_API_URL}/module/name`} className="btn btn-danger">
          Get Module Name
        </a>
      </div>
    );
  }

export default WorkingWithObjects;