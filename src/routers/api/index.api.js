import { Router } from "express";
import cartsRouter from "./cart.api.js";
import usersRouter from "./user.api.js";
import productsRouter from "./products.api.js";
import ticketsRouter from "./tickets.api.js";
import cookiesRouter from "./cookies.api.js";
import sessionsRouter from "./sessions.api.js";


const apiRouter = Router();

apiRouter.use("/carts", cartsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/tickets", ticketsRouter);
apiRouter.use("/cookies", cookiesRouter);
apiRouter.use("/sessions", sessionsRouter);


export default apiRouter;