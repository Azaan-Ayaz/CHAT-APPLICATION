import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
// import { createServer } from "mysql2"
import cors from "cors"
import { Socket } from "dgram"

const app = express()

app.use(cors({
    origin: "http://localhost:5174",
    methods:["GET", "POST"],
    credentials: true
}))

const server = createServer(app)
const io = new Server(server, {
    cors:{
        origin: "http://localhost:5174",
        methods:["GET", "POST"],
        credentials: true
    }
})

const PORT = 8080

app.get("/", (req, res) => {
    res.send("Hello World")
})

io.on("connection", (socket) => {
    console.log("User connected")
    console.log("Id", socket.id)
    socket.emit("welcome", `Welcome to the server ${socket.id}`)
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})