import { Router } from "express";
import cartsManager from "../../data/mongo/manager/CartsManager.mongo.js"

const cartsRouter = Router();

cartsRouter.get("/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const cart = await cartsManager.readOne(uid);
        return res.render("cart", { title: "cart", cart})
    } catch (error) {
        return next (error);
    }
})

export default cartsRouter;