//import productsManager from "../data/fs/ProductsManager.fs.js"
import productsManager from "../data/mongo/manager/ProductsManager.mongo.js";

export default async socket => {
    console.log(socket.id);
    socket.emit("products", await productsManager.read())
    socket.on("create", async data => {
        await productsManager.create(data)
        socket.emit("products", await productsManager.read())
    })
}