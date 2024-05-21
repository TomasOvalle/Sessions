import { Router } from "express";
import productsRouter from "./products.view.js";
import profileRouter from "./profile.view.js";
import usersRouter from "./users.view.js";
import cartsRouter from "./cart.view.js";

const viewsRouter = Router();

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/", profileRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.use("/cart", cartsRouter);

viewsRouter.get("/", (req, res , next) => {
    try {
        return res.render("index", { title: "HOME" });
    } catch (error) {
        return next(error);
    }
});

viewsRouter.get("/chat", async (req, res , next) => {
    try {
        return res.render("chat", { title: "CHAT" })
    } catch (error) {
        return next(error)
    }
})

export default viewsRouter;