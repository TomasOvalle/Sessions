import { Router } from "express";
import cartsManager from "../../data/mongo/manager/CartsManager.mongo.js";

const cartsRouter = Router();

cartsRouter.get("/", read);
cartsRouter.get("/paginate", paginate);
cartsRouter.get("/:uid", readOne);
cartsRouter.post("/", create);
cartsRouter.put("/:uid", update);
cartsRouter.delete("/:uid", destroy);


async function read(req, res, next) {
    try {
        const user_id = req.session.user_id;
        if (user_id) {
            const all = await cartsManager.read({user_id});
            if (all.length > 0) {
                return res.json({
                    statusCode: 200,
                    response: all,
                });
            }
        } else {
            const error = new Error("Not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error)
    }
}

async function create (req, res, next) {
    try {
        const data = req.body;
        data.user_id = req.session.user_id
        const one = await cartsManager.create(data);
        res.json({
            statusCode: 201,
            message: "Cart has been created",
            response: one
        });
    } catch (error) {
        return next(error)
    }
}

async function update (req, res, next) {
    try {
        const { uid } = req.params
        const data = req.body
        const one = await cartsManager.update(uid, data)
        return res.json({
            statusCode: 200,
            response: one
        })
    } catch (error) {
        return next(error)
    }
}

async function destroy (req, res, next) {
    try {
        const { uid } = req.params
        const one = await cartsManager.destroy(uid)
        return res.json({
            statusCode: 200,
            response: one
        })
    } catch (error) {
        return next (error)
    }
}

async function paginate (req, res, next) {
    try {
        const filter = {}; 
        const opts = {}; 
        if (req.query.limit) {
            opts.limit = req.query.limit
        }
        if (req.query.page) {
            opts.page = req.query.page
        }
        if (req.query.category) {
            filter.category = req.query.category
        }
        const all = await cartsManager.paginate( filter, opts)
        return res.json({
            statusCode: 200,
            reponse: all.docs,
            info: {
                totalDocs: all.totalDocs,
                page: all.page,
                totalPages: all.totalPages,
                limit: all.limit,
                prevPage: all.prevPage,
                nextPage: all.nextPage,
            }
        })
    } catch (error) {
        return next (error)
    }
};

async function readOne(res, req, next) {
    try {
        const { uid } = req.params;
        const one =  await cartsManager.readOne(uid);
        if (one) {
            return res.json({
                statusCode: 200,
                response: one,
            });
        } else {
            const error = new Error("Not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next (error)
    }
};

cartsRouter.post("/", async (req, res, next) => {
    try {
        const data = req.body
        const one = await cartsManager.create(data)
        return res.json({
            statusCode: 201,
            message: "created",
            response: one
        })
    } catch (error) {
        return next(error)
    }
})

/*cartsRouter.get("/api/carts", async (req, res, next) => {
    try {
        const { uid } = req.query
        if (uid) {
            const all = await cartsManager.read({ uid })
            if (all.length > 0) {
                return res.json({
                    statusCode: 200,
                    message: 'read',
                    response: all,
                });
            }
        }
        const error = new Error('Not found')
        error.statusCode = 404;
        throw error
    } catch (error) {
        return next(error)
    }
})*/

/*cartsRouter.get("/api/carts", async (req, res, next) => {
    try {
        const user_id = req.session; // Obtén el user_id de la consulta
        if (user_id) {
            const all = await cartsManager.read({ user_id: user_id });
            if (all.length > 0) {
                return res.json({
                    statusCode: 200,
                    message: 'read',
                    response: all,
                });
            } else {
                return res.status(404).json({ message: 'No products found for this user' });
            }
        } else {
            return res.status(400).json({ message: 'user_id is required' });
        }
    } catch (error) {
        return next(error);
    }
});*/


//Nuevo
cartsRouter.delete("/:cid", async (req, res, next) => {
    try {
        const { cid } = req.params;
        const one = await cartsManager.destroy(cid);
        return res.json({
            statusCode: 200, 
            response: one,
        })
    } catch (error) {
        return next (error)
    }
})

cartsRouter.post("/api/carts/:cid", async (req, res, next) => {
    try {
        const { cid } = req.params;
        const one = await cartsManager.finalizePurchase(cid);
        return res.json({
            statusCode: 200,
            response: one,
        })
    } catch (error) {
        return next (error)
    }
})

cartsRouter.patch("/:cid" , async (req, res , next) => {
    try {
        const { cid } = req.params;
        const one = await cartsManager.updatePartial(cid);
        return res.json({
            statusCode: 200,
            response: one,
        })
    } catch (error) {
        return next (error)
    }
})
//

export default cartsRouter;