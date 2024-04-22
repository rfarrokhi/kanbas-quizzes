import db from "../Database/index.js";
import { v4 as uuidv4 } from 'uuid';

export default function AssignmentRoutes(app) {
    // GET assignments for a course
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments.filter((a) => a.course === cid);
        res.send(assignments);
    });

    // POST a new assignment to a course
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: uuidv4(),
        };
        db.assignments.push(newAssignment);
        res.send(newAssignment);
    });

    // PUT to update an assignment
    app.put("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
        db.assignments[assignmentIndex] = {
            ...db.assignments[assignmentIndex],
            ...req.body,
        };
        res.sendStatus(204);
    });

    // DELETE to remove an assignment
    app.delete("/api/assignments/:aid", (req, res) => {
        const { aid } = req.params;
        db.assignments = db.assignments.filter((a) => a._id !== aid);
        res.sendStatus(200);
    });
}