//import usersManager from "../data/fs/UsersManager.fs.js"
//import productsManager from "../data/fs/ProductsManager.fs.js";
import usersManager from "../data/mongo/manager/UsersManager.mongo.js";
import productsManager from "../data/mongo/manager/ProductsManager.mongo.js";
import { socketServer } from "../../server.js"
import cartsManager from "../data/mongo/manager/CartsManager.mongo.js";

let messages = []

export default async socket => {
    console.log(socket.id);
    socket.emit("users", await usersManager.read())
    socket.on("register", async data => {
        await usersManager.create(data)
        socket.emit("users", await usersManager.read())
    });
    socket.emit("products", await productsManager.read())
    socket.on("create", async data => {
        await productsManager.create(data)
        socket.emit("products", await productsManager.read())
    });
    socket.on("nickname", async (nick) => {
        messages.push( nick + "is oline")
        socketServer.emit("messages", messages)
    })
    socket.on("all messages", allMessages => {
        messages = allMessages
        socketServer.emit("messages", messages)
    })
    socket.emit("cart", await cartsManager.read())
}
