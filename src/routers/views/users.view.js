import { Router } from "express";
import usersManager from "../../data/mongo/manager/UsersManager.mongo.js";

const usersRouter = Router();

usersRouter.get("/register", async ( req, res, next) => {
    try {
        const register = await usersManager.read()
        return res.render("register", { title: "Register", register})
    } catch (error) {
        return next(error)
    }
})

usersRouter.get("/login", async (req, res, next) => {
    try {
        const login = await usersManager.read()
        return res.render("login", { title: "Login", login: login })
    } catch (error) {
        return next (error)
    }
})

export default usersRouter;