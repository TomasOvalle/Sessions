import "dotenv/config.js"
import express, { urlencoded } from "express"
import { createServer } from "http"
import { Server } from "socket.io"; // Este import es nuevo, este "server" se creará a partir del server HTTP
import morgan from "morgan";
import { engine } from "express-handlebars"
import cookieParser from "cookie-parser";
import session from "express-session";
//import fileStore from "session-file-store";
import MongoStore from "connect-mongo";


import indexRouter from "./src/routers/index.router.js"
import socketCb from "./src/routers/index.socket.js"
import errorHandler from "./src/middlewares/errorHandler.mid.js"
import pathHandler from "./src/middlewares/pathHandler.mid.js"
import __dirname from "./utils.js"
import dbConnect from "./src/utils/dbConnect.util.js";

console.log("Todas las variables de entorno " + process.env);
console.log(process.env.MONGO_URI);

const server = express()
const port = process.env.PORT || 8080
const ready = async () => {
    console.log("Server ready on port " + port);
    await dbConnect()
}
const nodeServer = createServer(server)
const socketServer = new Server(nodeServer); //socketServer será un servidor para trabajar en sockets
socketServer.on("connection", socketCb)
export { socketServer }


nodeServer.listen(port, ready);

server.engine("handlebars", engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname+'/src/views')

// middlewares
server.use(cookieParser(process.env.SECRET_COOKIE));
//const FileSession = fileStore(session)
server.use(
    session ({
        //FileStore
        /*store: new FileSession({
            path: "./src/data/fs/files/sessions",
            ttl: 60 * 60
        }),*/
        //MongoStore
        store: new MongoStore({
            mongoUrl: process.env.MONGO_URI,
            ttl: 60 * 60 
        }),
        secret: process.env.SECRET_SESSION,
        resave: true,
        saveUninitialized: true,
        //cookie: { maxAge: 60 * 60 * 1000}
    })
)
server.use(express.json());
server.use(urlencoded( {extended: true }));
server.use(express.static(__dirname + "/public"))
server.use(morgan("dev"));

//endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);

