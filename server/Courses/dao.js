import courseModel from "./model.js";

export const findAllCourses = () => courseModel.find();
export const findCourseById = (id) => courseModel.findOne({ id: id });
export const createCourse = async (course) => {
    let newCourseID = "";
    // get the last added Course
    const lastCourse = await courseModel.findOne().sort({ _id: -1 }).limit(1)
    if (lastCourse && lastCourse.id) {
        // Get the digits after "RS" and increment by 1
        newCourseID = "RS" + (parseInt(lastCourse.id.substring(2)) + 1);
    }
    else {
        newCourseID = "RS" + Math.floor(Math.random() * 1000 + 1).toString();
    }
    return courseModel.create({ ...course, id: newCourseID });
}
export const updateCourse = (id, course) => courseModel.updateOne({ id: id }, { $set: course });
export const deleteCourse = (id) => courseModel.deleteOne({ id: id });
