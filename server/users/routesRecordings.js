//import db from "../Database/index.js";

import * as dao from "./dao.js";


function UserRoutes(app) {
    app.get("/api/users", async (req, res) => {
        //res.send(db.users);
        const users = await dao.findAllUsers();
        res.json(users);
    });
    //http://localhost:4000/api/users

    app.get("/api/users/:userId", async (req, res) => {
        const userId = req.params.userId;
        const user = await dao.findUserById(userId);
        res.send(user);
    });

    app.post("/api/users/register", async(req, res) => {
        console.log("[1] register");
        const { username, password } = req.body;
        console.log("[2] username, password", username, password);
        const existingUser = await dao.findUserByCredentials(username, password);
        console.log("[3] existingUser", existingUser);
        if (existingUser) {
            res.status(400).send("Username already exists");
            return;
        }
        
        // if (db.users.find((u) => u.username === username)){
        //     res.status(400).send("Username already exists");
        //     return;
        // }

        const newUser = await dao.createUser({ username, password }); //{ username, password, _id: Date.now().toString() };
        console.log("[4] newUser", newUser);
        //db.users.push({username, password});
        req.session["currentUser"] = newUser;
        console.log("[5] req.session", req.session);
        res.send(newUser);
    });

    app.get("/api/users/profile", async (req, res) => {
        console.log("[6] profile");
        console.log("[7] req.session", req.session);
        if (!req.session.currentUser) {
            console.log("[8] Not logged in");
            res.status(401).send("Not logged in");
            return;
        }
        console.log("[9] req.session.currentUser", req.session.currentUser);
        res.send(req.session.currentUser);
    });

    app.post("/api/users/logout", async (req, res) => {
        req.session.destroy();
        res.send("Logged out");
    });

    app.post("/api/users/login", async (req, res) => {
        const { username, password } = req.body;
        const user = await dao.findUserByCredentials(username, password);
        // db.users.find(
        //     (u) => u.username === username && u.password === password);
        if (user) {
            req.session.currentUser = user;
            res.send(user);
        } else {
            res.status(401).send("Invalid credentials");
        }
    });

    //http://localhost:4000/api/users/register/alice/123
    //http://localhost:4000/api/users/profile
    //http://localhost:4000/api/users/loged out
    //http://localhost:4000/api/users/profile
} 

export default UserRoutes;