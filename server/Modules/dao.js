import moduleModel from "./model.js";

export const findModulesByCourseId = (courseId) => moduleModel.find({ course: courseId });
export const updateModule = (id, module) => moduleModel.updateOne({ _id: id }, { $set: module });
export const createModuleForCourse = (courseId, module) => moduleModel.create({ ...module, course: courseId });
export const deleteModule = (id) => moduleModel.deleteOne({ _id: id });