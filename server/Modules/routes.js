import * as dao from "./dao.js";

function ModuleRoutes(app) {

    app.put("/api/modules/:mid", async (req, res) => {
        const {mid} = req.params;
        try {
            delete req.body._id;
            await dao.updateModule(mid, req.body)
            res.sendStatus(204);
        } catch (error) {
            res.status(400).send(error.message);
        }

    });

    app.post("/api/courses/:cid/modules", async (req, res) => {
        const {cid} = req.params;
        try {
            delete req.body._id;
            const newModule = await dao.createModuleForCourse(cid, req.body);
            res.status(201).send(newModule);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    app.delete("/api/modules/:mid", async (req, res) => {
        const {mid} = req.params;
        try {
            await dao.deleteModule(mid);
            res.sendStatus(200);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });

    app.get("/api/courses/:cid/modules", async (req, res) => {
        const {cid} = req.params;
        const modules = await dao.findModulesByCourseId(cid);
        res.send(modules);
    });
}

export default ModuleRoutes;
