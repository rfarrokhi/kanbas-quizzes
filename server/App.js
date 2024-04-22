import express from "express";

import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";

import CourseRoutes from "./Courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";

import cors from "cors";

import SecurityController from "./SecurityController.js";
import UserRoutes from "./users/routes.js";

import session from "express-session";
import mongoose from "mongoose";

import "dotenv/config";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/kanbas";

console.log("Connection string for mongoDB",CONNECTION_STRING);
mongoose.connect(CONNECTION_STRING).then(r => console.log("Connected to MongoDB")).catch(e => console.log("Error connecting to MongoDB", e));

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
  })
);

const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
        domain: process.env.HTTP_SERVER_DOMAIN,         
    };
}
app.use(session(sessionOptions));

app.use(express.json());

Hello(app);
Lab5(app);

ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);

SecurityController(app);
UserRoutes(app);

app.listen(4000);