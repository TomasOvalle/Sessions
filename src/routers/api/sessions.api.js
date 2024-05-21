import { Router } from "express";
import usersManager from "../../data/mongo/manager/UsersManager.mongo.js"
import isValidEmail from "../../middlewares/isValidEmail.mid.js";
import isValidData from "../../middlewares/isValidData.mid.js";
import isValidUser from "../../middlewares/isValidUser.mid.js";
import isValidPassword from "../../middlewares/isValidPassword.mid.js";

const sessionsRouter = Router();

sessionsRouter.post("/register", isValidData, isValidEmail, async (req, res, next) => {
    try {
        const data = req.body;
        await usersManager.create(data);
        return res.json({
            statusCode: 201,
            message: "Registered"
        })
    } catch (error) {
        return next (error)
    }
})

sessionsRouter.post("/login", isValidUser, isValidPassword, async (req, res ,next) => {
    try {
        const { email } = req.body;
        const one = await usersManager.readByEmail(email)
            req.session.email = email;
            req.session.role = one.role;
            req.session.photo = one.photo
            req.session.online = true;
            req.session.user_id = one._id;
            return res.json({ statusCode: 200, mesagge: "Logged in" });
    } catch (error) {
        return next (error);
    }
});

sessionsRouter.get("/online", async (req, res, next) => {
    try {
        if (req.session.online) {
            return res.json({
                statusCode: 200,
                message: "is online",
                user_id: req.session.user_id,
            })
        }
        return res.json({
            statusCode: 401,
            message: "Bad auth", // esta permitido por ahora, faltan metodos que aprender.
        })
    } catch (error) {
        return next (error)
    }
});

sessionsRouter.post("/signout", async (req, res, next) => {
    try {
        req.session.destroy()
        return res.json({ statusCode: 200, message: "Signed out"})
    } catch (error) {
        return next (error)
    }
});

/*sessionsRouter.post("/api/sessions"), async (req, res , next) => {
    try {
        if (!req.session.user_id) {
            return res.json({
                statusCode: 401,
                message: "Usuario no autenticado"
            });
        }
        const user = await usersManager.findById(req.session.user_id);
        if (!user) {
            return res.json({
                statusCode: 404,
                message: "Usuario no encontrado"
            })
        }
        res.json(user);
    } catch (error) {
        return next (error)
    }
}*/


export default sessionsRouter;