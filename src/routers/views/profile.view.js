import { Router } from "express";
import usersManager from "../../data/fs/UsersManager.fs.js"

const profileRouter = Router();

profileRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const profile = await usersManager.readOne(uid);
        return res.render("profile", { title: "Profile", profile });
    } catch (error) {
        return next(error)
    }
})

export default profileRouter;