import { Router } from "express";
//import usersManager from "../../data/fs/UsersManager.fs.js";
import usersManager from "../../data/mongo/manager/UsersManager.mongo.js"


const usersRouter = Router();

usersRouter.get("/", read);
usersRouter.get("/paginate", paginate);
usersRouter.get("/:uid", readOne);
usersRouter.post("/", create );
usersRouter.put("/:uid", update);
usersRouter.delete("/:uid", destroy);

async function read( req, res, next) {
    try {
        const { user_id } = req.session;
        if (user_id) {
            const all = await usersManager.read(user_id);
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
        return next(error);
    }
}

async function create (req, res, next) {
    try {
        const data = req.body;
        const one = await usersManager.create(data);
        res.json({
            statusCode: 201,
            message: "CREATED ID: " + one.id,
        });
    } catch (error) {
        return next(error);
    }
};

async function update (req, res, next) {
    try {
        const { uid } = req.params
        const data = req.body
        const one = await usersManager.update(uid,data);
        return res.json({
            statusCode: 200,
            response: one
        })
    } catch (error) {
        return next(error);
    }
};

async function destroy (req, res, next) {
    try {
        const { uid } = req.params
        const one = await usersManager.destroy(uid);
        return res.json({
            statusCode: 200,
            response: one
        })
    } catch (error) {
        return next(error);
    }
}

async function paginate(req, res , next) {
    try {
        const filter = {};
        const opts = {};
        if (req.query.limit) {
            opts.limit = req.query.limit
        }
        if (req.query.page) {
            opts.page = req.query.page
        }
        if (req.query.role) {
            filter.role = req.query.role
        }
        const all = await usersManager.paginate( filter, opts )
        return res.json({
            statusCode: 200,
            response: all.docs,
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
        return next(error)
    }
}

async function readOne( req, res, next) {
    try {
        const { uid } = req.params;
        const one = await usersManager.readOne(uid);
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
        return next(error);
    }
}

/*usersRouter.get("/api/users", async (req, res, next) => {
    try {
        const { category } = req.query;
        const all = await usersRouter.read(category);
        if (all.length > 0) {
            return res.json({
                statusCode: 200,
                response: all
            });
        } else {
            const error = new Error("not found");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        return next(error);
    }
});*/

/*usersRouter.get("/api/users", async (req, res, next) => {
    try {
        const user_id = req.session.user_id; 
        if (user_id) {
            const all = await usersRouter.read({ user_id: user_id});
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
        return next (error);
    }
})*/

/*usersRouter.get("/api/users/:uid", async (req, res, next) => {
    try {
        const { uid } = req.params;
        const one = await usersRouter.readOne(uid);
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
        return next(error);
    }
})
*/

export default usersRouter;