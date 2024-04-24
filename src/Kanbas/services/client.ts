import axios from "axios";

export const BASE_URL = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000/api";
export const COURSES_API = `${BASE_URL}/courses`;
export const MODULES_API = `${BASE_URL}/modules`;

export const fetchAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    return response.data;
};

export const fetchCourseById = async (id?:string) => {
    const response = await axios.get(`${COURSES_API}/${id}`);
    return response.data;
};

export const findModulesForCourse = async (courseId? : string) => {
    const response = await axios
        .get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
};

export const createModule = async (courseId? : string, module?: any) => {
    const response = await axios.post(
        `${COURSES_API}/${courseId}/modules`,
        module
    );
    return response.data;
};

export const deleteModule = async (moduleId? : string) => {
    const response = await axios
        .delete(`${MODULES_API}/${moduleId}`);
    return response.data;
};

export const updateModule = async (module? : any) => {
    const response = await axios.
    put(`${MODULES_API}/${module._id}`, module);
    return response.data;
};

export const getAssignmentsForCourse = async (courseId? : string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
}

export const createAssignment = async (courseId? : string, assignment? : any) => {
    const response = await axios.post(`${COURSES_API}/${courseId}/assignments`, assignment);
    return response.data;
}

export const deleteAssignment = async (assignmentId? : string) => {
    const response = await axios.delete(`${BASE_URL}/assignments/${assignmentId}`);
    return response.data;
}

export const updateAssignment = async (assignment? : any) => {
    const response = await axios.put(`${BASE_URL}/assignments/${assignment._id}`, assignment);
    return response.data;
}