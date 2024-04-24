import { createSlice } from "@reduxjs/toolkit";
const defaultNewAssignment = {
    title: "New Assignment",
    description: "",
    course: "",
    points: 100,
    dueDate: "",
    availableDate: "",
    untilDate: "",
};
const initialState = {
    assignments: Array<any>(),
    assignment: defaultNewAssignment,
};
const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        addAssignment: (state, action) => {
            state.assignments = [
                ...state.assignments,
                { ...action.payload, _id: new Date().getTime().toString() },
            ];
        },
        deleteAssignment: (state, action) => {
            state.assignments = state.assignments.filter(
                (assignment) => assignment._id !== action.payload
            );
        },
        updateAssignment: (state, action) => {
            state.assignments = state.assignments.map((assignment) => {
                if (assignment._id === action.payload._id) {
                    return action.payload;
                } else {
                    return assignment;
                }
            });
        },
        setAssignment: (state, action) => {
            state.assignment = action.payload;
        },
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },
        resetAssignment: (state) => {
            state.assignment = defaultNewAssignment;
        }
    },
});
export const { addAssignment, deleteAssignment,
    updateAssignment, setAssignment, setAssignments, resetAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;