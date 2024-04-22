import * as dao from "./dao.js";

function CourseRoutes(app) {

  app.get("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const course = await dao.findCourseById(courseId);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.send(course);
  });

  app.put("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    const course = req.body;

    await dao.updateCourse(id, course);

    res.sendStatus(200);
  });

  app.delete("/api/courses/:id", async (req, res) => {
    const { id } = req.params;
    await dao.deleteCourse(id);
    res.sendStatus(204);
  });

  app.post("/api/courses", async (req, res) => {
    try {
      delete req.body._id;
      const course = await dao.createCourse(req.body);
      res.status(201).send(course);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
  );

  app.get("/api/courses", async (req, res) => {
    const courses = await dao.findAllCourses();
    res.send(courses);
  });
}
export default CourseRoutes;
