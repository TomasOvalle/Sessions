import usersManager from "../data/mongo/manager/UsersManager.mongo.js";

async function isValidPassword (req, res, next) {
    try {
        const { email, password } = req.body;
        const one = await usersManager.readByEmail(email);
        if (one.password === password) {
            return next();
        }
        const error = new Error("Invalid")
        error.statusCode = 401;
        throw error
    } catch (error) {
        return next (error)
    }
}

export default isValidPassword;